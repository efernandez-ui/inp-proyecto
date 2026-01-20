import { useState, useMemo, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, X, Filter } from "lucide-react";
import { Product } from "@/lib/products";
import * as filterLib from "@/lib/filters";

interface FilterSidebarProps {
  selectedFilters: any;
  onFilterChange: (filters: any) => void;
  products?: Product[];
}

export function FilterSidebar({ selectedFilters, onFilterChange, products = [] }: FilterSidebarProps) {
  // UI state
  const [categorySearch, setCategorySearch] = useState("");
  
  // Available categories
  const categories = useMemo(() => filterLib.getCategories(), []);

  // Filtered categories for display
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return categories;
    const search = categorySearch.toLowerCase();
    return categories.filter(c => c.toLowerCase().includes(search));
  }, [categorySearch, categories]);

  // Hierarchical state management
  const handleCategorySelect = (catId: string) => {
    // Reset lower levels when category changes
    onFilterChange({
      categoria: catId,
      subtipo: "",
      marca: "",
      attributes: {}
    });
  };

  const handleSubtypeSelect = (subId: string) => {
    onFilterChange({
      ...selectedFilters,
      subtipo: subId,
      marca: "",
      attributes: {}
    });
  };

  const handleBrandSelect = (brand: string) => {
    onFilterChange({
      ...selectedFilters,
      marca: brand
    });
  };

  const handleAttributeChange = (attrKey: string, value: any) => {
    onFilterChange({
      ...selectedFilters,
      attributes: {
        ...selectedFilters.attributes,
        [attrKey]: value
      }
    });
  };

  const clearFilters = () => {
    onFilterChange({
      categoria: "",
      subtipo: "",
      marca: "",
      attributes: {}
    });
    setCategorySearch("");
  };

  // Logic for dependent filters
  const subtypes = useMemo(() => filterLib.getSubtypes(selectedFilters.categoria), [selectedFilters.categoria]);
  const schema = useMemo(() => filterLib.getFilterSchema(selectedFilters.categoria, selectedFilters.subtipo), [selectedFilters.categoria, selectedFilters.subtipo]);
  const options = useMemo(() => filterLib.getAvailableOptions(products, selectedFilters, schema), [products, selectedFilters, schema]);

  return (
    <div className="bg-brand-fg h-full text-gray-200 overflow-y-auto p-4 border-r border-[#111827]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-200 text-sm uppercase tracking-wider flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filtros
        </h2>
        <Button 
          variant="link" 
          className="text-xs text-brand-blue-500 p-0 h-auto hover:text-brand-blue-400"
          onClick={clearFilters}
          data-testid="button-clear-filters"
        >
          Limpiar
        </Button>
      </div>
      
      <div className="space-y-6">
        
        {/* 1) CATEGORIA */}
        <section>
          <Label className="text-brand-blue-500 font-bold uppercase text-xs mb-2 block">1. Categoría</Label>
          <div className="relative mb-3">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              placeholder="Buscar categoría..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="pl-8 h-9 bg-[#0b1226] border-gray-700 text-white text-sm"
              data-testid="input-category-search"
            />
          </div>
          <Select value={selectedFilters.categoria} onValueChange={handleCategorySelect}>
            <SelectTrigger className="w-full bg-[#0b1226] border-gray-700 text-sm h-10" data-testid="select-category">
              <SelectValue placeholder="Seleccione Categoría" />
            </SelectTrigger>
            <SelectContent className="bg-brand-fg border-gray-700 text-white max-h-[300px]">
              {filteredCategories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* 2) SUBTIPO */}
        <section className={!selectedFilters.categoria ? "opacity-50 pointer-events-none" : ""}>
          <Label className="text-brand-blue-500 font-bold uppercase text-xs mb-2 block">2. Subtipo</Label>
          <Select 
            disabled={!selectedFilters.categoria} 
            value={selectedFilters.subtipo} 
            onValueChange={handleSubtypeSelect}
          >
            <SelectTrigger className="w-full bg-[#0b1226] border-gray-700 text-sm h-10" data-testid="select-subtype">
              <SelectValue placeholder={selectedFilters.categoria ? "Seleccione Subtipo" : "Elija Categoría primero"} />
            </SelectTrigger>
            <SelectContent className="bg-brand-fg border-gray-700 text-white max-h-[300px]">
              {subtypes.map(sub => (
                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* 3) MARCA */}
        {(schema.brandFilter || options.brands.length > 0) && (
          <section className={!selectedFilters.subtipo ? "opacity-50 pointer-events-none" : ""}>
            <Label className="text-brand-blue-500 font-bold uppercase text-xs mb-2 block">3. Marca</Label>
            <Select 
              disabled={!selectedFilters.subtipo} 
              value={selectedFilters.marca} 
              onValueChange={handleBrandSelect}
            >
              <SelectTrigger className="w-full bg-[#0b1226] border-gray-700 text-sm h-10" data-testid="select-brand">
                <SelectValue placeholder="Todas las Marcas" />
              </SelectTrigger>
              <SelectContent className="bg-brand-fg border-gray-700 text-white max-h-[300px]">
                <SelectItem value="all_brands">Todas las Marcas</SelectItem>
                {options.brands.map((brand: string) => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}

        {/* 4) ATRIBUTOS DINAMICOS */}
        {selectedFilters.subtipo && Object.keys(options.attributes).length > 0 && (
          <section className="space-y-4 pt-2 border-t border-gray-800">
            <Label className="text-orange-500 font-bold uppercase text-xs mb-2 block">4. Atributos</Label>
            <Accordion type="multiple" className="w-full" defaultValue={Object.keys(options.attributes).map(k => `attr-${k}`)}>
              {Object.entries(options.attributes).map(([key, data]: [string, any]) => (
                <AccordionItem key={key} value={`attr-${key}`} className="border-b border-gray-800">
                  <AccordionTrigger className="py-2 text-xs hover:no-underline text-gray-300 font-semibold uppercase">
                    {key}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-4">
                    {data.isNumeric && data.range ? (
                      <div className="flex gap-2 items-center">
                        <Input 
                          type="number" 
                          placeholder="Min"
                          className="h-8 bg-[#0b1226] border-gray-700 text-xs"
                          value={selectedFilters.attributes[key]?.min || ""}
                          onChange={(e) => handleAttributeChange(key, { ...selectedFilters.attributes[key], min: Number(e.target.value) })}
                        />
                        <span className="text-gray-500">-</span>
                        <Input 
                          type="number" 
                          placeholder="Max"
                          className="h-8 bg-[#0b1226] border-gray-700 text-xs"
                          value={selectedFilters.attributes[key]?.max || ""}
                          onChange={(e) => handleAttributeChange(key, { ...selectedFilters.attributes[key], max: Number(e.target.value) })}
                        />
                      </div>
                    ) : (
                      <div className="space-y-1.5 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                        {data.values.map((val: any) => (
                          <div key={String(val)} className="flex items-center space-x-2 py-0.5">
                            <Checkbox 
                              id={`attr-${key}-${val}`} 
                              checked={selectedFilters.attributes[key] === val}
                              onCheckedChange={(checked) => handleAttributeChange(key, checked ? val : "")}
                              className="h-4 w-4 border-gray-600 data-[state=checked]:bg-orange-500"
                            />
                            <Label 
                              htmlFor={`attr-${key}-${val}`} 
                              className="text-xs text-gray-400 cursor-pointer hover:text-white transition-colors"
                            >
                              {val}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
