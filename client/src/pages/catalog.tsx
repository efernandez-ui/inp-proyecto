import { useState, useMemo } from "react";
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
import { LayoutGrid, List, Filter, Download, ChevronDown, X, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevante');
  const [filters, setFilters] = useState<any>({});

  const [itemsPerPage, setItemsPerPage] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [showPrecioCompra, setShowPrecioCompra] = useState(false);
  const [showPrecioPublico, setShowPrecioPublico] = useState(false);
  const [markup, setMarkup] = useState('');
  const [currency, setCurrency] = useState('ARS');

  const [motoSearch, setMotoSearch] = useState({
    fabricante: '',
    modelo: '',
    cilindrada: '',
    version: '',
    anio: ''
  });

  const filteredProducts = useMemo(() => {
    setCurrentPage(1);

    return PRODUCTS.filter(product => {
      // Corrected keys to match state in FilterSidebar
      const brandFilters = filters.marca || [];
      const categoryFilters = filters.categoria || [];
      const subtypeFilters = filters.subtipo || [];

      // Debugging: Log if brand filter is active but not matching
      if (brandFilters.length > 0 && !brandFilters.includes(product.brand)) return false;
      
      // Categoría: Normalize both sides to avoid mismatches
      if (categoryFilters.length > 0) {
        const productType = (product.type || "").trim().toUpperCase();
        // Check if product type matches any of the selected categories (also normalized)
        const matchesCategory = categoryFilters.some((cf: string) => {
          const normalizedCf = cf.trim().toUpperCase();
          return normalizedCf === productType || 
                 (normalizedCf === "CUBIERTAS" && productType === "CUBIERTA") || // Handle singular/plural
                 (normalizedCf === "CUBIERTA" && productType === "CUBIERTAS");
        });
        if (!matchesCategory) return false;
      }
      
      if (subtypeFilters.length > 0) {
        const productSubtype = (product.subtype || "").trim().toUpperCase();
        const matchesSubtype = subtypeFilters.some((sf: string) => sf.trim().toUpperCase() === productSubtype);
        if (!matchesSubtype) return false;
      }

      // Filter by attributes (width, ratio, rim)
      const anchoFilters = filters.attr_ancho || [];
      const relacionFilters = filters.attr_relacion || [];
      const rodadoFilters = filters.attr_rodado || [];

      // Ensure comparison works even if types differ (number vs string)
      if (anchoFilters.length > 0 && !anchoFilters.some((f: any) => f.toString() === product.width?.toString())) return false;
      if (relacionFilters.length > 0 && !relacionFilters.some((f: any) => f.toString() === product.ratio?.toString())) return false;
      if (rodadoFilters.length > 0 && !rodadoFilters.some((f: any) => f.toString() === product.rim?.toString())) return false;

      if (filters.state && filters.state.length > 0) {
        const matchesState = filters.state.some((s: string) => {
             if (s === 'isHot') return (product.originalPrice && product.originalPrice > product.price);
             if (s === 'isNew') return product.isNew;
             if (s === 'nac') return product.origin === 'Nacional';
             if (s === 'imp') return product.origin === 'Importado';
             return false;
        });
        if (!matchesState) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'menor-precio') return a.price - b.price;
      if (sortBy === 'mayor-precio') return b.price - a.price;
      if (sortBy === 'novedades') return (a.isNew ? -1 : 1);
      return 0;
    });
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
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

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans pt-16">
      <Header />
      
      <div className="bg-[#0b1226] border-t border-white/10 py-3 sticky top-16 z-30">
        <div className="container mx-auto px-4 flex flex-wrap items-center gap-3">
          <span className="text-white font-bold text-sm uppercase tracking-wider mr-2">BUSCADOR POR MOTO</span>
          <Select value={motoSearch.fabricante} onValueChange={(v) => setMotoSearch({...motoSearch, fabricante: v})}>
            <SelectTrigger className="w-[140px] h-9 bg-[#1a233a] text-white border-white/10 text-xs uppercase font-bold">
              <SelectValue placeholder="FABRICANTE" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="honda">Honda</SelectItem>
              <SelectItem value="yamaha">Yamaha</SelectItem>
            </SelectContent>
          </Select>
          <Select value={motoSearch.modelo} onValueChange={(v) => setMotoSearch({...motoSearch, modelo: v})}>
            <SelectTrigger className="w-[120px] h-9 bg-[#1a233a] text-white border-white/10 text-xs uppercase font-bold">
              <SelectValue placeholder="MODELO" />
            </SelectTrigger>
            <SelectContent><SelectItem value="cbr">CBR</SelectItem></SelectContent>
          </Select>
          <Select value={motoSearch.cilindrada} onValueChange={(v) => setMotoSearch({...motoSearch, cilindrada: v})}>
            <SelectTrigger className="w-[120px] h-9 bg-[#1a233a] text-white border-white/10 text-xs uppercase font-bold">
              <SelectValue placeholder="CILINDRADA" />
            </SelectTrigger>
            <SelectContent><SelectItem value="125">125cc</SelectItem></SelectContent>
          </Select>
          <Select value={motoSearch.version} onValueChange={(v) => setMotoSearch({...motoSearch, version: v})}>
            <SelectTrigger className="w-[110px] h-9 bg-[#1a233a] text-white border-white/10 text-xs uppercase font-bold">
              <SelectValue placeholder="VERSION" />
            </SelectTrigger>
            <SelectContent><SelectItem value="std">Standard</SelectItem></SelectContent>
          </Select>
          <Select value={motoSearch.anio} onValueChange={(v) => setMotoSearch({...motoSearch, anio: v})}>
            <SelectTrigger className="w-[90px] h-9 bg-[#1a233a] text-white border-white/10 text-xs uppercase font-bold">
              <SelectValue placeholder="AÑO" />
            </SelectTrigger>
            <SelectContent><SelectItem value="2024">2024</SelectItem></SelectContent>
          </Select>
          <Button className="bg-[#00d1b2] hover:bg-[#00bda1] text-[#0b1226] font-black h-9 px-8 text-xs italic tracking-tighter">
            BUSCAR
          </Button>
          <button className="text-gray-400 hover:text-white text-xs ml-auto" onClick={() => setMotoSearch({fabricante: '', modelo: '', cilindrada: '', version: '', anio: ''})}>
            Borrar todo
          </button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="w-full bg-white flex justify-center py-2">
          <div className="w-full max-w-[1920px] h-[150px] bg-[#fcd34d] flex items-center justify-between px-20 overflow-hidden relative group cursor-pointer">
            <div className="flex items-center gap-10">
              <div className="flex flex-col">
                <span className="text-black font-black text-4xl italic leading-none">OFERTA ESPECIAL</span>
                <span className="text-black font-black text-6xl italic leading-none">-24% OFF</span>
                <span className="text-black font-bold text-2xl mt-2 italic bg-black text-[#fcd34d] px-4 py-1 self-start">KIT SUPER HORSE</span>
              </div>
              <div className="flex gap-4">
                <img src="https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-1_min.jpg" alt="Kit" className="h-[120px] object-contain" />
                <img src="https://imagenes-inp-aws.s3.amazonaws.com/imagenes/productos/001/12042023-001001010165-1_min.jpg" alt="Kit" className="h-[120px] object-contain" />
              </div>
            </div>
            <div className="text-right">
              <div className="text-black font-bold text-sm uppercase">Oferta válida hasta el</div>
              <div className="text-black font-black text-5xl italic">14/01/2026</div>
              <div className="text-black font-bold text-sm uppercase">Inclusive o hasta agotar stock.</div>
            </div>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </div>

        <div className="w-full bg-white py-8 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-[#0b1226] font-black text-xl italic mb-6 text-center uppercase tracking-tight">Ofertas del día</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {dailyDeals.map((product) => (
                <div key={`deal-${product.id}`} className="flex flex-col border border-gray-100 rounded-lg p-3 hover:shadow-md transition-shadow relative bg-white">
                  <Badge className="absolute top-2 left-2 bg-[#00d1b2] text-black text-[10px] font-black px-2 py-0">OFERTA 10%</Badge>
                  <div className="h-40 flex items-center justify-center mb-2">
                    <img src={product.image} alt={product.title} className="max-h-full object-contain" />
                  </div>
                  <div className="text-gray-400 text-[10px] font-bold truncate uppercase">{product.title}</div>
                  <div className="text-gray-400 text-[10px] mb-1">Cod: {product.code}</div>
                  <div className="text-[#0b1226] font-black text-lg">${product.price.toLocaleString('es-AR')}</div>
                  <div className="text-gray-400 text-xs line-through mb-3">${product.originalPrice?.toLocaleString('es-AR')}</div>
                  <Button className="bg-[#0066ff] hover:bg-[#0055dd] text-white text-[10px] font-black h-8 py-0 rounded-md flex items-center gap-2">
                    <ShoppingCart className="w-3 h-3" /> COMPRAR
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 w-full relative min-h-[calc(100vh-64px)]">
        <aside className="w-[260px] shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-auto hidden lg:block custom-scrollbar bg-[#001536]">
          <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} />
        </aside>

        <main className="flex-1 min-w-0 bg-[#f8fafc]">
          <div className="bg-[#0b1226] p-2 sticky top-16 z-20 mb-[15px]">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#0066ff] text-white' : 'text-gray-400 hover:text-white'}`}>
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-[#0066ff] text-white' : 'text-gray-400 hover:text-white'}`}>
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                  <Select value={itemsPerPage.toString()} onValueChange={(v) => { setItemsPerPage(Number(v)); setCurrentPage(1); }}>
                    <SelectTrigger className="w-[60px] h-8 bg-[#1a233a] border-none text-white text-xs font-bold"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-[#1a233a] border-none text-white">
                      <SelectItem value="40">40</SelectItem><SelectItem value="80">80</SelectItem><SelectItem value="120">120</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 text-xs text-gray-400 ml-2">
                    <span>Ordenar por</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[120px] h-8 bg-[#1a233a] border-none text-white text-xs font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-[#1a233a] border-none text-white">
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
                      <Checkbox checked={showPrecioCompra} onCheckedChange={(checked) => setShowPrecioCompra(!!checked)} className="border-gray-500 data-[state=checked]:bg-[#0066ff]" />
                      <span className="text-[11px] font-bold text-white group-hover:text-[#0066ff]">Precio Compra</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <Checkbox checked={showPrecioPublico} onCheckedChange={(checked) => setShowPrecioPublico(!!checked)} className="border-gray-500 data-[state=checked]:bg-[#0066ff]" />
                      <span className="text-[11px] font-bold text-white group-hover:text-[#0066ff]">Precio al Público</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">% markup</span>
                      <Input type="text" value={markup} onChange={(e) => setMarkup(e.target.value)} className="w-[100px] h-8 bg-[#1a233a] border-none text-white text-right pr-2 text-xs" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-l border-white/10 pl-4">
                    <span className="text-[11px] font-bold text-gray-400">Moneda</span>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-[100px] h-8 bg-[#1a233a] border-none text-white text-xs font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-[#1a233a] border-none text-white">
                        <SelectItem value="ARS">ARS (1.00)</SelectItem><SelectItem value="USD">USD (1460.00)</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" className="text-[#0066ff] hover:bg-transparent h-8 px-2" onClick={handleDownload}><Download className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-10">
            <div className="bg-white rounded-md p-2 mb-4 mt-4 border border-gray-200 flex items-center justify-between">
              <div className="text-xs font-bold text-[#0b1226]">Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de {filteredProducts.length} productos</div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>&lt;&lt;</Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>&lt;</Button>
                <div className="flex items-center gap-1 mx-2">
                  {[1, 2, 3, 4].map(p => (
                    <Button key={p} size="sm" className={`w-8 h-8 p-0 text-xs font-bold ${currentPage === p ? "bg-[#0066ff] text-white" : "bg-transparent text-[#0b1226] hover:bg-gray-100"}`} onClick={() => setCurrentPage(p)}>{p}</Button>
                  ))}
                  <span className="text-[#0b1226] mx-1">...</span>
                  <Button size="sm" className={`w-8 h-8 p-0 text-xs font-bold ${currentPage === totalPages ? "bg-[#0066ff] text-white" : "bg-transparent text-[#0b1226] hover:bg-gray-100"}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</Button>
                </div>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>&gt;</Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0" onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>&gt;&gt;</Button>
              </div>
            </div>
            {Object.keys(filters).some(k => filters[k]?.length > 0) && (
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">Filtros Aplicados:</span>
                {Object.entries(filters).map(([key, values]: [string, any]) => values.map((val: string) => (
                  <div key={`${key}-${val}`} className="bg-white border border-gray-200 text-[#0b1226] px-3 py-1 rounded-sm text-[10px] font-black uppercase flex items-center gap-2">
                    <span>{val}</span>
                    <button onClick={() => { const newVals = values.filter((v: string) => v !== val); setFilters({ ...filters, [key]: newVals }); }} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                  </div>
                )))}
                <button onClick={clearAllFilters} className="text-[#0066ff] text-[10px] font-black uppercase hover:underline ml-2">Borrar todo</button>
              </div>
            )}
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1'}`}>
              {paginatedProducts.map((product) => <ProductCard key={product.id} product={product} viewMode={viewMode} />)}
            </div>
            <div className="mt-8"><Footer /></div>
          </div>
        </main>
      </div>
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.05); } .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }`}</style>
    </div>
  );
}
