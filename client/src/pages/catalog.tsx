import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/mockData";
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

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Brand filter
      if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(product.brand)) return false;
      
      // Width filter
      if (filters.width && filters.width.length > 0 && !filters.width.includes(product.attributes.width)) return false;
      
      // Rim filter
      if (filters.rim && filters.rim.length > 0 && !filters.rim.includes(product.attributes.rim)) return false;
      
      // Ratio filter
      if (filters.ratio && filters.ratio.length > 0 && !filters.ratio.includes(product.attributes.ratio)) return false;

      // Terrain filter
      if (filters.terrainType && filters.terrainType.length > 0 && !filters.terrainType.includes(product.attributes.terrainType)) return false;

      // Usage filter
      if (filters.usage && filters.usage.length > 0) {
        const productUsages = (product.attributes.usage || '').split(';').map((u: string) => u.trim());
        const hasMatch = filters.usage.some((u: string) => productUsages.includes(u));
        if (!hasMatch) return false;
      }

      // Position filter
      if (filters.position && filters.position.length > 0 && !filters.position.includes(product.attributes.position)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (a.isNew ? -1 : 1);
      return 0; // featured default
    });
  }, [filters, sortBy]);

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
                {filteredProducts.map((product) => (
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

            {/* Pagination (Mock) */}
            {filteredProducts.length > 0 && (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="text-sm text-gray-500">Mostrando {filteredProducts.length} productos</div>
                <div className="w-full max-w-xs h-px bg-gray-200"></div>
                <Button variant="outline" className="border-brand-blue-600 text-brand-blue-600 hover:bg-brand-blue-600 hover:text-white px-8 font-bold border-2 h-10">
                  MOSTRAR MÁS
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