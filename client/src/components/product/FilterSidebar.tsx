import { FILTERS, getUniqueValues } from "@/lib/mockData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  selectedFilters: any;
  onFilterChange: (filters: any) => void;
}

export function FilterSidebar({ selectedFilters, onFilterChange }: FilterSidebarProps) {
  
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
      <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
        <h2 className="font-bold text-brand-dark">Filtros</h2>
        <Button 
          variant="link" 
          className="text-xs text-brand-blue p-0 h-auto"
          onClick={() => onFilterChange({})}
        >
          Limpiar todo
        </Button>
      </div>
      
      <div className="p-4">
        <Accordion type="multiple" defaultValue={['brands', 'rims', 'widths']} className="w-full space-y-2">
          
          {/* Brand Filter */}
          <AccordionItem value="brands" className="border-none">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Marca
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {FILTERS.brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={isChecked('brand', brand)}
                      onCheckedChange={(c) => handleCheckboxChange('brand', brand, c as boolean)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm text-gray-600 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Rim Filter */}
          <AccordionItem value="rims" className="border-t border-gray-100">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Rodado
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 mt-2">
                {FILTERS.rims.map((rim) => (
                  <div 
                    key={rim}
                    onClick={() => handleCheckboxChange('rim', rim, !isChecked('rim', rim))}
                    className={`
                      cursor-pointer px-3 py-1 rounded-full text-xs font-medium border transition-all
                      ${isChecked('rim', rim) 
                        ? 'bg-brand-blue text-white border-brand-blue shadow-sm' 
                        : 'bg-white text-gray-600 border-gray-200 hover:border-brand-blue hover:text-brand-blue'}
                    `}
                  >
                    {rim}"
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Width Filter */}
          <AccordionItem value="widths" className="border-t border-gray-100">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Ancho
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {FILTERS.widths.map((width) => (
                  <div key={width} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`width-${width}`} 
                      checked={isChecked('width', width)}
                      onCheckedChange={(c) => handleCheckboxChange('width', width, c as boolean)}
                    />
                    <Label htmlFor={`width-${width}`} className="text-sm text-gray-600 cursor-pointer">
                      {width}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Ratio Filter */}
          <AccordionItem value="ratios" className="border-t border-gray-100">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Perfil / Relación
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {FILTERS.ratios.map((ratio) => (
                  <div key={ratio} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`ratio-${ratio}`} 
                      checked={isChecked('ratio', ratio)}
                      onCheckedChange={(c) => handleCheckboxChange('ratio', ratio, c as boolean)}
                    />
                    <Label htmlFor={`ratio-${ratio}`} className="text-sm text-gray-600 cursor-pointer">
                      {ratio}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Terrain Filter */}
          <AccordionItem value="terrainTypes" className="border-t border-gray-100">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Tipo de Terreno
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {FILTERS.terrainTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`terrain-${type}`} 
                      checked={isChecked('terrainType', type)}
                      onCheckedChange={(c) => handleCheckboxChange('terrainType', type, c as boolean)}
                    />
                    <Label htmlFor={`terrain-${type}`} className="text-sm text-gray-600 cursor-pointer">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Usage Filter */}
          <AccordionItem value="usages" className="border-t border-gray-100">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Uso
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {FILTERS.usages.map((usage) => (
                  <div key={usage} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`usage-${usage}`} 
                      checked={isChecked('usage', usage)}
                      onCheckedChange={(c) => handleCheckboxChange('usage', usage, c as boolean)}
                    />
                    <Label htmlFor={`usage-${usage}`} className="text-sm text-gray-600 cursor-pointer">
                      {usage}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Position Filter */}
          <AccordionItem value="positions" className="border-t border-gray-100">
            <AccordionTrigger className="py-2 hover:no-underline text-sm font-bold text-gray-700 hover:text-brand-blue">
              Posición
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 mt-2">
                {FILTERS.positions.map((position) => (
                  <div key={position} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`position-${position}`} 
                      checked={isChecked('position', position)}
                      onCheckedChange={(c) => handleCheckboxChange('position', position, c as boolean)}
                    />
                    <Label htmlFor={`position-${position}`} className="text-sm text-gray-600 cursor-pointer">
                      {position}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </div>
    </div>
  );
}
