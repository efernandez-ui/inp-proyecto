import { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLocation } from "wouter";

export function TireFinder() {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState({
    width: "",
    ratio: "",
    rim: "",
    load: "",
    speed: ""
  });

  // Extract all unique values from products
  const options = useMemo(() => {
    const widths = new Set<string>();
    const ratios = new Set<string>();
    const rims = new Set<string>();
    const loads = new Set<string>();
    const speeds = new Set<string>();

    PRODUCTS.forEach(p => {
      // Basic dimensions
      if (p.width) widths.add(p.width.toString());
      if (p.ratio) ratios.add(p.ratio.toString());
      if (p.rim) rims.add(p.rim.toString());

      // Extract Load and Speed from Title
      // Common patterns: "52H", "58W", "(58W)", "62M"
      // Regex: look for 2-3 digits followed by 1-2 letters, possibly wrapped in parens
      const loadSpeedMatch = p.title.match(/[\s(](\d{2,3})([A-Z]+)[)\s]/);
      if (loadSpeedMatch) {
        loads.add(loadSpeedMatch[1]);
        speeds.add(loadSpeedMatch[2]);
      }
    });

    return {
      widths: Array.from(widths).sort((a, b) => parseFloat(a) - parseFloat(b)),
      ratios: Array.from(ratios).sort((a, b) => parseFloat(a) - parseFloat(b)),
      rims: Array.from(rims).sort((a, b) => parseFloat(a) - parseFloat(b)),
      loads: Array.from(loads).sort((a, b) => parseInt(a) - parseInt(b)),
      speeds: Array.from(speeds).sort()
    };
  }, []);

  const handleSearch = () => {
    // Navigate to catalog with query params (mock implementation)
    // In a real app, we'd construct the URL query string
    console.log("Searching with:", filters);
    setLocation('/catalogo');
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row">
          
          {/* Left: Visual Guide */}
          <div className="w-full md:w-1/3 bg-gray-100 relative overflow-hidden flex items-center justify-center p-6 border-r border-gray-200">
            <div className="relative z-10 text-center">
              <div className="text-[4rem] font-bold text-gray-300 leading-none select-none absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap opacity-50">
                180/55-17
              </div>
              <div className="relative">
                 {/* CSS Tire Representation */}
                 <div className="w-48 h-48 rounded-full border-[16px] border-gray-800 border-dashed mx-auto relative flex items-center justify-center shadow-xl">
                    <div className="w-32 h-32 rounded-full border-[2px] border-gray-400"></div>
                    {/* Indicators */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 flex flex-col items-center">
                       <span className="h-6 w-px bg-yellow-500"></span>
                       <span className="text-[10px] font-bold text-yellow-600 uppercase bg-yellow-100 px-1 rounded">Ancho</span>
                    </div>
                    <div className="absolute right-0 top-1/2 translate-x-6 -translate-y-1/2 flex flex-col items-center">
                       <span className="w-6 h-px bg-yellow-500"></span>
                       <span className="text-[10px] font-bold text-yellow-600 uppercase bg-yellow-100 px-1 rounded">Rodado</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Right: Search Form */}
          <div className="w-full md:w-2/3 bg-gray-200 p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-display italic text-brand-blue-900 mb-6 flex items-center gap-2">
              Encontrá el neumático para tu moto
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {/* Width */}
              <div className="space-y-1">
                <Select onValueChange={(v) => setFilters({...filters, width: v})}>
                  <SelectTrigger className="bg-white border-none h-10 text-gray-600">
                    <SelectValue placeholder="Ancho" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.widths.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Ratio */}
              <div className="space-y-1">
                <Select onValueChange={(v) => setFilters({...filters, ratio: v})}>
                  <SelectTrigger className="bg-white border-none h-10 text-gray-600">
                    <SelectValue placeholder="Altura" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.ratios.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Rim */}
              <div className="space-y-1">
                <Select onValueChange={(v) => setFilters({...filters, rim: v})}>
                  <SelectTrigger className="bg-white border-none h-10 text-gray-600">
                    <SelectValue placeholder="Diámetro" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.rims.map(r => <SelectItem key={r} value={r}>{r}"</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Load */}
              <div className="space-y-1">
                <Select onValueChange={(v) => setFilters({...filters, load: v})}>
                  <SelectTrigger className="bg-white border-none h-10 text-gray-600">
                    <SelectValue placeholder="Carga" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.loads.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Speed */}
              <div className="space-y-1">
                <Select onValueChange={(v) => setFilters({...filters, speed: v})}>
                  <SelectTrigger className="bg-white border-none h-10 text-gray-600">
                    <SelectValue placeholder="Velocidad" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.speeds.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end mt-4">
               <Button 
                 onClick={handleSearch}
                 className="bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold px-8 rounded h-10 uppercase tracking-wide"
               >
                 BUSCAR
               </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
