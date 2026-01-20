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
import { LayoutGrid, List, Download, X, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import * as filterLib from "@/lib/filters";

export default function Catalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevante');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Normalized selection state
  const [selection, setSelection] = useState({
    categoria: "",
    subtipo: "",
    marca: "",
    attributes: {}
  });

  const [itemsPerPage, setItemsPerPage] = useState<number>(40);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Apply hierarchical filters
  const filteredProducts = useMemo(() => {
    let result = filterLib.applyFilters(PRODUCTS, selection);

    // Text search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q) || 
        p.code.toLowerCase().includes(q)
      );
    }

    // Sort
    return result.sort((a, b) => {
      if (sortBy === 'menor-precio') return a.price - b.price;
      if (sortBy === 'mayor-precio') return b.price - a.price;
      if (sortBy === 'novedades') return (a.isNew ? -1 : 1);
      if (sortBy === 'a-z') return a.title.localeCompare(b.title);
      if (sortBy === 'z-a') return b.title.localeCompare(a.title);
      return 0;
    });
  }, [selection, searchQuery, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearAllFilters = () => {
    setSelection({
      categoria: "",
      subtipo: "",
      marca: "",
      attributes: {}
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans pt-16">
      <Header />
      
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="hidden lg:block w-[260px] shrink-0 h-full overflow-hidden fixed top-16 left-0 z-40 border-r border-[#111827]">
          <FilterSidebar 
            selectedFilters={selection} 
            onFilterChange={(newSel) => {
              setSelection(newSel);
              setCurrentPage(1);
            }}
            products={PRODUCTS}
          />
        </aside>

        <main className="flex-1 lg:ml-[260px] p-4 overflow-auto h-full">
          
          {/* Search Section */}
          <div className="bg-brand-fg rounded-xl p-4 mb-4 flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, marca o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white border-gray-200 text-gray-900"
              />
            </div>
            {selection.categoria && (
              <div className="bg-brand-blue-900 rounded-lg px-4 flex items-center gap-2 text-white border border-brand-blue-700">
                <span className="text-xs font-bold opacity-70 uppercase">Filtrando:</span>
                <span className="text-sm font-semibold">{selection.categoria}</span>
                {selection.subtipo && (
                  <>
                    <span className="opacity-30">/</span>
                    <span className="text-sm font-semibold">{selection.subtipo}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Controls Bar */}
          <div className="bg-brand-fg rounded-xl p-3 mb-4">
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 border border-[#334155] rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-all ${viewMode === 'grid' ? 'bg-brand-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-all ${viewMode === 'list' ? 'bg-brand-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
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
                    <SelectItem value="20" className="text-white">20</SelectItem>
                    <SelectItem value="40" className="text-white">40</SelectItem>
                    <SelectItem value="80" className="text-white">80</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px] h-8 bg-transparent border-[#334155] text-white text-sm">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-fg border-[#334155]">
                    <SelectItem value="relevante" className="text-white">Relevante</SelectItem>
                    <SelectItem value="menor-precio" className="text-white">Menor precio</SelectItem>
                    <SelectItem value="mayor-precio" className="text-white">Mayor Precio</SelectItem>
                    <SelectItem value="novedades" className="text-white">Novedades</SelectItem>
                    <SelectItem value="a-z" className="text-white">A - Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  <strong className="text-white">{filteredProducts.length}</strong> resultados
                </span>
                {(selection.categoria || searchQuery) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearAllFilters}
                    className="text-red-400 hover:text-red-300 hover:bg-red-950/30 gap-1 h-8"
                  >
                    <X className="w-3 h-3" /> Limpiar todo
                  </Button>
                )}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden gap-2 bg-transparent text-white border-[#334155]">
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] bg-brand-fg p-0 border-r-[#111827]">
                    <FilterSidebar selectedFilters={selection} onFilterChange={setSelection} products={PRODUCTS} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          {/* Results Area */}
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-3 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1'}`}>
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-brand-fg/30 rounded-2xl border-2 border-dashed border-gray-800">
              <div className="inline-flex p-5 rounded-full bg-gray-900 mb-4">
                <Search className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Sin resultados</h3>
              <p className="text-gray-500 max-w-xs mx-auto mb-8">No encontramos productos que coincidan con tu selección actual.</p>
              <Button onClick={clearAllFilters} className="bg-brand-blue-600 hover:bg-brand-blue-700">
                Limpiar todos los filtros
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="bg-transparent border-gray-800 text-white"
              >
                Anterior
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <Button
                    key={p}
                    size="sm"
                    variant={currentPage === p ? "default" : "outline"}
                    onClick={() => setCurrentPage(p)}
                    className={currentPage === p ? "bg-brand-blue-600" : "bg-transparent border-gray-800 text-white"}
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                className="bg-transparent border-gray-800 text-white"
              >
                Siguiente
              </Button>
            </div>
          )}

          <div className="mt-16">
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
