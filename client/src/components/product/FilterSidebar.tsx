import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
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
    onFilterChange(newFilters);
  };

  const isChecked = (category: string, value: string) => {
    return (selectedFilters[category] || []).includes(value);
  };

  const selectedCategories = selectedFilters.categoria || [];
  
  const availableSubtipos = useMemo(() => {
    return getSubtiposForCategories(selectedCategories);
  }, [selectedCategories]);

  const availableMarcas = useMemo(() => {
    return getMarcasForCategories(selectedCategories);
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

  // Aggregate all attributes across categories
  const allAttributes = useMemo(() => {
    const attrs: Record<string, { label: string, values: any[] }> = {};
    Object.values(ATTRIBUTE_SCHEMA_BY_CATEGORY).forEach(schema => {
      schema.atributos.forEach(attr => {
        if (!attrs[attr.key]) {
          attrs[attr.key] = { 
            label: attr.label, 
            values: ATTRIBUTE_VALUES[schema.categoria]?.[attr.key] || [] 
          };
        }
      });
    });
    return attrs;
  }, []);

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
    <div className="flex flex-col gap-0 select-none">
      <div className="flex justify-between items-center bg-[#0b1226] p-3 rounded-t-md border-b border-white/10">
        <h2 className="font-black text-white text-sm uppercase italic tracking-tighter">Filtros</h2>
        <button 
          className="text-[10px] font-bold text-[#0066ff] uppercase hover:underline"
          onClick={() => onFilterChange({})}
        >
          Limpiar
        </button>
      </div>
      
      <div className="space-y-0">
        {/* ESTADO Section */}
        <Accordion type="single" collapsible defaultValue="estado" className="w-full">
          <AccordionItem value="estado" className="border-none">
            <AccordionTrigger className="bg-[#0b1226] hover:no-underline px-4 py-3 text-[11px] font-black text-white uppercase italic border-b border-white/10 [&[data-state=open]>svg]:rotate-180">
              ESTADO
            </AccordionTrigger>
            <AccordionContent className="bg-[#1a233a] p-4 pb-6 space-y-3">
              {[
                { id: 'isHot', label: 'Ofertas' },
                { id: 'isNew', label: 'Novedades' },
                { id: 'disp', label: 'Disponible' },
                { id: 'var', label: 'Variación de precio' }
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-3 group cursor-pointer">
                  <div className="relative flex items-center">
                    <Checkbox 
                      id={`state-${item.id}`} 
                      checked={isChecked('state', item.id)}
                      onCheckedChange={(checked) => handleCheckboxChange('state', item.id, checked as boolean)}
                      className="w-4 h-4 border-white/30 data-[state=checked]:bg-[#00d1b2] data-[state=checked]:border-[#00d1b2] rounded-full"
                    />
                  </div>
                  <Label htmlFor={`state-${item.id}`} className="text-xs font-bold text-gray-400 group-hover:text-white cursor-pointer uppercase tracking-wide">
                    {item.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* MARCAS Section */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="marcas" className="border-none">
            <AccordionTrigger className="bg-[#0b1226] hover:no-underline px-4 py-3 text-[11px] font-black text-white uppercase italic border-b border-white/10 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                MARCAS
                {selectedFilters.marca?.length > 0 && <span className="bg-[#0066ff] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedFilters.marca.length}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#1a233a] p-0">
              <div className="p-3">
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <Input
                    placeholder="Buscar Marcas"
                    value={marcaSearch}
                    onChange={(e) => setMarcaSearch(e.target.value)}
                    className="pl-7 h-8 bg-[#0b1226] border-white/10 text-white text-xs placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredMarcas.map((marca) => (
                    <div key={marca.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`marca-${marca.id}`} 
                        checked={isChecked('marca', marca.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('marca', marca.id, checked as boolean)}
                        className="w-4 h-4 border-white/30 data-[state=checked]:bg-[#00d1b2] rounded-full"
                      />
                      <Label htmlFor={`marca-${marca.id}`} className="text-xs font-bold text-gray-400 group-hover:text-white cursor-pointer uppercase">
                        {marca.nombre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* TIPOS DE PRODUCTO (CATEGORÍA) Section */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="tipos" className="border-none">
            <AccordionTrigger className="bg-[#0b1226] hover:no-underline px-4 py-3 text-[11px] font-black text-white uppercase italic border-b border-white/10 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                TIPOS DE PRODUCTO
                {selectedCategories.length > 0 && <span className="bg-[#0066ff] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedCategories.length}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#1a233a] p-0">
              <div className="p-3">
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <Input
                    placeholder="Buscar Tipo Producto"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="pl-7 h-8 bg-[#0b1226] border-white/10 text-white text-xs placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredCategories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`cat-${cat.id}`} 
                        checked={isChecked('categoria', cat.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('categoria', cat.id, checked as boolean)}
                        className="w-4 h-4 border-white/30 data-[state=checked]:bg-[#00d1b2] rounded-full"
                      />
                      <Label htmlFor={`cat-${cat.id}`} className="text-xs font-bold text-gray-400 group-hover:text-white cursor-pointer uppercase">
                        {cat.nombre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* SUBTIPOS Section */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="subtipos" className="border-none">
            <AccordionTrigger className="bg-[#0b1226] hover:no-underline px-4 py-3 text-[11px] font-black text-white uppercase italic border-b border-white/10 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                SUBTIPOS
                {selectedFilters.subtipo?.length > 0 && <span className="bg-[#0066ff] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedFilters.subtipo.length}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#1a233a] p-0">
              <div className="p-3">
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <Input
                    placeholder="Buscar Subtipo"
                    value={subtipoSearch}
                    onChange={(e) => setSubtipoSearch(e.target.value)}
                    className="pl-7 h-8 bg-[#0b1226] border-white/10 text-white text-xs placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredSubtipos.map((st) => (
                    <div key={st.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`subtipo-${st.id}`} 
                        checked={isChecked('subtipo', st.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('subtipo', st.id, checked as boolean)}
                        className="w-4 h-4 border-white/30 data-[state=checked]:bg-[#00d1b2] rounded-full"
                      />
                      <Label htmlFor={`subtipo-${st.id}`} className="text-xs font-bold text-gray-400 group-hover:text-white cursor-pointer uppercase">
                        {st.nombre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* ATRIBUTOS Section */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="atributos" className="border-none">
            <AccordionTrigger className="bg-[#0b1226] hover:no-underline px-4 py-3 text-[11px] font-black text-white uppercase italic border-b border-white/10 [&[data-state=open]>svg]:rotate-180">
              ATRIBUTOS
            </AccordionTrigger>
            <AccordionContent className="bg-[#1a233a] p-0">
              <div className="p-0">
                {Object.entries(allAttributes).map(([key, attr]) => (
                  <Accordion key={key} type="single" collapsible className="w-full border-b border-white/5">
                    <AccordionItem value={key} className="border-none">
                      <AccordionTrigger className="px-6 py-2 text-[10px] font-bold text-gray-300 uppercase hover:no-underline">
                        <div className="flex items-center gap-2">
                          {attr.label}
                          {selectedFilters[`attr_${key}`]?.length > 0 && <span className="bg-[#f97316] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedFilters[`attr_${key}`].length}</span>}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-8 pb-4 space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
                        {attr.values.map((val: any) => (
                          <div key={String(val)} className="flex items-center space-x-3 group">
                            <Checkbox 
                              id={`attr-${key}-${val}`} 
                              checked={isAttributeSelected(key, String(val))}
                              onCheckedChange={() => handleAttributeChange(key, String(val))}
                              className="w-3.5 h-3.5 border-white/20 data-[state=checked]:bg-[#f97316] rounded-full"
                            />
                            <Label htmlFor={`attr-${key}-${val}`} className="text-[10px] font-bold text-gray-500 group-hover:text-white cursor-pointer uppercase">
                              {val}
                            </Label>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
