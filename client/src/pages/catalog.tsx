import { useState, useMemo, useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterSidebar } from "@/components/product/FilterSidebar";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, List, Table2, Download, X, ShoppingCart, Trash2, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'spreadsheet'>('grid');
  const [sortBy, setSortBy] = useState('relevante');
  const [filters, setFilters] = useState<any>({});

  const [itemsPerPage, setItemsPerPage] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [showPrecioCompra, setShowPrecioCompra] = useState(false);
  const [showPrecioPublico, setShowPrecioPublico] = useState(false);
  const [markup, setMarkup] = useState('');
  const [currency, setCurrency] = useState('ARS');
  const [spreadsheetQuantities, setSpreadsheetQuantities] = useState<Record<number, string>>({});
  const [spreadsheetAdded, setSpreadsheetAdded] = useState<Record<number, boolean>>({});
  const [productSearch, setProductSearch] = useState("");
  const [showOnlyCartProducts, setShowOnlyCartProducts] = useState(false);
  const [spreadsheetColumnWidths, setSpreadsheetColumnWidths] = useState<Record<string, number>>({});
  const columnResizeRef = useRef<{ columnId: string; startX: number; startWidth: number } | null>(null);

  const [motoSearch, setMotoSearch] = useState({
    fabricante: '',
    modelo: '',
    cilindrada: '',
    version: '',
    anio: ''
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, productSearch, showOnlyCartProducts]);

  const filteredProducts = useMemo(() => {
    const normalizeSearchText = (value: string) =>
      value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\u00a0/g, " ")
        .replace(/[^\w./-]+/g, " ")
        .replace(/\s+/g, " ");

    const searchTerms = normalizeSearchText(productSearch)
      .split(" ")
      .filter(Boolean);

    return PRODUCTS.filter(product => {
      if (showOnlyCartProducts && (!spreadsheetAdded[product.id] || Number(spreadsheetQuantities[product.id] ?? "0") <= 0)) {
        return false;
      }

      if (searchTerms.length > 0) {
        const searchableText = [
          product.title,
          product.code,
          product.brand,
          product.type,
          product.subtype,
          product.origin,
          product.width,
          product.ratio,
          product.rim
        ]
          .filter((value) => value !== undefined && value !== null)
          .join(" ")
          .replace(/\u00a0/g, " ");

        const normalizedProductText = normalizeSearchText(searchableText);
        if (!searchTerms.every((term) => normalizedProductText.includes(term))) return false;
      }

      const brandFilters = filters.marca || [];
      if (brandFilters.length > 0) {
        if (!brandFilters.some((f: string) => f.toUpperCase() === (product.brand || "").toUpperCase())) return false;
      }
      
      const categoryFilters = filters.categoria || [];
      if (categoryFilters.length > 0) {
        const matchesCategory = categoryFilters.some((cf: string) => {
          const normCf = cf.trim().toLowerCase();
          const pType = (product.type || "").toLowerCase();
          const pTitle = (product.title || "").toLowerCase();
          const pSubtype = (product.subtype || "").toLowerCase();
          
          return pType.includes(normCf) || normCf.includes(pType) ||
                 pTitle.includes(normCf) || pSubtype.includes(normCf) ||
                 (normCf === "cubiertas" && (pType.includes("calle") || pType.includes("off-road") || pTitle.includes("cubierta"))) ||
                 (normCf === "camaras" && (pType.includes("camara") || pTitle.includes("camara")));
        });
        if (!matchesCategory) return false;
      }
      
      const subtypeFilters = filters.subtipo || [];
      if (subtypeFilters.length > 0) {
        const matchesSubtype = subtypeFilters.some((sf: string) => {
          const normSf = sf.trim().toLowerCase();
          const pSub = (product.subtype || "").toLowerCase();
          const pTitle = (product.title || "").toLowerCase();
          return pSub.includes(normSf) || normSf.includes(pSub) || pTitle.includes(normSf);
        });
        if (!matchesSubtype) return false;
      }

      // Check for attribute existence and match
      const anchoFilters = filters.attr_ancho || [];
      const relacionFilters = filters.attr_relacion || [];
      const rodadoFilters = filters.attr_rodado || [];

      if (anchoFilters.length > 0) {
        const pVal = String(product.width !== undefined ? product.width : "").trim();
        if (!anchoFilters.some((f: any) => String(f).trim() === pVal)) return false;
      }
      if (relacionFilters.length > 0) {
        const pVal = String(product.ratio !== undefined ? product.ratio : "").trim();
        if (!relacionFilters.some((f: any) => String(f).trim() === pVal)) return false;
      }
      if (rodadoFilters.length > 0) {
        const pVal = String(product.rim !== undefined ? product.rim : "").trim();
        if (!rodadoFilters.some((f: any) => String(f).trim() === pVal)) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;
      if (sortBy === 'menor-precio') return priceA - priceB;
      if (sortBy === 'mayor-precio') return priceB - priceA;
      if (sortBy === 'novedades') return (a.isNew ? -1 : 1);
      return 0;
    });
  }, [filters, sortBy, productSearch, showOnlyCartProducts, spreadsheetAdded, spreadsheetQuantities]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const hasProducts = filteredProducts.length > 0;
  const firstVisibleProduct = hasProducts ? ((currentPage - 1) * itemsPerPage) + 1 : 0;
  const lastVisibleProduct = hasProducts ? Math.min(currentPage * itemsPerPage, filteredProducts.length) : 0;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDownload = () => {
    alert('Descargando lista de precios...');
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  const dailyDeals = PRODUCTS.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 6);

  const formatPrice = (value: number) => value.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const markupRate = Number(markup.replace(",", ".")) || 0;
  const getPublicPrice = (price: number) => price * (1 + markupRate / 100);

  const getStockCellClass = (qty: number) => {
    if (qty === 0) return "bg-red-50 text-red-700";
    if (qty <= 3) return "bg-amber-50 text-amber-700";
    return "bg-emerald-50 text-emerald-700";
  };

  const focusQuantityCell = (rowIndex: number) => {
    const nextInput = document.querySelector<HTMLInputElement>(`[data-quantity-row="${rowIndex}"]`);
    nextInput?.focus();
    nextInput?.select();
  };

  const handleQuantityKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, rowIndex: number) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      focusQuantityCell(rowIndex + 1);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusQuantityCell(rowIndex - 1);
    }
  };

  const getSpreadsheetQuantity = (productId: number) => spreadsheetQuantities[productId] ?? "0";

  const setSpreadsheetQuantity = (productId: number, value: string) => {
    const numericValue = value.replace(/\D/g, "");
    const nextValue = numericValue === "" ? "0" : String(Number(numericValue));

    setSpreadsheetQuantities((current) => ({
      ...current,
      [productId]: nextValue
    }));

    if (nextValue === "0") {
      setSpreadsheetAdded((current) => ({
        ...current,
        [productId]: false
      }));
    }
  };

  const resetSpreadsheetQuantity = (productId: number) => {
    setSpreadsheetQuantities((current) => ({
      ...current,
      [productId]: "0"
    }));
    setSpreadsheetAdded((current) => ({
      ...current,
      [productId]: false
    }));
  };

  const addSpreadsheetProduct = (productId: number) => {
    if (Number(getSpreadsheetQuantity(productId)) <= 0) return;

    setSpreadsheetAdded((current) => ({
      ...current,
      [productId]: true
    }));
  };

  const startColumnResize = (event: ReactPointerEvent<HTMLElement>, columnId: string, currentWidth: number) => {
    event.preventDefault();
    event.stopPropagation();

    columnResizeRef.current = { columnId, startX: event.clientX, startWidth: spreadsheetColumnWidths[columnId] ?? currentWidth };
    const previousCursor = document.body.style.cursor;
    const previousUserSelect = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const resize = columnResizeRef.current;
      if (!resize) return;
      setSpreadsheetColumnWidths((widths) => ({
        ...widths,
        [resize.columnId]: Math.max(48, resize.startWidth + moveEvent.clientX - resize.startX)
      }));
    };

    const stopColumnResize = () => {
      columnResizeRef.current = null;
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousUserSelect;
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopColumnResize);
      window.removeEventListener("pointercancel", stopColumnResize);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopColumnResize);
    window.addEventListener("pointercancel", stopColumnResize);
  };

  const handleSpreadsheetHeaderPointerDown = (event: ReactPointerEvent<HTMLTableSectionElement>) => {
    const header = (event.target as HTMLElement).closest("th");
    if (!header) return;

    const headerBounds = header.getBoundingClientRect();
    const distanceToLeft = event.clientX - headerBounds.left;
    const distanceToRight = headerBounds.right - event.clientX;
    if (Math.min(distanceToLeft, distanceToRight) > 8) return;

    const headerIndex = Array.from(header.parentElement?.children ?? []).indexOf(header);
    const columns = [
      ["row", 34], ["code", 90], ["brand", 68], ["product", 400], ["presentations", 130],
      ["type", 78], ["noa", 46], ["nea", 46], ["bue", 46], ["cuyo", 46],
      ...(showPrecioCompra ? [["finalPrice", 105], ["listPrice", 105]] : []),
      ...(showPrecioPublico ? [["publicPrice", 105]] : []),
      ["quantity", 58], ["action", 96], ["subtotal", 120]
    ] as [string, number][];
    const column = columns[distanceToLeft <= distanceToRight ? headerIndex - 1 : headerIndex];
    if (column) startColumnResize(event, column[0], column[1]);
  };

  const handleSpreadsheetBodyPointerDown = (event: ReactPointerEvent<HTMLTableSectionElement>) => {
    const cell = (event.target as HTMLElement).closest("td");
    if (!cell) return;

    const cellBounds = cell.getBoundingClientRect();
    const distanceToLeft = event.clientX - cellBounds.left;
    const distanceToRight = cellBounds.right - event.clientX;
    if (Math.min(distanceToLeft, distanceToRight) > 8) return;

    const columnIndex = Array.from(cell.parentElement?.children ?? []).indexOf(cell);
    const columns = [
      ["row", 34], ["code", 90], ["brand", 68], ["product", 400], ["presentations", 130],
      ["type", 78], ["noa", 46], ["nea", 46], ["bue", 46], ["cuyo", 46],
      ...(showPrecioCompra ? [["finalPrice", 105], ["listPrice", 105]] : []),
      ...(showPrecioPublico ? [["publicPrice", 105]] : []),
      ["quantity", 58], ["action", 96], ["subtotal", 120]
    ] as [string, number][];
    const column = columns[distanceToLeft <= distanceToRight ? columnIndex - 1 : columnIndex];
    if (column) startColumnResize(event, column[0], column[1]);
  };

  const handleSpreadsheetColumnDoubleClick = (event: ReactMouseEvent<HTMLTableSectionElement>) => {
    const cell = (event.target as HTMLElement).closest("th, td") as HTMLTableCellElement | null;
    if (!cell || cell.getBoundingClientRect().right - event.clientX > 8) return;

    const columnIndex = Array.from(cell.parentElement?.children ?? []).indexOf(cell);
    const columns = [
      ["row", 34], ["code", 90], ["brand", 68], ["product", 400], ["presentations", 130],
      ["type", 78], ["noa", 46], ["nea", 46], ["bue", 46], ["cuyo", 46],
      ...(showPrecioCompra ? [["finalPrice", 105], ["listPrice", 105]] : []),
      ...(showPrecioPublico ? [["publicPrice", 105]] : []),
      ["quantity", 58], ["action", 96], ["subtotal", 120]
    ] as [string, number][];
    const column = columns[columnIndex];
    const table = cell.closest("table");
    if (!column || !table) return;

    event.preventDefault();
    const cells = Array.from(table.querySelectorAll(`tr > :nth-child(${columnIndex + 1})`)) as HTMLTableCellElement[];
    const contentWidth = Math.ceil(Math.max(...cells.map((item) => item.scrollWidth)) + 1);
    setSpreadsheetColumnWidths((widths) => ({
      ...widths,
      [column[0]]: Math.max(widths[column[0]] ?? column[1], contentWidth)
    }));
  };

  return (
    <div className="min-h-screen bg-intercap-bg flex flex-col font-sans pt-24">
      <Header />
      
      <div className="bg-intercap-blue-dark border-t border-white/5 py-3 sticky top-16 z-30 mb-5">
        <div className="container mx-auto px-4 flex flex-wrap items-center gap-3">
          <span className="text-white font-black text-xs tracking-tighter mr-2 uppercase">BUSCADOR POR MOTO</span>
          <Select value={motoSearch.fabricante} onValueChange={(v) => setMotoSearch({...motoSearch, fabricante: v})}>
            <SelectTrigger className="w-[140px] h-9 bg-white/5 text-white border-white/10 text-[10px] uppercase font-black tracking-tighter">
              <SelectValue placeholder="FABRICANTE" />
            </SelectTrigger>
            <SelectContent className="bg-intercap-blue-dark border-white/10 text-white">
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="yamaha">Yamaha</SelectItem>
            </SelectContent>
          </Select>
          <Select value={motoSearch.modelo} onValueChange={(v) => setMotoSearch({...motoSearch, modelo: v})}>
            <SelectTrigger className="w-[120px] h-9 bg-white/5 text-white border-white/10 text-[10px] uppercase font-black tracking-tighter">
              <SelectValue placeholder="MODELO" />
            </SelectTrigger>
            <SelectContent className="bg-intercap-blue-dark border-white/10 text-white"><SelectItem value="cbr">CBR</SelectItem></SelectContent>
          </Select>
          <Select value={motoSearch.cilindrada} onValueChange={(v) => setMotoSearch({...motoSearch, cilindrada: v})}>
            <SelectTrigger className="w-[120px] h-9 bg-white/5 text-white border-white/10 text-[10px] uppercase font-black tracking-tighter">
              <SelectValue placeholder="CILINDRADA" />
            </SelectTrigger>
            <SelectContent className="bg-intercap-blue-dark border-white/10 text-white"><SelectItem value="125">125cc</SelectItem></SelectContent>
          </Select>
          <Select value={motoSearch.version} onValueChange={(v) => setMotoSearch({...motoSearch, version: v})}>
            <SelectTrigger className="w-[110px] h-9 bg-white/5 text-white border-white/10 text-[10px] uppercase font-black tracking-tighter">
              <SelectValue placeholder="VERSION" />
            </SelectTrigger>
            <SelectContent className="bg-intercap-blue-dark border-white/10 text-white"><SelectItem value="std">Standard</SelectItem></SelectContent>
          </Select>
          <Select value={motoSearch.anio} onValueChange={(v) => setMotoSearch({...motoSearch, anio: v})}>
            <SelectTrigger className="w-[90px] h-9 bg-white/5 text-white border-white/10 text-[10px] uppercase font-black tracking-tighter">
              <SelectValue placeholder="AÑO" />
            </SelectTrigger>
            <SelectContent className="bg-intercap-blue-dark border-white/10 text-white"><SelectItem value="2024">2024</SelectItem></SelectContent>
          </Select>
          <Button className="bg-intercap-blue-main hover:bg-intercap-blue-main/90 text-white font-black h-9 px-8 text-[11px] tracking-tighter">
            BUSCAR
          </Button>
          <button className="text-gray-500 hover:text-white text-[10px] font-bold uppercase ml-auto tracking-tighter" onClick={() => setMotoSearch({fabricante: '', modelo: '', cilindrada: '', version: '', anio: ''})}>
            Borrar todo
          </button>
        </div>
      </div>

      <div className="flex flex-1 w-full relative min-h-[calc(100vh-64px)]">
        <aside className="w-[260px] shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-auto hidden lg:block custom-scrollbar bg-intercap-blue-dark">
          <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} />
        </aside>

        <main className="flex-1 min-w-0 bg-intercap-bg">
          <div className="bg-intercap-blue-dark p-2 sticky top-16 z-20 mb-[15px] border-b border-white/5">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-intercap-blue-main text-white' : 'text-gray-500 hover:text-white'}`}>
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-intercap-blue-main text-white' : 'text-gray-500 hover:text-white'}`}>
                      <List className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('spreadsheet')} className={`p-1.5 rounded ${viewMode === 'spreadsheet' ? 'bg-intercap-blue-main text-white' : 'text-gray-500 hover:text-white'}`} title="Vista lista tipo Excel">
                      <Table2 className="w-4 h-4" />
                    </button>
                  </div>
                  <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                    <SelectTrigger className="w-[60px] h-8 bg-white/5 border-none text-white text-[10px] font-black"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-intercap-blue-dark border-white/10 text-white font-black text-[10px]">
                      <SelectItem value="40">40</SelectItem><SelectItem value="80">80</SelectItem><SelectItem value="120">120</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-500 ml-2 uppercase">
                    <span>Ordenar por</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[120px] h-8 bg-white/5 border-none text-white text-[10px] font-black"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-intercap-blue-dark border-white/10 text-white font-black text-[10px]">
                        <SelectItem value="relevante">Relevante</SelectItem>
                        <SelectItem value="mas-vendidos">Más vendidos</SelectItem>
                        <SelectItem value="menor-precio">Menor precio</SelectItem>
                        <SelectItem value="mayor-precio">Mayor Precio</SelectItem>
                        <SelectItem value="novedades">Novedades</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4 border-l border-white/10 pl-4">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={showPrecioCompra}
                        onCheckedChange={(checked) => setShowPrecioCompra(!!checked)}
                        className="border-gray-600 data-[state=checked]:bg-intercap-blue-main"
                      />
                      <span className="text-[10px] font-black text-white group-hover:text-intercap-blue-main uppercase tracking-tighter">Precio Compra</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox
                        checked={showPrecioPublico}
                        onCheckedChange={(checked) => setShowPrecioPublico(!!checked)}
                        className="border-gray-600 data-[state=checked]:bg-intercap-blue-main"
                      />
                      <span className="text-[10px] font-black text-white group-hover:text-intercap-blue-main uppercase tracking-tighter">Precio al Público</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-gray-500 uppercase">% markup</span>
                      <Input type="text" value={markup} onChange={(e) => setMarkup(e.target.value)} className="w-[100px] h-8 bg-white/5 border-none text-white text-right pr-2 text-[10px] font-black" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <span className="text-[10px] font-black text-gray-500 uppercase">Moneda</span>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-[100px] h-8 bg-white/5 border-none text-white text-[10px] font-black"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-intercap-blue-dark border-white/10 text-white font-black text-[10px]">
                        <SelectItem value="ARS">ARS (1.00)</SelectItem><SelectItem value="USD">USD (1460.00)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" className="text-intercap-blue-main hover:bg-transparent h-8 px-2" onClick={handleDownload}><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-10">
            <div className="bg-white rounded-[4px] p-2 mb-4 mt-4 border border-gray-200 flex items-center justify-between shadow-sm">
              <div className="text-[10px] font-black text-intercap-blue-dark uppercase tracking-tighter">Mostrando {firstVisibleProduct} - {lastVisibleProduct} de {filteredProducts.length} productos</div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" className="w-7 h-7 p-0" onClick={() => setCurrentPage(1)} disabled={currentPage === 1 || !hasProducts}>&lt;&lt;</Button>
                <Button size="sm" variant="ghost" className="w-7 h-7 p-0" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1 || !hasProducts}>&lt;</Button>
                <div className="flex items-center gap-1 mx-2">
                  {[1, 2, 3, 4].filter((p) => p <= totalPages).map(p => (
                    <Button key={p} size="sm" className={`w-7 h-7 p-0 text-[10px] font-black ${currentPage === p ? "bg-intercap-blue-main text-white" : "bg-transparent text-intercap-blue-dark hover:bg-gray-100"}`} onClick={() => setCurrentPage(p)}>{p}</Button>
                  ))}
                  {totalPages > 4 && (
                    <>
                      <span className="text-intercap-blue-dark mx-1 text-[10px] font-black">...</span>
                      <Button size="sm" className={`w-7 h-7 p-0 text-[10px] font-black ${currentPage === totalPages ? "bg-intercap-blue-main text-white" : "bg-transparent text-intercap-blue-dark hover:bg-gray-100"}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
                    </>
                  )}
                </div>
                <Button size="sm" variant="ghost" className="w-7 h-7 p-0" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || !hasProducts}>&gt;</Button>
                <Button size="sm" variant="ghost" className="w-7 h-7 p-0" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || !hasProducts}>&gt;&gt;</Button>
              </div>
            </div>
            {Object.keys(filters).some(k => filters[k]?.length > 0) && (
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter mr-2">Filtros Aplicados:</span>
                {Object.entries(filters).map(([key, values]: [string, any]) => values.map((val: string) => (
                  <div key={`${key}-${val}`} className="bg-white border border-gray-200 text-intercap-blue-dark px-3 py-1 rounded-[4px] text-[9px] font-black uppercase flex items-center gap-2 shadow-sm">
                    <span>{val}</span>
                    <button onClick={() => { const newVals = values.filter((v: string) => v !== val); setFilters({ ...filters, [key]: newVals }); }} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                  </div>
                )))}
                <button onClick={clearAllFilters} className="text-intercap-blue-main text-[9px] font-black uppercase hover:underline ml-2">Borrar todo</button>
              </div>
            )}
            {viewMode === 'spreadsheet' ? (
              <div className="bg-white border border-gray-200 rounded-[4px] shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-[#f3f6fb] px-3 py-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Table2 className="w-4 h-4 text-intercap-blue-main shrink-0" />
                    <span className="text-[10px] font-black text-intercap-blue-dark uppercase tracking-tighter truncate">Vista de lista editable</span>
                  </div>
                  <div className="relative flex-1 max-w-[420px]">
                    <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="search"
                      value={productSearch}
                      onChange={(event) => setProductSearch(event.target.value)}
                      placeholder="Buscar por nombre, marca, codigo o medida"
                      className="h-8 rounded-[4px] border-gray-300 bg-white pl-9 pr-8 text-[11px] font-black text-intercap-blue-dark shadow-none placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-intercap-blue-main"
                    />
                    {productSearch && (
                      <button
                        type="button"
                        onClick={() => setProductSearch("")}
                        className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-intercap-blue-dark"
                        aria-label="Limpiar busqueda"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex h-8 items-center gap-2 rounded-[4px] border border-gray-300 bg-white px-3 text-[10px] font-black uppercase text-intercap-blue-dark">
                      <Checkbox
                        checked={showOnlyCartProducts}
                        onCheckedChange={(checked) => setShowOnlyCartProducts(!!checked)}
                        className="h-4 w-4 border-slate-400 data-[state=checked]:bg-intercap-blue-main data-[state=checked]:border-intercap-blue-main"
                      />
                      Ver Solo Productos agregados
                    </label>
                    <div className="min-w-[140px] text-right">
                      <div className="text-[8px] font-black uppercase text-slate-400">Carrito activo</div>
                      <button
                        type="button"
                        className="mt-1 inline-flex h-[18px] items-center justify-center rounded-md bg-intercap-blue-main px-4 text-[9px] font-black tracking-tight text-white"
                      >
                        Baterias
                      </button>
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full min-w-[1470px] table-fixed border-collapse text-[10px] font-normal [&_*]:!text-[10px] [&_*]:!font-normal [&_span.product-title]:!font-bold [&_td[data-price]]:!font-bold [&_td[data-subtotal]]:!font-bold [&_th]:!font-bold [&_th]:overflow-hidden [&_th]:text-ellipsis">
                    <colgroup>
                      {[
                        ["row", 34], ["code", 90], ["brand", 68], ["product", 400], ["presentations", 130],
                        ["type", 78], ["noa", 46], ["nea", 46], ["bue", 46], ["cuyo", 46],
                        ...(showPrecioCompra ? [["finalPrice", 105], ["listPrice", 105]] : []),
                        ...(showPrecioPublico ? [["publicPrice", 105]] : []),
                        ["quantity", 58], ["action", 96], ["subtotal", 120]
                      ].map(([columnId, defaultWidth]) => (
                        <col key={columnId} style={{ width: spreadsheetColumnWidths[columnId] ?? defaultWidth }} />
                      ))}
                    </colgroup>
                    <thead className="sticky top-0 z-10" onPointerDown={handleSpreadsheetHeaderPointerDown} onDoubleClick={handleSpreadsheetColumnDoubleClick}>
                      <tr className="bg-[#e9eef7] text-[10px] text-slate-600 uppercase">
                        <th className="relative w-[34px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">#<button type="button" aria-label="Ajustar ancho de numero" onPointerDown={(event) => startColumnResize(event, "row", 34)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[90px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Cod.<button type="button" aria-label="Ajustar ancho de codigo" onPointerDown={(event) => startColumnResize(event, "code", 90)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[68px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Marca<button type="button" aria-label="Ajustar ancho de marca" onPointerDown={(event) => startColumnResize(event, "brand", 68)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[400px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Producto<button type="button" aria-label="Ajustar ancho de producto" onPointerDown={(event) => startColumnResize(event, "product", 400)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[130px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Presentaciones<button type="button" aria-label="Ajustar ancho de presentaciones" onPointerDown={(event) => startColumnResize(event, "presentations", 130)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[78px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Tipo<button type="button" aria-label="Ajustar ancho de tipo" onPointerDown={(event) => startColumnResize(event, "type", 78)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[46px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">NOA<button type="button" aria-label="Ajustar ancho de NOA" onPointerDown={(event) => startColumnResize(event, "noa", 46)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[46px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">NEA<button type="button" aria-label="Ajustar ancho de NEA" onPointerDown={(event) => startColumnResize(event, "nea", 46)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[46px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">BUE<button type="button" aria-label="Ajustar ancho de BUE" onPointerDown={(event) => startColumnResize(event, "bue", 46)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[46px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">CUY<button type="button" aria-label="Ajustar ancho de CUY" onPointerDown={(event) => startColumnResize(event, "cuyo", 46)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        {showPrecioCompra && (
                          <th className="relative w-[105px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Precio final<button type="button" aria-label="Ajustar ancho de precio final" onPointerDown={(event) => startColumnResize(event, "finalPrice", 105)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        )}
                        {showPrecioCompra && (
                          <th className="relative w-[105px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Precio lista<button type="button" aria-label="Ajustar ancho de precio lista" onPointerDown={(event) => startColumnResize(event, "listPrice", 105)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        )}
                        {showPrecioPublico && (
                          <th className="relative w-[105px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Precio publico<button type="button" aria-label="Ajustar ancho de precio publico" onPointerDown={(event) => startColumnResize(event, "publicPrice", 105)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        )}
                        <th className="relative w-[58px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Cant.<button type="button" aria-label="Ajustar ancho de cantidad" onPointerDown={(event) => startColumnResize(event, "quantity", 58)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[96px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Accion<button type="button" aria-label="Ajustar ancho de accion" onPointerDown={(event) => startColumnResize(event, "action", 96)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                        <th className="relative w-[120px] border border-gray-300 px-2 py-2 text-left font-black whitespace-nowrap">Subtotal<button type="button" aria-label="Ajustar ancho de subtotal" onPointerDown={(event) => startColumnResize(event, "subtotal", 120)} className="absolute -right-1 top-0 z-20 h-full w-2 cursor-col-resize touch-none" /></th>
                      </tr>
                    </thead>
                    <tbody onPointerDown={handleSpreadsheetBodyPointerDown} onDoubleClick={handleSpreadsheetColumnDoubleClick}>
                      {paginatedProducts.length === 0 ? (
                        <tr>
                          <td colSpan={14 + (showPrecioCompra ? 2 : 0) + (showPrecioPublico ? 1 : 0)} className="border border-gray-200 px-4 py-8 text-center text-[11px] font-black uppercase text-slate-500">
                            No se encontraron productos
                          </td>
                        </tr>
                      ) : paginatedProducts.map((product, index) => {
                        const publicPrice = getPublicPrice(product.price);
                        const quantityValue = getSpreadsheetQuantity(product.id);
                        const subtotalPrice = showPrecioPublico ? publicPrice : product.price;
                        const subtotal = Number(quantityValue) * subtotalPrice;
                        const isAdded = spreadsheetAdded[product.id] && Number(quantityValue) > 0;

                        return (
                          <tr key={product.id} className="group odd:bg-white even:bg-[#fbfcff] hover:bg-blue-50">
                            <td className="border border-gray-200 bg-[#f8fafc] px-2 py-1.5 text-center font-bold text-slate-500">
                              {((currentPage - 1) * itemsPerPage) + index + 1}
                            </td>
                            <td className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 px-2 py-1.5 font-mono text-[10px] text-slate-700">{product.code}</td>
                            <td className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 px-2 py-1.5 font-black text-intercap-blue-main uppercase">{product.brand}</td>
                            <td className="border border-gray-200 px-2 py-1.5 font-bold text-intercap-blue-dark uppercase">
                              <div className="flex min-w-0 items-center gap-2">
                                <span className="group/photo relative flex h-8 w-8 shrink-0 items-center justify-center">
                                  <img src={product.image} alt={product.title} className="max-h-8 max-w-8 object-contain mix-blend-multiply" />
                                  <span className="pointer-events-none absolute left-10 top-1/2 z-30 hidden h-[250px] w-[250px] -translate-y-1/2 items-center justify-center rounded-[4px] border border-gray-200 bg-white p-4 shadow-xl group-hover/photo:flex">
                                    <img src={product.image} alt="" className="max-h-full max-w-full object-contain mix-blend-multiply" />
                                  </span>
                                </span>
                                <span className="product-title min-w-0 truncate">{product.title}</span>
                              </div>
                            </td>
                            <td className="overflow-hidden border border-gray-200 px-2 py-1.5 text-[9px] text-slate-600">
                              <div className="space-y-0.5">
                                <div className="truncate">1° Envase Botella 1 UNI</div>
                                <div className="truncate">2° Envase Cajas 10 UNI</div>
                              </div>
                            </td>
                            <td className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 px-2 py-1.5 text-slate-600">{product.type || "-"}</td>
                            <td className={`border border-gray-200 px-2 py-1.5 text-center font-black ${getStockCellClass(product.stock.NOA)}`}>{product.stock.NOA}</td>
                            <td className={`border border-gray-200 px-2 py-1.5 text-center font-black ${getStockCellClass(product.stock.NEA)}`}>{product.stock.NEA}</td>
                            <td className={`border border-gray-200 px-2 py-1.5 text-center font-black ${getStockCellClass(product.stock.BUE)}`}>{product.stock.BUE}</td>
                            <td className={`border border-gray-200 px-2 py-1.5 text-center font-black ${getStockCellClass(product.stock.CUYO)}`}>{product.stock.CUYO}</td>
                            {showPrecioCompra && (
                              <td data-price className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 px-2 py-1.5 text-right font-black text-intercap-blue-main">${formatPrice(product.price)}</td>
                            )}
                            {showPrecioCompra && (
                              <td data-price className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 px-2 py-1.5 text-right font-bold text-gray-400 line-through">${formatPrice(product.originalPrice * 1.1)}</td>
                            )}
                            {showPrecioPublico && (
                              <td data-price className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 px-2 py-1.5 text-right font-black text-orange-500">
                                ${formatPrice(publicPrice)}
                              </td>
                            )}
                            <td className="border border-gray-200 px-0 py-0">
                              <Input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={quantityValue}
                                onChange={(event) => setSpreadsheetQuantity(product.id, event.target.value)}
                                data-quantity-row={index}
                                onKeyDown={(event) => handleQuantityKeyDown(event, index)}
                                onFocus={(event) => event.currentTarget.select()}
                                className="h-10 w-full rounded-none border-0 bg-transparent px-2 text-center text-[12px] font-black text-intercap-blue-dark shadow-none outline-none ring-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-intercap-blue-main"
                              />
                            </td>
                            <td className="border border-gray-200 px-2 py-1.5">
                              {isAdded ? (
                                <Button
                                  variant="outline"
                                  className="h-8 w-full border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100 hover:text-orange-700 text-[10px] font-black uppercase px-2"
                                  onClick={() => resetSpreadsheetQuantity(product.id)}
                                >
                                  <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                                  Quitar
                                </Button>
                              ) : (
                                <Button
                                  className="h-8 w-full bg-intercap-blue-main hover:bg-intercap-blue-dark text-white text-[10px] font-black px-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  disabled={Number(quantityValue) <= 0}
                                  onClick={() => addSpreadsheetProduct(product.id)}
                                >
                                  <ShoppingCart className="w-3.5 h-3.5 mr-1" />
                                  Agregar
                                </Button>
                              )}
                            </td>
                            <td data-subtotal className="overflow-hidden text-ellipsis whitespace-nowrap border border-gray-200 bg-[#f8fafc] px-2 py-1.5 text-right font-black text-intercap-blue-dark">
                              ${formatPrice(subtotal)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
                {paginatedProducts.map((product) => <ProductCard key={product.id} product={product} viewMode={viewMode} />)}
              </div>
            )}
            <div className="mt-8"><Footer /></div>
          </div>
        </main>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }`}</style>
    </div>
  );
}
