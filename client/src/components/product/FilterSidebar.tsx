import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Product } from "@/lib/products";

interface FilterSidebarProps {
  products: Product[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
}

export function FilterSidebar({ products, selectedFilters, onFilterChange }: FilterSidebarProps) {
  const [categorySearch, setCategorySearch] = useState("");

  const selectedCategories = selectedFilters.categoria || [];
  const selectedSubtipos = selectedFilters.subtipo || [];
  const selectedMarcas = selectedFilters.marca || [];

  // 1. Get Categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map(p => p.type).filter(Boolean)));
    return (unique as string[]).sort();
  }, [products]);

  // 2. Filter products by category for sub-options
  const productsByCategory = useMemo(() => {
    if (selectedCategories.length === 0) return products;
    return products.filter(p => p.type && selectedCategories.includes(p.type));
  }, [products, selectedCategories]);

  // 3. Available Subtypes and Brands (Dependent on Category)
  const availableSubtipos = useMemo(() => {
    const unique = Array.from(new Set(productsByCategory.map(p => p.subtype).filter(Boolean)));
    return (unique as string[]).sort();
  }, [productsByCategory]);

  const availableMarcas = useMemo(() => {
    const unique = Array.from(new Set(productsByCategory.map(p => p.brand).filter(Boolean)));
    return (unique as string[]).sort();
  }, [productsByCategory]);

  // 4. Products filtered by Category + Subtype + Marca for Attribute recalculation
  const filteredForAttrs = useMemo(() => {
    return productsByCategory.filter(p => {
      if (selectedSubtipos.length > 0 && p.subtype && !selectedSubtipos.includes(p.subtype)) return false;
      if (selectedMarcas.length > 0 && !selectedMarcas.includes(p.brand)) return false;
      return true;
    });
  }, [productsByCategory, selectedSubtipos, selectedMarcas]);

  // 5. Attributes (Only when exactly 1 category is selected)
  const availableAttributes = useMemo(() => {
    if (selectedCategories.length !== 1) return [];

    const attrMap: Record<string, Set<any>> = {};
    filteredForAttrs.forEach(p => {
      if (p.attrs) {
        Object.entries(p.attrs).forEach(([key, val]) => {
          if (!attrMap[key]) attrMap[key] = new Set();
          attrMap[key].add(val);
        });
      }
    });

    return Object.entries(attrMap)
      .map(([key, valuesSet]) => ({
        key,
        values: Array.from(valuesSet).sort()
      }))
      .filter(attr => attr.values.length >= 2); // Rule: at least 2 distinct values
  }, [selectedCategories, filteredForAttrs]);

  // Handle Category changes (Reset dependent filters)
  const handleCategoryChange = (value: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories.filter((v: string) => v !== value);

    const newFilters: Record<string, string[]> = { ...selectedFilters, categoria: newCategories };

    // Rule: if category changes, re-validate subtipo and marca
    newFilters.subtipo = [];
    newFilters.marca = [];

    // Rule: if categories != 1, clear attributes
    if (newCategories.length !== 1) {
      Object.keys(newFilters).forEach(key => {
        if (key.startsWith('attr_')) delete newFilters[key];
      });
    }

    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (filterKey: string, value: string, checked: boolean) => {
    const current = selectedFilters[filterKey] || [];
    const updated = checked
      ? [...current, value]
      : current.filter((v: string) => v !== value);
    onFilterChange({ ...selectedFilters, [filterKey]: updated });
  };

  const isChecked = (filterKey: string, value: string) => {
    return (selectedFilters[filterKey] || []).includes(value);
  };

  return (
    <div className="bg-brand-fg h-full text-gray-200 overflow-y-auto p-4 border-r border-[#111827]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-200 text-sm uppercase tracking-wider">Filtros</h2>
        <Button 
          variant="link" 
          className="text-xs text-brand-blue-500 p-0 h-auto hover:text-brand-blue-400"
          onClick={() => onFilterChange({})}
        >
          Limpiar
        </Button>
      </div>

      <div className="space-y-4">
        <Accordion type="multiple" className="w-full" defaultValue={["categoria", "subtipo", "marca"]}>
          
          <AccordionItem value="categoria" className="border-b border-gray-800">
            <AccordionTrigger className="py-3 text-sm uppercase font-bold text-gray-300">
              CATEGORÍA {selectedCategories.length > 0 && `(${selectedCategories.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                <Input 
                  placeholder="Buscar..." 
                  value={categorySearch} 
                  onChange={e => setCategorySearch(e.target.value)}
                  className="pl-7 h-7 bg-[#0b1226] border-gray-700 text-xs"
                />
              </div>
              <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                {categories.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase())).map(cat => (
                  <div key={cat} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cat-${cat}`} 
                      checked={isChecked('categoria', cat)} 
                      onCheckedChange={c => handleCategoryChange(cat, !!c)}
                    />
                    <Label htmlFor={`cat-${cat}`} className="text-sm text-gray-400 cursor-pointer">{cat}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="subtipo" className="border-b border-gray-800">
            <AccordionTrigger className="py-3 text-sm uppercase font-bold text-gray-300">
              SUBTIPOS {selectedSubtipos.length > 0 && `(${selectedSubtipos.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                {availableSubtipos.map(st => (
                  <div key={st} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`st-${st}`} 
                      checked={isChecked('subtipo', st)} 
                      onCheckedChange={c => handleCheckboxChange('subtipo', st, !!c)}
                    />
                    <Label htmlFor={`st-${st}`} className="text-sm text-gray-400 cursor-pointer">{st}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="marca" className="border-b border-gray-800">
            <AccordionTrigger className="py-3 text-sm uppercase font-bold text-gray-300">
              MARCAS {selectedMarcas.length > 0 && `(${selectedMarcas.length})`}
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
                {availableMarcas.map(m => (
                  <div key={m} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`m-${m}`} 
                      checked={isChecked('marca', m)} 
                      onCheckedChange={c => handleCheckboxChange('marca', m, !!c)}
                    />
                    <Label htmlFor={`m-${m}`} className="text-sm text-gray-400 cursor-pointer">{m}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {selectedCategories.length === 1 && availableAttributes.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xs font-bold text-brand-orange-500 uppercase mb-2">Atributos</h3>
              {availableAttributes.map(attr => (
                <AccordionItem key={attr.key} value={`attr-${attr.key}`} className="border-b border-gray-800">
                  <AccordionTrigger className="py-2 text-xs font-semibold text-gray-400">
                    {attr.key}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1 max-h-32 overflow-y-auto custom-scrollbar">
                      {attr.values.map(val => (
                        <div key={String(val)} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`attr-${attr.key}-${val}`} 
                            checked={isChecked(`attr_${attr.key}`, String(val))} 
                            onCheckedChange={c => handleCheckboxChange(`attr_${attr.key}`, String(val), !!c)}
                          />
                          <Label htmlFor={`attr-${attr.key}-${val}`} className="text-xs text-gray-500 cursor-pointer">{val}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
}
