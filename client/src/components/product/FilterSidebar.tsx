import { FILTERS } from "@/lib/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

  const renderChips = (category: string, items: string[]) => (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <div 
          key={item}
          onClick={() => handleCheckboxChange(category, item, !isChecked(category, item))}
          className={`
            cursor-pointer px-[10px] py-[6px] rounded-full text-[0.75rem] font-medium border transition-all
            ${isChecked(category, item) 
              ? 'bg-brand-blue-500 text-white border-transparent' 
              : 'bg-brand-fg text-gray-200 border-[#334155] hover:border-brand-blue-500'}
          `}
        >
          {item}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-brand-fg h-full text-gray-200 overflow-y-auto p-4 border-r border-[#111827]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-200 text-sm uppercase tracking-wider">Filtros</h2>
        <Button 
          variant="link" 
          className="text-xs text-brand-blue-500 p-0 h-auto hover:text-brand-blue-400"
          onClick={() => onFilterChange({})}
        >
          Limpiar
        </Button>
      </div>
      
      <div className="space-y-3">
        {/* Brand Filter */}
        <div className="bg-[#0b1226] border border-[#1f2937] rounded-xl p-3">
            <div className="font-bold text-sm text-gray-300 mb-2 flex justify-between items-center cursor-pointer">
              Marca
            </div>
            {renderChips('brand', FILTERS.brands)}
        </div>

        {/* Rim Filter */}
        <div className="bg-[#0b1226] border border-[#1f2937] rounded-xl p-3">
            <div className="font-bold text-sm text-gray-300 mb-2">Rodado</div>
            {renderChips('rim', FILTERS.rims)}
        </div>

        {/* Width Filter */}
        <div className="bg-[#0b1226] border border-[#1f2937] rounded-xl p-3">
            <div className="font-bold text-sm text-gray-300 mb-2">Ancho</div>
            <div className="flex flex-wrap gap-2 mt-2 max-h-48 overflow-y-auto custom-scrollbar">
              {FILTERS.widths.map((width) => (
                <div 
                  key={width}
                  onClick={() => handleCheckboxChange('width', width, !isChecked('width', width))}
                  className={`
                    cursor-pointer px-[10px] py-[6px] rounded-full text-[0.75rem] font-medium border transition-all
                    ${isChecked('width', width) 
                      ? 'bg-brand-blue-500 text-white border-transparent' 
                      : 'bg-brand-fg text-gray-200 border-[#334155] hover:border-brand-blue-500'}
                  `}
                >
                  {width}
                </div>
              ))}
            </div>
        </div>

        {/* Ratio Filter */}
        <div className="bg-[#0b1226] border border-[#1f2937] rounded-xl p-3">
            <div className="font-bold text-sm text-gray-300 mb-2">Perfil / Relación</div>
            {renderChips('ratio', FILTERS.ratios)}
        </div>
        
        {/* Terrain Filter */}
        <div className="bg-[#0b1226] border border-[#1f2937] rounded-xl p-3">
            <div className="font-bold text-sm text-gray-300 mb-2">Terreno</div>
            {renderChips('terrainType', FILTERS.terrainTypes)}
        </div>

        {/* Position Filter */}
        <div className="bg-[#0b1226] border border-[#1f2937] rounded-xl p-3">
            <div className="font-bold text-sm text-gray-300 mb-2">Posición</div>
            {renderChips('position', FILTERS.positions)}
        </div>

      </div>
    </div>
  );
}
