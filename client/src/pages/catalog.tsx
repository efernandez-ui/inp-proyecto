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
import { LayoutGrid, List, Filter, Download, ChevronDown, X, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

// Extract unique values from products
const uniqueBrands = Array.from(new Set(PRODUCTS.map(p => p.brand))).sort();
const uniqueWidths = Array.from(new Set(PRODUCTS.map(p => p.width).filter(w => w && w !== 0))).sort((a, b) => Number(a) - Number(b));
const uniqueRatios = Array.from(new Set(PRODUCTS.map(p => p.ratio).filter(r => r && r !== 0))).sort((a, b) => Number(a) - Number(b));
const uniqueRims = Array.from(new Set(PRODUCTS.map(p => p.rim).filter(r => r && r !== 0))).sort((a, b) => Number(a) - Number(b));
const uniqueTypes = Array.from(new Set(PRODUCTS.map(p => p.type).filter(Boolean))).sort();
const uniqueSubtypes = Array.from(new Set(PRODUCTS.map(p => p.subtype).filter(Boolean))).sort();

export default function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevante');
  const [filters, setFilters] = useState<any>({});
  const [searchQuery, setSearchQuery] = useState('');

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

  const [tireSearch, setTireSearch] = useState({
    ancho: '',
    relacionAspecto: '',
    rodado: '',
    carga: '',
    velocidad: ''
  });

  const handleTireSearch = () => {
    const newFilters = { ...filters };
    if (tireSearch.ancho) newFilters.width = [tireSearch.ancho];
    if (tireSearch.relacionAspecto) newFilters.ratio = [tireSearch.relacionAspecto];
    if (tireSearch.rodado) newFilters.rim = [tireSearch.rodado];
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleMotoSearch = () => {
    // For demo purposes, just show a message
    alert(`Buscando cubiertas para: ${motoSearch.fabricante} ${motoSearch.modelo} ${motoSearch.cilindrada}cc ${motoSearch.anio}`);
  };

  const clearTireSearch = () => {
    setTireSearch({
      ancho: '',
      relacionAspecto: '',
      rodado: '',
      carga: '',
      velocidad: ''
    });
    setFilters((prev: any) => {
      const { width, ratio, rim, ...rest } = prev;
      return rest;
    });
  };

  const filteredProducts = useMemo(() => {
    setCurrentPage(1);

    return PRODUCTS.filter(product => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          product.title.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.code.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Brand filter
      if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      
      // Type filter
      if (filters.type && filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      
      // Subtype filter
      if (filters.subtype && filters.subtype.length > 0 && !filters.subtype.includes(product.subtype)) return false;

      // Width filter (from tire search or sidebar)
      if (filters.width && filters.width.length > 0) {
        const productWidth = String(product.width);
        if (!filters.width.includes(productWidth)) return false;
      }

      // Ratio filter
      if (filters.ratio && filters.ratio.length > 0) {
        const productRatio = String(product.ratio);
        if (!filters.ratio.includes(productRatio)) return false;
      }

      // Rim filter
      if (filters.rim && filters.rim.length > 0) {
        const productRim = String(product.rim);
        if (!filters.rim.includes(productRim)) return false;
      }

      // State filters
      if (filters.state && filters.state.length > 0) {
        const matchesState = filters.state.some((s: string) => {
             if (s === 'isHot') return (product.originalPrice && product.originalPrice > product.price);
             if (s === 'isNew') return product.isNew;
             if (s === 'nac') return product.origin === 'Nacional';
             if (s === 'imp') return product.origin === 'Importado';
             if (s === 'inStock') {
               const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
               return totalStock > 0;
             }
             return false;
        });
        if (!matchesState) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'menor-precio') return a.price - b.price;
      if (sortBy === 'mayor-precio') return b.price - a.price;
      if (sortBy === 'novedades') return (a.isNew ? -1 : 1);
      if (sortBy === 'a-z') return a.title.localeCompare(b.title);
      if (sortBy === 'z-a') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [filters, sortBy, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currencyRate = currency === 'USD' ? 1460.00 : 1.00;

  const handleDownload = () => {
    alert('Descargando lista de precios...');
  };

  const clearAllFilters = () => {
    setFilters({});
    setSearchQuery('');
    clearTireSearch();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(filters).forEach((val: any) => {
      if (Array.isArray(val)) count += val.length;
    });
    if (searchQuery) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans pt-16">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="hidden lg:block w-[260px] shrink-0 h-full overflow-hidden fixed top-16 left-0 z-40 border-r border-[#111827]">
          <FilterSidebar 
            selectedFilters={filters} 
            onFilterChange={setFilters}
            products={PRODUCTS}
          />
        </aside>

        <main className="flex-1 lg:ml-[260px] p-4 overflow-auto h-full">
          
          {/* Global Search */}
          <div className="bg-brand-fg rounded-xl p-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre, código o marca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white border-gray-200 text-gray-900 text-base placeholder:text-gray-400"
                data-testid="input-global-search"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Search Section - Two Search Forms */}
          <div className="bg-brand-blue-900 rounded-xl p-4 mb-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Buscador por Moto */}
              <div>
                <h2 className="text-white font-bold text-lg mb-3">Buscador por Moto</h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={motoSearch.fabricante} onValueChange={(v) => setMotoSearch({...motoSearch, fabricante: v})}>
                    <SelectTrigger className="w-[130px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-moto-fabricante">
                      <SelectValue placeholder="FABRICANTE" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="honda">Honda</SelectItem>
                      <SelectItem value="yamaha">Yamaha</SelectItem>
                      <SelectItem value="suzuki">Suzuki</SelectItem>
                      <SelectItem value="kawasaki">Kawasaki</SelectItem>
                      <SelectItem value="bmw">BMW</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={motoSearch.modelo} onValueChange={(v) => setMotoSearch({...motoSearch, modelo: v})}>
                    <SelectTrigger className="w-[110px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-moto-modelo">
                      <SelectValue placeholder="MODELO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cbr">CBR</SelectItem>
                      <SelectItem value="ninja">Ninja</SelectItem>
                      <SelectItem value="r1">R1</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={motoSearch.cilindrada} onValueChange={(v) => setMotoSearch({...motoSearch, cilindrada: v})}>
                    <SelectTrigger className="w-[120px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-moto-cilindrada">
                      <SelectValue placeholder="CILINDRADA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="125">125cc</SelectItem>
                      <SelectItem value="250">250cc</SelectItem>
                      <SelectItem value="600">600cc</SelectItem>
                      <SelectItem value="1000">1000cc</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={motoSearch.version} onValueChange={(v) => setMotoSearch({...motoSearch, version: v})}>
                    <SelectTrigger className="w-[110px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-moto-version">
                      <SelectValue placeholder="VERSION" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="std">Standard</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                      <SelectItem value="abs">ABS</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={motoSearch.anio} onValueChange={(v) => setMotoSearch({...motoSearch, anio: v})}>
                    <SelectTrigger className="w-[90px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-moto-anio">
                      <SelectValue placeholder="AÑO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold h-9 px-6"
                    onClick={handleMotoSearch}
                    data-testid="button-moto-search"
                  >
                    BUSCAR
                  </Button>
                </div>
              </div>

              {/* Buscador de Cubiertas */}
              <div>
                <h2 className="text-white font-bold text-lg mb-3">Buscador de Cubiertas</h2>
                <div className="flex flex-wrap gap-2 items-center">
                  <Select value={tireSearch.ancho} onValueChange={(v) => setTireSearch({...tireSearch, ancho: v})}>
                    <SelectTrigger className="w-[90px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-tire-ancho">
                      <SelectValue placeholder="Ancho" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueWidths.map(w => (
                        <SelectItem key={String(w)} value={String(w)}>{w}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={tireSearch.relacionAspecto} onValueChange={(v) => setTireSearch({...tireSearch, relacionAspecto: v})}>
                    <SelectTrigger className="w-[140px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-tire-ratio">
                      <SelectValue placeholder="Relación Aspecto" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueRatios.map(r => (
                        <SelectItem key={String(r)} value={String(r)}>{r}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={tireSearch.rodado} onValueChange={(v) => setTireSearch({...tireSearch, rodado: v})}>
                    <SelectTrigger className="w-[100px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-tire-rodado">
                      <SelectValue placeholder="Rodado" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueRims.map(r => (
                        <SelectItem key={String(r)} value={String(r)}>{r}"</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={tireSearch.carga} onValueChange={(v) => setTireSearch({...tireSearch, carga: v})}>
                    <SelectTrigger className="w-[90px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-tire-carga">
                      <SelectValue placeholder="Carga" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="54">54</SelectItem>
                      <SelectItem value="58">58</SelectItem>
                      <SelectItem value="69">69</SelectItem>
                      <SelectItem value="73">73</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={tireSearch.velocidad} onValueChange={(v) => setTireSearch({...tireSearch, velocidad: v})}>
                    <SelectTrigger className="w-[100px] h-9 bg-white text-gray-700 border-gray-200 text-sm [&>span]:text-[#9CA3AF]" data-testid="select-tire-velocidad">
                      <SelectValue placeholder="Velocidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="H">H</SelectItem>
                      <SelectItem value="V">V</SelectItem>
                      <SelectItem value="W">W</SelectItem>
                      <SelectItem value="Z">Z</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold h-9 px-6"
                    onClick={handleTireSearch}
                    data-testid="button-tire-search"
                  >
                    BUSCAR
                  </Button>
                  
                  {(tireSearch.ancho || tireSearch.relacionAspecto || tireSearch.rodado) && (
                    <Button 
                      variant="ghost"
                      className="text-gray-300 hover:text-white h-9 px-3"
                      onClick={clearTireSearch}
                      data-testid="button-tire-clear"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-brand-fg rounded-xl p-3 mb-4">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              
              {/* Left Section: View Mode + Items per page */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 border border-[#334155] rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-brand-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    data-testid="button-grid-view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-all ${viewMode === 'list' ? 'bg-brand-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                    data-testid="button-list-view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <Select value={itemsPerPage.toString()} onValueChange={(v) => {
                  setItemsPerPage(Number(v));
                  setCurrentPage(1);
                }}>
                  <SelectTrigger className="w-[70px] h-8 bg-transparent border-[#334155] text-white text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-fg border-[#334155]">
                    <SelectItem value="40" className="text-white">40</SelectItem>
                    <SelectItem value="80" className="text-white">80</SelectItem>
                    <SelectItem value="120" className="text-white">120</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Ordenar por</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[140px] h-8 bg-transparent border-[#334155] text-white text-sm" data-testid="select-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-fg border-[#334155]">
                      <SelectItem value="relevante" className="text-white">Relevante</SelectItem>
                      <SelectItem value="mas-vendidos" className="text-white">Más vendidos</SelectItem>
                      <SelectItem value="menor-precio" className="text-white">Menor precio</SelectItem>
                      <SelectItem value="mayor-precio" className="text-white">Mayor Precio</SelectItem>
                      <SelectItem value="novedades" className="text-white">Novedades</SelectItem>
                      <SelectItem value="a-z" className="text-white">A - Z</SelectItem>
                      <SelectItem value="z-a" className="text-white">Z - A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Center Section: Price toggles */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox 
                    checked={showPrecioCompra}
                    onCheckedChange={(checked) => setShowPrecioCompra(!!checked)}
                    className="border-gray-500 data-[state=checked]:bg-brand-blue-600"
                  />
                  <span className="text-sm text-white">Precio Compra</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox 
                      checked={showPrecioPublico}
                      onCheckedChange={(checked) => setShowPrecioPublico(!!checked)}
                      className="border-gray-500 data-[state=checked]:bg-brand-blue-600"
                    />
                    <span className="text-sm text-white">Precio al Público</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="% markup"
                    value={markup}
                    onChange={(e) => setMarkup(e.target.value)}
                    className="w-[80px] h-8 bg-transparent border-[#334155] text-white text-sm placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Right Section: Currency + Download */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>Moneda</span>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-[130px] h-8 bg-transparent border-[#334155] text-white text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-fg border-[#334155]">
                      <SelectItem value="ARS" className="text-white">ARS (1.00)</SelectItem>
                      <SelectItem value="USD" className="text-white">USD (1460.00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  variant="ghost" 
                  className="text-brand-blue-500 hover:text-brand-blue-400 gap-2 text-sm"
                  onClick={handleDownload}
                  data-testid="button-download-prices"
                >
                  <span>Descargar precios</span>
                  <Download className="w-4 h-4" />
                </Button>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2 bg-transparent text-white border-[#334155]">
                      <Filter className="w-4 h-4" /> Filtros
                      {getActiveFilterCount() > 0 && (
                        <span className="bg-brand-blue-600 text-white text-xs px-1.5 rounded-full">{getActiveFilterCount()}</span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto bg-brand-fg p-0 border-r-[#111827]">
                    <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} products={PRODUCTS} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Pagination Bar */}
          <div className="bg-brand-fg rounded-xl p-3 mb-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-gray-400">
                Mostrando {filteredProducts.length > 0 ? ((currentPage - 1) * itemsPerPage) + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de {filteredProducts.length} productos
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                >
                  &lt;
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 7) {
                      if (currentPage > 4) {
                        pageNum = currentPage - 3 + i;
                      }
                      if (pageNum > totalPages) {
                        pageNum = totalPages - (6 - i);
                      }
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant="ghost"
                        size="sm"
                        className={`w-8 h-8 p-0 ${currentPage === pageNum ? "bg-brand-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="text-gray-400 hover:text-white disabled:opacity-30"
                >
                  &gt;
                </Button>
              </div>
            </div>
          </div>

          {/* Applied Filters Chips */}
          {(Object.keys(filters).some(k => filters[k]?.length > 0) || searchQuery) && (
            <div className="bg-brand-fg rounded-xl p-3 mb-4">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-gray-400 mr-2">Filtros Aplicados:</span>
                
                {searchQuery && (
                  <div className="bg-brand-blue-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-2">
                    <span>Búsqueda: "{searchQuery}"</span>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="hover:text-red-300 font-bold"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {Object.entries(filters).map(([key, values]: [string, any]) => (
                  values?.map((val: string) => (
                    <div key={`${key}-${val}`} className="bg-brand-blue-600 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-2">
                      <span>{key === 'width' ? `Ancho: ${val}` : key === 'ratio' ? `Ratio: ${val}` : key === 'rim' ? `Rodado: ${val}"` : val}</span>
                      <button 
                        onClick={() => {
                          const newVals = values.filter((v: string) => v !== val);
                          setFilters({ ...filters, [key]: newVals });
                        }}
                        className="hover:text-red-300 font-bold"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                ))}
                <button 
                  onClick={clearAllFilters}
                  className="text-brand-blue-500 hover:text-brand-blue-400 text-xs font-medium ml-2"
                >
                  Borrar todo
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
              <div className="inline-flex p-4 rounded-full bg-gray-50 mb-4">
                <Filter className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No se encontraron productos</h3>
              <p className="text-gray-500 mt-2">Intenta ajustar los filtros de búsqueda.</p>
              <Button 
                variant="outline" 
                className="mt-6"
                onClick={clearAllFilters}
              >
                Limpiar filtros
              </Button>
            </div>
          )}

          <div className="mt-12">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
