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
import { LayoutGrid, List, Filter, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export default function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<any>({});

  const [itemsPerPage, setItemsPerPage] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter logic
  const filteredProducts = useMemo(() => {
    // Reset to page 1 when filters change
    setCurrentPage(1);

    return PRODUCTS.filter(product => {
      // Brand filter
      if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      
      // Type filter
      if (filters.type && filters.type.length > 0 && !filters.type.includes(product.type)) return false;
      
      // Subtype filter
      if (filters.subtype && filters.subtype.length > 0 && !filters.subtype.includes(product.subtype)) return false;

      // State filter
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
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (a.isNew ? -1 : 1);
      return 0; // featured default
    });
  }, [filters, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans pt-16">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar (Desktop) - Fixed */}
        <aside className="hidden lg:block w-[260px] shrink-0 h-full overflow-hidden fixed top-16 left-0 z-40 border-r border-[#111827]">
          <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} />
        </aside>

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 lg:ml-[260px] p-4 overflow-auto h-full">
          
          {/* Hero Section */}
          <div className="bg-brand-blue-900 rounded-2xl p-6 text-white mb-6">
             <h1 className="text-2xl font-bold mb-4">Encontrá el neumático para tu moto</h1>
             <div className="flex gap-2">
               <div className="relative flex-1 max-w-md">
                  <Input 
                    type="text" 
                    placeholder="Ej: 120/70-17" 
                    className="bg-brand-fg border-[#223] text-white h-10 w-full pl-3 rounded-[10px] placeholder:text-gray-500"
                  />
               </div>
               <Button className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold rounded-[10px] px-6">
                 Buscar
               </Button>
             </div>
          </div>

          {/* Active Filters Chips */}
          {Object.keys(filters).some(k => filters[k]?.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6 items-center">
              <h3 className="text-sm font-bold text-brand-fg mr-2">Filtros aplicados:</h3>
              {Object.entries(filters).map(([key, values]: [string, any]) => (
                values.map((val: string) => (
                  <div key={`${key}-${val}`} className="bg-brand-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <span>{val}</span>
                    <button 
                      onClick={() => {
                        const newVals = values.filter((v: string) => v !== val);
                        setFilters({ ...filters, [key]: newVals });
                      }}
                      className="hover:text-red-200 font-bold ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))
              ))}
            </div>
          )}

          {/* Controls Bar */}
          <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm text-brand-fg">Ordenar por:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] h-10 bg-brand-fg border-[#223] text-white rounded-[10px]">
                      <SelectValue placeholder="Destacados" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-fg text-white border-[#223]">
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                      <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                      <SelectItem value="newest">Más Nuevos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 hidden sm:flex">
                  <label className="text-sm text-brand-fg">Mostrar:</label>
                  <Select value={itemsPerPage.toString()} onValueChange={(v) => {
                    setItemsPerPage(Number(v));
                    setCurrentPage(1);
                  }}>
                    <SelectTrigger className="w-[80px] h-10 bg-brand-fg border-[#223] text-white rounded-[10px]">
                      <SelectValue placeholder="40" />
                    </SelectTrigger>
                    <SelectContent className="bg-brand-fg text-white border-[#223]">
                      <SelectItem value="40">40</SelectItem>
                      <SelectItem value="80">80</SelectItem>
                      <SelectItem value="120">120</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                  {/* Mobile Filter Trigger */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden gap-2 bg-brand-fg text-white border-[#223]">
                        <Filter className="w-4 h-4" /> Filtros
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto bg-brand-fg p-0 border-r-[#111827]">
                        <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} />
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-[8px] text-sm font-medium border transition-all ${viewMode === 'grid' ? 'bg-brand-blue-600 text-white border-transparent' : 'bg-brand-fg text-gray-200 border-[#223]'}`}
                    >
                      <LayoutGrid className="w-4 h-4" />
                      Celda
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-[8px] text-sm font-medium border transition-all ${viewMode === 'list' ? 'bg-brand-blue-600 text-white border-transparent' : 'bg-brand-fg text-gray-200 border-[#223]'}`}
                    >
                      <List className="w-4 h-4" />
                      Lista
                    </button>
                  </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5' : 'grid-cols-1'}`}>
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
                  onClick={() => setFilters({})}
                >
                  Limpiar filtros
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  Mostrando {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, filteredProducts.length)} de {filteredProducts.length} productos
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-gray-200"
                  >
                    Anterior
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum = i + 1;
                      if (totalPages > 5) {
                        if (currentPage > 3) {
                          pageNum = currentPage - 2 + i;
                        }
                        if (pageNum > totalPages) {
                          pageNum = totalPages - (4 - i);
                        }
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className={`w-8 h-8 p-0 ${currentPage === pageNum ? "bg-brand-blue-600 text-white" : "text-gray-600 border-gray-200"}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-gray-200"
                  >
                    Siguiente
                  </Button>
                </div>
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