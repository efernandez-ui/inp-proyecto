import { Product } from "@/lib/mockData";
import { Heart, ShoppingCart, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { id, title, price, originalPrice, image, brand, stock, isNew, isHot, code } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Simulated Stock Levels for different regions based on the single stock value
  // In a real app, this would come from the product data
  const getRegionStock = (region: string, baseStock: string) => {
    // Deterministic random based on product ID and region to keep it consistent on renders
    const hash = (id + region).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = hash % 10;
    
    if (baseStock === 'none') return 'none';
    if (baseStock === 'low') return rand > 5 ? 'none' : 'low';
    if (baseStock === 'high') return rand > 2 ? 'high' : 'mid';
    return rand > 5 ? 'mid' : 'low';
  };

  const regions = ['BUE', 'CUYO', 'NEA', 'NOA'];

  const StockDots = () => (
    <div className="grid grid-cols-4 gap-1.5 mt-auto pt-2 pb-2.5 px-2.5">
      {regions.map(region => {
        const level = getRegionStock(region, stock);
        let colorClass = '';
        let icon = null;
        
        switch(level) {
          case 'high': 
            colorClass = 'bg-stock-high border-stock-high text-white';
            icon = '✓';
            break;
          case 'mid': 
            colorClass = 'bg-stock-mid border-stock-mid text-brand-blue-900';
            icon = '✓'; // Or maybe no icon for mid? CSS implies dots have checkmarks for low/high/bue
            break;
          case 'low': 
            colorClass = 'bg-stock-low border-stock-low text-white';
            icon = '✓';
            break;
          case 'none': 
            colorClass = 'bg-stock-none border-stock-none text-white';
            icon = '×';
            break;
          default:
             colorClass = 'bg-gray-200 border-gray-200 text-gray-400';
        }

        return (
          <div key={region} className="text-center flex flex-col items-center gap-1">
             <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-black ${colorClass}`}>
               {icon}
             </div>
             <span className="text-[0.65rem] font-bold text-gray-500">{region}</span>
          </div>
        );
      })}
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-[#eaeef3] rounded-xl overflow-hidden shadow-sm hover:translate-x-1 transition-transform duration-200 flex">
        <div className="w-[120px] h-[120px] shrink-0 p-2 flex items-center justify-center bg-white">
           <img src={image} alt={title} className="max-w-[90%] max-h-full object-contain" />
        </div>
        
        <div className="flex-1 min-w-0 p-4 flex flex-col justify-between">
          <div>
            <div className="text-[0.7rem] text-gray-600 uppercase tracking-wider font-bold mb-1">{brand}</div>
            <h3 className="font-semibold text-[0.85rem] leading-tight text-brand-fg mb-1 truncate">{title}</h3>
            <div className="text-xs text-brand-muted truncate">Código: {code}</div>
            
            <div className="flex items-center gap-2 mt-2">
               <div className="text-xl font-extrabold text-brand-blue-700">
                 ${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
               </div>
               {discount > 0 && <span className="text-xs bg-brand-blue-600 text-white px-2 py-0.5 rounded-full">{discount}%</span>}
            </div>
             {originalPrice && (
                <span className="text-xs text-gray-400 line-through">${originalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
              )}
          </div>
        </div>

        <div className="flex flex-col justify-between p-4 border-l border-gray-100 min-w-[140px]">
           <StockDots />
           <Button className="w-full bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold text-xs h-9 rounded-lg mt-2">
             AGREGAR
           </Button>
        </div>
      </div>
    );
  }

  // Grid View - Matching the HTML "card" style
  return (
    <div className="relative bg-white border border-[#eaeef3] rounded-xl overflow-hidden shadow-sm flex flex-col h-[380px] hover:shadow-md transition-shadow">
      <button className="absolute top-2 right-2 z-10 text-gray-400 hover:text-brand-blue-700">
         <Heart className="w-5 h-5" />
      </button>

      <div className="aspect-[4/3] bg-white p-2 flex items-center justify-center">
        <img 
          src={image} 
          alt={title} 
          className="max-w-[90%] max-h-full object-contain" 
        />
      </div>

      <div className="p-2.5 flex flex-col flex-1">
        <div className="text-[0.7rem] text-gray-600 uppercase tracking-wider font-bold mb-0.5">{brand}</div>
        <h3 className="font-semibold text-[0.85rem] leading-tight text-brand-fg mb-1 line-clamp-2 h-[2.6em]">
          {title}
        </h3>
        <div className="text-[0.75rem] text-brand-muted truncate mb-1">Código: {code}</div>

        <div className="mt-auto">
           <div className="flex items-center gap-1.5 flex-wrap">
             <span className="text-[1.3rem] font-extrabold text-brand-blue-700 leading-none">
               ${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </span>
             {discount > 0 && <span className="text-[0.75rem] bg-brand-blue-600 text-white px-2 py-[2px] rounded-full font-bold">{discount}%</span>}
           </div>
           {originalPrice && (
             <span className="text-[0.8rem] text-gray-400 line-through block mt-1">${originalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</span>
           )}
        </div>

        <StockDots />

        <div className="pt-2 border-t border-[#eef2f7] mt-1">
           <Button className="w-full bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold text-[0.85rem] h-10 rounded-lg">
             AGREGAR
           </Button>
        </div>
      </div>
    </div>
  );
}
