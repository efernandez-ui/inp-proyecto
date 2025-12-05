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

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (a.isNew ? -1 : 1);
      return 0; // featured default
    });
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumbs & Title */}
        <div className="mb-8">
          <div className="text-sm text-gray-500 mb-2">Inicio / Catálogo / Cubiertas</div>
          <h1 className="text-4xl font-display italic text-brand-dark">CATÁLOGO DE PRODUCTOS</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-wrap gap-4 justify-between items-center sticky top-20 z-30">
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="font-bold text-brand-dark">{filteredProducts.length}</span> productos encontrados
              </div>

              <div className="flex items-center gap-4 ml-auto">
                {/* Mobile Filter Trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2">
                      <Filter className="w-4 h-4" /> Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                    <div className="py-4">
                       <h2 className="font-display text-xl mb-4">Filtros</h2>
                       <FilterSidebar selectedFilters={filters} onFilterChange={setFilters} />
                    </div>
                  </SheetContent>
                </Sheet>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 hidden sm:inline">Ordenar por:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Destacados" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Destacados</SelectItem>
                      <SelectItem value="price-asc">Menor Precio</SelectItem>
                      <SelectItem value="price-desc">Mayor Precio</SelectItem>
                      <SelectItem value="newest">Más Nuevos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-brand-blue' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-brand-blue' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Chips */}
            {Object.keys(filters).some(k => filters[k]?.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(filters).map(([key, values]: [string, any]) => (
                  values.map((val: string) => (
                    <div key={`${key}-${val}`} className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-brand-blue/20">
                      <span>{val}</span>
                      <button 
                        onClick={() => {
                          const newVals = values.filter((v: string) => v !== val);
                          setFilters({ ...filters, [key]: newVals });
                        }}
                        className="hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))
                ))}
                <button 
                  onClick={() => setFilters({})}
                  className="text-xs text-gray-500 hover:text-red-500 underline ml-2"
                >
                  Limpiar todos
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
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
              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white px-8">
                  Cargar más productos
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
