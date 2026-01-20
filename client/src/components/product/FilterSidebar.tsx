import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Product } from "@/lib/products";

interface FilterSidebarProps {
  selectedFilters: any;
  onFilterChange: (filters: any) => void;
  products?: Product[];
}

export function FilterSidebar({ selectedFilters, onFilterChange, products = [] }: FilterSidebarProps) {
  const [brandSearch, setBrandSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [subtypeSearch, setSubtypeSearch] = useState("");
  
  // Extract unique values from products
  const uniqueBrands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand))).sort();
  }, [products]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(products.map(p => p.type).filter(Boolean))).sort() as string[];
  }, [products]);

  const uniqueSubtypes = useMemo(() => {
    return Array.from(new Set(products.map(p => p.subtype).filter(Boolean))).sort() as string[];
  }, [products]);

  const uniqueWidths = useMemo(() => {
    return Array.from(new Set(products.map(p => p.width).filter(w => w && w !== 0))).sort((a, b) => Number(a) - Number(b));
  }, [products]);

  const uniqueRatios = useMemo(() => {
    return Array.from(new Set(products.map(p => p.ratio).filter(r => r && r !== 0))).sort((a, b) => Number(a) - Number(b));
  }, [products]);

  const uniqueRims = useMemo(() => {
    return Array.from(new Set(products.map(p => p.rim).filter(r => r && r !== 0))).sort((a, b) => Number(a) - Number(b));
  }, [products]);

  const handleCheckboxChange = (category: string, value: string, checked: boolean) => {
    const current = selectedFilters[category] || [];
    const updated = checked 
      ? [...current, value]
      : current.filter((item: string) => item !== value);
    
    onFilterChange({ ...selectedFilters, [category]: updated });
  };

  const isChecked = (category: string, value: string) => {
    return (selectedFilters[category] || []).includes(value);
  };

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return uniqueBrands;
    const search = brandSearch.toLowerCase();
    return uniqueBrands.filter(b => b.toLowerCase().includes(search));
  }, [brandSearch, uniqueBrands]);

  const filteredTypes = useMemo(() => {
    if (!typeSearch.trim()) return uniqueTypes;
    const search = typeSearch.toLowerCase();
    return uniqueTypes.filter(t => t.toLowerCase().includes(search));
  }, [typeSearch, uniqueTypes]);

  const filteredSubtypes = useMemo(() => {
    if (!subtypeSearch.trim()) return uniqueSubtypes;
    const search = subtypeSearch.toLowerCase();
    return uniqueSubtypes.filter(st => st.toLowerCase().includes(search));
  }, [subtypeSearch, uniqueSubtypes]);

  const getFilterCount = (category: string) => {
    return (selectedFilters[category] || []).length;
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
            setBrandSearch("");
            setTypeSearch("");
            setSubtypeSearch("");
          }}
          data-testid="button-clear-filters"
        >
          Limpiar
        </Button>
      </div>
      
      <div className="space-y-4">
        
        {/* Estado */}
        <section>
          <h3 className="font-bold text-sm text-brand-blue-500 mb-3 uppercase tracking-wide">Estado</h3>
          <div className="space-y-2">
            {[
              { id: 'isHot', label: 'Ofertas' },
              { id: 'isNew', label: 'Novedades' },
              { id: 'inStock', label: 'En Stock' },
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
          <Accordion type="multiple" className="w-full" defaultValue={["brand", "type"]}>
            
            {/* Marcas */}
            <AccordionItem value="brand" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                MARCAS
                {getFilterCount('brand') > 0 && (
                  <span className="ml-2 bg-brand-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {getFilterCount('brand')}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar marca..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="pl-8 h-8 bg-[#0b1226] border-gray-700 text-white text-sm placeholder:text-[#9CA3AF]"
                    data-testid="input-brand-search"
                  />
                </div>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredBrands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2 py-0.5">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={isChecked('brand', brand)}
                        onCheckedChange={(checked) => handleCheckboxChange('brand', brand, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                        data-testid={`checkbox-brand-${brand}`}
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors leading-tight">
                        {brand}
                      </Label>
                    </div>
                  ))}
                  {filteredBrands.length === 0 && (
                    <p className="text-xs text-gray-500 py-2">No se encontraron marcas</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tipo */}
            <AccordionItem value="type" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                TIPO
                {getFilterCount('type') > 0 && (
                  <span className="ml-2 bg-brand-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {getFilterCount('type')}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar tipo..."
                    value={typeSearch}
                    onChange={(e) => setTypeSearch(e.target.value)}
                    className="pl-8 h-8 bg-[#0b1226] border-gray-700 text-white text-sm placeholder:text-[#9CA3AF]"
                    data-testid="input-type-search"
                  />
                </div>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2 py-0.5">
                      <Checkbox 
                        id={`type-${type}`} 
                        checked={isChecked('type', type)}
                        onCheckedChange={(checked) => handleCheckboxChange('type', type, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                        data-testid={`checkbox-type-${type}`}
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors leading-tight">
                        {type}
                      </Label>
                    </div>
                  ))}
                  {filteredTypes.length === 0 && (
                    <p className="text-xs text-gray-500 py-2">No se encontraron tipos</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Subtipo */}
            <AccordionItem value="subtype" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                SUBTIPO
                {getFilterCount('subtype') > 0 && (
                  <span className="ml-2 bg-brand-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {getFilterCount('subtype')}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="relative mb-3">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Buscar subtipo..."
                    value={subtypeSearch}
                    onChange={(e) => setSubtypeSearch(e.target.value)}
                    className="pl-8 h-8 bg-[#0b1226] border-gray-700 text-white text-sm placeholder:text-[#9CA3AF]"
                    data-testid="input-subtype-search"
                  />
                </div>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredSubtypes.map((subtype) => (
                    <div key={subtype} className="flex items-center space-x-2 py-0.5">
                      <Checkbox 
                        id={`subtype-${subtype}`} 
                        checked={isChecked('subtype', subtype)}
                        onCheckedChange={(checked) => handleCheckboxChange('subtype', subtype, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                        data-testid={`checkbox-subtype-${subtype}`}
                      />
                      <Label htmlFor={`subtype-${subtype}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors leading-tight">
                        {subtype}
                      </Label>
                    </div>
                  ))}
                  {filteredSubtypes.length === 0 && (
                    <p className="text-xs text-gray-500 py-2">No se encontraron subtipos</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <div className="h-px bg-gray-800 w-full my-2" />
            <div className="py-2">
              <h3 className="font-bold text-sm text-orange-500 mb-2 uppercase tracking-wide">
                Medidas de Cubiertas
              </h3>
            </div>

            {/* Ancho */}
            <AccordionItem value="width" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 font-semibold">
                Ancho
                {getFilterCount('width') > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {getFilterCount('width')}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                  {uniqueWidths.map((width) => (
                    <button
                      key={String(width)}
                      onClick={() => handleCheckboxChange('width', String(width), !isChecked('width', String(width)))}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        isChecked('width', String(width))
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-transparent border-gray-600 text-gray-400 hover:border-orange-500 hover:text-orange-500'
                      }`}
                      data-testid={`button-width-${width}`}
                    >
                      {width}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Relación */}
            <AccordionItem value="ratio" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 font-semibold">
                Relación
                {getFilterCount('ratio') > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {getFilterCount('ratio')}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                  {uniqueRatios.map((ratio) => (
                    <button
                      key={String(ratio)}
                      onClick={() => handleCheckboxChange('ratio', String(ratio), !isChecked('ratio', String(ratio)))}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        isChecked('ratio', String(ratio))
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-transparent border-gray-600 text-gray-400 hover:border-orange-500 hover:text-orange-500'
                      }`}
                      data-testid={`button-ratio-${ratio}`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Rodado */}
            <AccordionItem value="rim" className="border-b border-gray-800">
              <AccordionTrigger className="py-3 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 font-semibold">
                Rodado
                {getFilterCount('rim') > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {getFilterCount('rim')}
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                  {uniqueRims.map((rim) => (
                    <button
                      key={String(rim)}
                      onClick={() => handleCheckboxChange('rim', String(rim), !isChecked('rim', String(rim)))}
                      className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                        isChecked('rim', String(rim))
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-transparent border-gray-600 text-gray-400 hover:border-orange-500 hover:text-orange-500'
                      }`}
                      data-testid={`button-rim-${rim}`}
                    >
                      {rim}"
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

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
