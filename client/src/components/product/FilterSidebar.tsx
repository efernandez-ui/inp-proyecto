import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  CATALOG_HIERARCHY,
  ATTRIBUTE_SCHEMA_BY_CATEGORY,
  ATTRIBUTE_VALUES,
  getSubtiposForCategories,
  getMarcasForCategories
} from "@/lib/catalogData";

interface FilterSidebarProps {
  selectedFilters: any;
  onFilterChange: (filters: any) => void;
}

export function FilterSidebar({ selectedFilters, onFilterChange }: FilterSidebarProps) {
  const [categorySearch, setCategorySearch] = useState("");
  const [subtipoSearch, setSubtipoSearch] = useState("");
  const [marcaSearch, setMarcaSearch] = useState("");
  
  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    const current = selectedFilters[category] || [];
    const updated = checked 
      ? [...current, value]
      : current.filter((item: string) => item !== value);
    
    const newFilters = { ...selectedFilters, [category]: updated };
    
    if (category === 'categoria') {
      newFilters.subtipo = [];
      newFilters.marca = [];
      Object.keys(ATTRIBUTE_SCHEMA_BY_CATEGORY).forEach(catId => {
        const attrs = ATTRIBUTE_SCHEMA_BY_CATEGORY[catId];
        attrs.atributos.forEach(attr => {
          delete newFilters[`attr_${attr.key}`];
        });
      });
    }
    
    onFilterChange(newFilters);
  };

  const isChecked = (category: string, value: string) => {
    return (selectedFilters[category] || []).includes(value);
  };

  const MOTO_BRANDS = ["Honda", "Yamaha", "Suzuki", "Kawasaki", "BMW", "KTM", "Ducati"];
  const MOTO_MODELS: Record<string, string[]> = {
    "Honda": ["CB 190", "Tornado 250", "Wave 110", "Titan 150"],
    "Yamaha": ["FZ 25", "Crypton", "YBR 125", "XTZ 125"],
    "Suzuki": ["GN 125", "Gixxer 150", "AX 100"],
    "Kawasaki": ["Ninja 400", "Versys 650", "KLR 650"],
    "BMW": ["GS 1200", "GS 850", "G 310"],
    "KTM": ["Duke 200", "Duke 390", "Adventure 390"],
    "Ducati": ["Scrambler", "Monster", "Multistrada"]
  };

  const [selectedMotoBrand, setSelectedMotoBrand] = useState<string>("");

  const selectedCategories = selectedFilters.categoria || [];
  
  const availableSubtipos = useMemo(() => {
    return getSubtiposForCategories(selectedCategories);
  }, [selectedCategories]);

  const availableMarcas = useMemo(() => {
    return getMarcasForCategories(selectedCategories);
  }, [selectedCategories]);

  const categoryAttributes = useMemo(() => {
    if (selectedCategories.length === 1) {
      const catId = selectedCategories[0];
      return ATTRIBUTE_SCHEMA_BY_CATEGORY[catId] || null;
    }
    return null;
  }, [selectedCategories]);

  const attributeValues = useMemo(() => {
    if (selectedCategories.length === 1) {
      return ATTRIBUTE_VALUES[selectedCategories[0]] || {};
    }
    return {};
  }, [selectedCategories]);

  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return CATALOG_HIERARCHY;
    const search = categorySearch.toLowerCase();
    return CATALOG_HIERARCHY.filter(cat => 
      cat.nombre.toLowerCase().includes(search)
    );
  }, [categorySearch]);

  const filteredSubtipos = useMemo(() => {
    if (!subtipoSearch.trim()) return availableSubtipos;
    const search = subtipoSearch.toLowerCase();
    return availableSubtipos.filter(st => 
      st.nombre.toLowerCase().includes(search)
    );
  }, [subtipoSearch, availableSubtipos]);

  const filteredMarcas = useMemo(() => {
    if (!marcaSearch.trim()) return availableMarcas;
    const search = marcaSearch.toLowerCase();
    return availableMarcas.filter(m => 
      m.nombre.toLowerCase().includes(search)
    );
  }, [marcaSearch, availableMarcas]);

  const handleAttributeChange = (attrKey: string, value: string) => {
    const filterKey = `attr_${attrKey}`;
    const current = selectedFilters[filterKey] || [];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    onFilterChange({ ...selectedFilters, [filterKey]: updated });
  };

  const isAttributeSelected = (attrKey: string, value: string) => {
    return (selectedFilters[`attr_${attrKey}`] || []).includes(value);
  };

  return (
    <div className="bg-brand-fg h-full text-gray-200 overflow-y-auto p-4 border-r border-[#111827]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-gray-200 text-sm uppercase tracking-wider">Filtros</h2>
        <Button 
          variant="link" 
          className="text-xs text-brand-blue-500 p-0 h-auto hover:text-brand-blue-400"
          onClick={() => {
            onFilterChange({});
            setSelectedMotoBrand("");
            setCategorySearch("");
            setSubtipoSearch("");
            setMarcaSearch("");
          }}
          data-testid="button-clear-filters"
        >
          Limpiar
        </Button>
      </div>
      
      <div className="space-y-4">
        
        <section>
          <h3 className="font-bold text-sm text-brand-blue-500 mb-3 uppercase tracking-wide">Estado</h3>
          <div className="space-y-2">
            {[
              { id: 'isHot', label: 'Ofertas' },
              { id: 'isNew', label: 'Novedades' },
              { id: 'nac', label: 'Solo Nac.' },
              { id: 'imp', label: 'Importado' }
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`state-${item.id}`} 
                  checked={isChecked('state', item.id)}
                  onCheckedChange={(checked) => handleCheckboxChange('state', item.id, checked as boolean)}
                  className="border-gray-500 data-[state=checked]:bg-brand-blue-600 data-[state=checked]:border-brand-blue-600"
                  data-testid={`checkbox-state-${item.id}`}
                />
                <Label htmlFor={`state-${item.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-gray-800 w-full" />

        <section>
          <Accordion type="multiple" className="w-full" defaultValue={["categoria"]}>
            
            <AccordionItem value="categoria" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                CATEGORÍA
                {selectedCategories.length > 0 && (
                  <span className="ml-2 bg-brand-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {selectedCategories.length}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar categoría..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="pl-8 h-8 bg-[#0b1226] border-gray-700 text-white text-sm placeholder:text-[#9CA3AF]"
                    data-testid="input-category-search"
                  />
                </div>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredCategories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2 py-0.5">
                      <Checkbox 
                        id={`cat-${cat.id}`} 
                        checked={isChecked('categoria', cat.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('categoria', cat.id, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                        data-testid={`checkbox-category-${cat.id}`}
                      />
                      <Label htmlFor={`cat-${cat.id}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors leading-tight">
                        {cat.nombre}
                      </Label>
                    </div>
                  ))}
                  {filteredCategories.length === 0 && (
                    <p className="text-xs text-gray-500 py-2">No se encontraron categorías</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="subtipo" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                SUBTIPOS
                {(selectedFilters.subtipo?.length || 0) > 0 && (
                  <span className="ml-2 bg-brand-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {selectedFilters.subtipo.length}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar subtipo..."
                    value={subtipoSearch}
                    onChange={(e) => setSubtipoSearch(e.target.value)}
                    className="pl-8 h-8 bg-[#0b1226] border-gray-700 text-white text-sm placeholder:text-[#9CA3AF]"
                    data-testid="input-subtipo-search"
                  />
                </div>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredSubtipos.map((st) => (
                    <div key={st.id} className="flex items-center space-x-2 py-0.5">
                      <Checkbox 
                        id={`subtipo-${st.id}`} 
                        checked={isChecked('subtipo', st.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('subtipo', st.id, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                        data-testid={`checkbox-subtipo-${st.id}`}
                      />
                      <Label htmlFor={`subtipo-${st.id}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors leading-tight">
                        {st.nombre}
                      </Label>
                    </div>
                  ))}
                  {filteredSubtipos.length === 0 && (
                    <p className="text-xs text-gray-500 py-2">
                      {selectedCategories.length === 0 
                        ? "Selecciona una categoría primero" 
                        : "No se encontraron subtipos"}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="marca" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                MARCAS
                {(selectedFilters.marca?.length || 0) > 0 && (
                  <span className="ml-2 bg-brand-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {selectedFilters.marca.length}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar marca..."
                    value={marcaSearch}
                    onChange={(e) => setMarcaSearch(e.target.value)}
                    className="pl-8 h-8 bg-[#0b1226] border-gray-700 text-white text-sm placeholder:text-[#9CA3AF]"
                    data-testid="input-marca-search"
                  />
                </div>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredMarcas.map((marca) => (
                    <div key={marca.id} className="flex items-center space-x-2 py-0.5">
                      <Checkbox 
                        id={`marca-${marca.id}`} 
                        checked={isChecked('marca', marca.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('marca', marca.id, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                        data-testid={`checkbox-marca-${marca.id}`}
                      />
                      <Label htmlFor={`marca-${marca.id}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors leading-tight">
                        {marca.nombre}
                      </Label>
                    </div>
                  ))}
                  {filteredMarcas.length === 0 && (
                    <p className="text-xs text-gray-500 py-2">
                      {selectedCategories.length === 0 
                        ? "Selecciona una categoría primero" 
                        : "No se encontraron marcas"}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {categoryAttributes && (
              <>
                <div className="h-px bg-gray-800 w-full my-2" />
                <div className="py-2">
                  <h3 className="font-bold text-sm text-brand-orange-500 mb-2 uppercase tracking-wide flex items-center gap-2">
                    Atributos de {categoryAttributes.categoria}
                  </h3>
                </div>
                
                {categoryAttributes.atributos.map((attr) => (
                  <AccordionItem key={attr.key} value={`attr-${attr.key}`} className="border-b border-gray-800">
                    <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 font-semibold">
                      {attr.label}
                      {(selectedFilters[`attr_${attr.key}`]?.length || 0) > 0 && (
                        <span className="ml-2 bg-brand-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {selectedFilters[`attr_${attr.key}`].length}
                        </span>
                      )}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-1.5 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                        {(attributeValues[attr.key] || []).map((val) => (
                          <div key={String(val)} className="flex items-center space-x-2 py-0.5">
                            <Checkbox 
                              id={`attr-${attr.key}-${val}`} 
                              checked={isAttributeSelected(attr.key, String(val))}
                              onCheckedChange={() => handleAttributeChange(attr.key, String(val))}
                              className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-orange-500"
                              data-testid={`checkbox-attr-${attr.key}-${val}`}
                            />
                            <Label 
                              htmlFor={`attr-${attr.key}-${val}`} 
                              className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors"
                            >
                              {val}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </>
            )}
          </Accordion>
        </section>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.05);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.3);
        }
      `}</style>
    </div>
  );
}
