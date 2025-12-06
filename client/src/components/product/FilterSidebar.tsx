import { FILTERS } from "@/lib/products";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

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

  // Mock data for "Tu Moto"
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
          }}
        >
          Limpiar
        </Button>
      </div>
      
      <div className="space-y-6">
        
        {/* 1. ESTADO */}
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
                />
                <Label htmlFor={`state-${item.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-300">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </section>

        <div className="h-px bg-gray-800 w-full" />

        {/* 2. TU MOTO */}
        <section>
          <h3 className="font-bold text-sm text-brand-blue-500 mb-3 uppercase tracking-wide">Tu Moto</h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs text-gray-400">Selecciona Marca</Label>
              <Select value={selectedMotoBrand} onValueChange={setSelectedMotoBrand}>
                <SelectTrigger className="w-full bg-[#0b1226] border-gray-700 text-white h-9">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent className="bg-[#0b1226] border-gray-700 text-white">
                  {MOTO_BRANDS.map(brand => (
                    <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-gray-400">Selecciona Modelo</Label>
              <Select disabled={!selectedMotoBrand}>
                <SelectTrigger className="w-full bg-[#0b1226] border-gray-700 text-white h-9 disabled:opacity-50">
                  <SelectValue placeholder="Modelo" />
                </SelectTrigger>
                <SelectContent className="bg-[#0b1226] border-gray-700 text-white">
                  {selectedMotoBrand && MOTO_MODELS[selectedMotoBrand]?.map(model => (
                    <SelectItem key={model} value={model}>{model}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <div className="h-px bg-gray-800 w-full" />

        {/* 3. CATEGORIAS (TIPO -> SUBTIPO -> MARCA) */}
        <section>
           {/* TIPO */}
          <Accordion type="single" collapsible className="w-full" defaultValue="tipo">
            <AccordionItem value="tipo" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                TIPO
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pl-1">
                  {FILTERS.types.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type}`} 
                        checked={isChecked('type', type)}
                        onCheckedChange={(checked) => handleCheckboxChange('type', type, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                      />
                      <Label htmlFor={`type-${type}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* SUBTIPO */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="subtipo" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                SUBTIPO
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pl-1">
                  {FILTERS.subtypes.map((st) => (
                    <div key={st} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`subtype-${st}`} 
                        checked={isChecked('subtype', st)}
                        onCheckedChange={(checked) => handleCheckboxChange('subtype', st, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                      />
                      <Label htmlFor={`subtype-${st}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                        {st}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* MARCA */}
          <Accordion type="single" collapsible className="w-full" defaultValue="marca">
            <AccordionItem value="marca" className="border-b-0">
              <AccordionTrigger className="py-2 text-sm hover:no-underline hover:text-brand-blue-500 text-gray-300 uppercase font-bold">
                MARCA
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-1 pl-1">
                  {FILTERS.brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`brand-${brand}`} 
                        checked={isChecked('brand', brand)}
                        onCheckedChange={(checked) => handleCheckboxChange('brand', brand, checked as boolean)}
                        className="h-4 w-4 border-gray-600 data-[state=checked]:bg-brand-blue-600"
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

      </div>
    </div>
  );
}
