import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
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
    
    // For brands, also update 'brand' key to ensure compatibility
    let newFilters = { ...selectedFilters, [category]: updated };
    if (category === 'marca') {
      newFilters.brand = updated;
    }
    
    onFilterChange(newFilters);
  };

  const isChecked = (category: string, value: string) => {
    return (selectedFilters[category] || []).includes(value);
  };

  const selectedCategories = selectedFilters.categoria || [];
  const selectedMarcas = selectedFilters.marca || [];
  const selectedSubtipos = selectedFilters.subtipo || [];

  // Show attributes only if brand, type or subtype is selected
  const showAttributes = selectedMarcas.length > 0 || selectedCategories.length > 0 || selectedSubtipos.length > 0;
  
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
    const search = subtipoSearch.toLowerCase();
    return availableSubtipos.filter(st => 
      st.nombre.toLowerCase().includes(search)
    );
  }, [subtipoSearch, availableSubtipos]);

  const filteredMarcas = useMemo(() => {
    const search = marcaSearch.toLowerCase();
    return availableMarcas.filter(m => 
      m.nombre.toLowerCase().includes(search)
    );
  }, [marcaSearch, availableMarcas]);

  // Aggregate values from PRODUCTS to show real data in attributes
  const allAttributes = useMemo(() => {
    const attrs: Record<string, { label: string, values: any[] }> = {
      ancho: { label: "Ancho", values: [] },
      relacion: { label: "Relación", values: [] },
      rodado: { label: "Rodado", values: [] }
    };

    // Filter products based on active brand/category/subtype filters before extracting attributes
    const filteredForAttrs = PRODUCTS.filter(p => {
      const brandMatch = selectedMarcas.length === 0 || 
        selectedMarcas.some((sm: string) => sm.toUpperCase() === (p.brand || "").toUpperCase());
      
      const categoryMatch = selectedCategories.length === 0 || 
        selectedCategories.some((sc: string) => {
          const normSc = sc.toLowerCase();
          const pType = (p.type || "").toLowerCase();
          const pTitle = (p.title || "").toLowerCase();
          return pType.includes(normSc) || normSc.includes(pType) || pTitle.includes(normSc) ||
                 (normSc === "cubiertas" && (pType.includes("calle") || pType.includes("off-road") || pTitle.includes("cubierta")));
        });
        
      const subtypeMatch = selectedSubtipos.length === 0 || 
        selectedSubtipos.some((ss: string) => {
          const normSs = ss.toLowerCase();
          const pSub = (p.subtype || "").toLowerCase();
          const pTitle = (p.title || "").toLowerCase();
          return pSub.includes(normSs) || normSs.includes(pSub) || pTitle.includes(normSs);
        });
        
      return brandMatch && categoryMatch && subtypeMatch;
    });

    // Extract unique values from filtered products
    const uniqueWidths = new Set<string>();
    const uniqueRatios = new Set<string>();
    const uniqueRims = new Set<string>();

    filteredForAttrs.forEach(p => {
      if (p.width !== undefined && p.width !== 0 && p.width !== "") uniqueWidths.add(p.width.toString());
      if (p.ratio !== undefined && p.ratio !== 0 && p.ratio !== "") uniqueRatios.add(p.ratio.toString());
      if (p.rim !== undefined && p.rim !== 0 && p.rim !== "") uniqueRims.add(p.rim.toString());
    });

    attrs.ancho.values = Array.from(uniqueWidths).sort((a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      return (!isNaN(numA) && !isNaN(numB)) ? numA - numB : a.localeCompare(b);
    });
    attrs.relacion.values = Array.from(uniqueRatios).sort((a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      return (!isNaN(numA) && !isNaN(numB)) ? numA - numB : a.localeCompare(b);
    });
    attrs.rodado.values = Array.from(uniqueRims).sort((a, b) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      return (!isNaN(numA) && !isNaN(numB)) ? numA - numB : a.localeCompare(b);
    });

    return attrs;
  }, [selectedMarcas, selectedCategories, selectedSubtipos]);

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
    <div className="flex flex-col gap-0 select-none bg-[#001536] min-h-full">
      <div className="flex justify-between items-center bg-[#001536] p-4 border-b border-white/5">
        <h2 className="font-black text-white text-base uppercase tracking-tight">Filtros</h2>
        <button 
          className="text-[10px] font-bold text-[#006ad8] uppercase hover:underline"
          onClick={() => onFilterChange({})}
        >
          Limpiar
        </button>
      </div>
      
      <div className="space-y-0">
        {/* ESTADO Section - Default Open */}
        <Accordion type="multiple" defaultValue={["estado", "marcas", "tipos", "subtipos"]} className="w-full">
          <AccordionItem value="estado" className="border-none">
            <AccordionTrigger className="bg-[#001536] hover:no-underline px-4 py-4 text-[11px] font-black text-[#006ad8] uppercase border-b border-white/5 [&[data-state=open]>svg]:rotate-180">
              ESTADO
            </AccordionTrigger>
            <AccordionContent className="bg-[#001f3f] p-4 pb-6 space-y-4">
              {[
                { id: 'isHot', label: 'Ofertas' },
                { id: 'isNew', label: 'Novedades' },
                { id: 'disp', label: 'Disponible' },
                { id: 'var', label: 'Variación de precio' }
              ].map((item) => (
                <div key={item.id} className="flex items-center space-x-3 group cursor-pointer">
                  <Checkbox 
                    id={`state-${item.id}`} 
                    checked={isChecked('state', item.id)}
                    onCheckedChange={(checked) => handleCheckboxChange('state', item.id, checked as boolean)}
                    className="w-5 h-5 border-white/20 data-[state=checked]:bg-[#006ad8] data-[state=checked]:border-[#006ad8] rounded-full"
                  />
                  <Label htmlFor={`state-${item.id}`} className="text-xs font-bold text-gray-300 group-hover:text-white cursor-pointer uppercase tracking-wider">
                    {item.label}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="marcas" className="border-none">
            <AccordionTrigger className="bg-[#001536] hover:no-underline px-4 py-4 text-[11px] font-black text-[#006ad8] uppercase border-b border-white/5 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                MARCAS
                {selectedMarcas.length > 0 && <span className="bg-[#006ad8] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedMarcas.length}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#001f3f] p-0">
              <div className="p-4">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <Input
                    placeholder="Buscar Marcas"
                    value={marcaSearch}
                    onChange={(e) => setMarcaSearch(e.target.value)}
                    className="pl-9 h-9 bg-[#001536] border-white/10 text-white text-xs placeholder:text-gray-600 rounded-sm"
                  />
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredMarcas.map((marca) => (
                    <div key={marca.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`marca-${marca.id}`} 
                        checked={isChecked('marca', marca.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('marca', marca.id, checked as boolean)}
                        className="w-5 h-5 border-white/20 data-[state=checked]:bg-[#006ad8] rounded-full"
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

          <AccordionItem value="tipos" className="border-none">
            <AccordionTrigger className="bg-[#001536] hover:no-underline px-4 py-4 text-[11px] font-black text-[#006ad8] uppercase border-b border-white/5 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                TIPOS DE PRODUCTO
                {selectedCategories.length > 0 && <span className="bg-[#006ad8] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedCategories.length}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#001f3f] p-0">
              <div className="p-4">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <Input
                    placeholder="Buscar Tipo Producto"
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="pl-9 h-9 bg-[#001536] border-white/10 text-white text-xs placeholder:text-gray-600 rounded-sm"
                  />
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredCategories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`cat-${cat.id}`} 
                        checked={isChecked('categoria', cat.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('categoria', cat.id, checked as boolean)}
                        className="w-5 h-5 border-white/20 data-[state=checked]:bg-[#006ad8] rounded-full"
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

          <AccordionItem value="subtipos" className="border-none">
            <AccordionTrigger className="bg-[#001536] hover:no-underline px-4 py-4 text-[11px] font-black text-[#006ad8] uppercase border-b border-white/5 [&[data-state=open]>svg]:rotate-180">
              <div className="flex items-center gap-2">
                SUBTIPOS
                {selectedSubtipos.length > 0 && <span className="bg-[#006ad8] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedSubtipos.length}</span>}
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-[#001f3f] p-0">
              <div className="p-4">
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                  <Input
                    placeholder="Buscar Subtipo"
                    value={subtipoSearch}
                    onChange={(e) => setSubtipoSearch(e.target.value)}
                    className="pl-9 h-9 bg-[#001536] border-white/10 text-white text-xs placeholder:text-gray-600 rounded-sm"
                  />
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredSubtipos.map((st) => (
                    <div key={st.id} className="flex items-center space-x-3 group">
                      <Checkbox 
                        id={`subtipo-${st.id}`} 
                        checked={isChecked('subtipo', st.id)}
                        onCheckedChange={(checked) => handleCheckboxChange('subtipo', st.id, checked as boolean)}
                        className="w-5 h-5 border-white/20 data-[state=checked]:bg-[#006ad8] rounded-full"
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

          {/* Conditional Attributes Section */}
          {showAttributes && (
            <AccordionItem value="atributos" className="border-none">
              <AccordionTrigger className="bg-[#001536] hover:no-underline px-4 py-4 text-[11px] font-black text-[#006ad8] uppercase border-b border-white/5 [&[data-state=open]>svg]:rotate-180">
                ATRIBUTOS
              </AccordionTrigger>
              <AccordionContent className="bg-[#001f3f] p-0">
                <div className="p-0">
                  {Object.entries(allAttributes).map(([key, attr]) => (
                    <Accordion key={key} type="single" collapsible className="w-full border-b border-white/5">
                      <AccordionItem value={key} className="border-none">
                        <AccordionTrigger className="px-6 py-3 text-[10px] font-bold text-gray-300 uppercase hover:no-underline">
                          <div className="flex items-center gap-2">
                            {attr.label}
                            {selectedFilters[`attr_${key}`]?.length > 0 && <span className="bg-[#006ad8] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">{selectedFilters[`attr_${key}`].length}</span>}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-8 pb-4 space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar">
                          {attr.values.map((val: any) => (
                            <div key={String(val)} className="flex items-center space-x-3 group">
                              <Checkbox 
                                id={`attr-${key}-${val}`} 
                                checked={isAttributeSelected(key, String(val))}
                                onCheckedChange={() => handleAttributeChange(key, String(val))}
                                className="w-4 h-4 border-white/20 data-[state=checked]:bg-[#006ad8] rounded-full"
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
          )}
        </Accordion>
      </div>
    </div>
  );
}
