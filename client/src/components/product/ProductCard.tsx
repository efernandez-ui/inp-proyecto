import { Product } from "@/lib/mockData";
import { Heart, ShoppingCart, Check, X, ArrowRightLeft, Link as LinkIcon, Info, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { id, title, price, originalPrice, image, brand, stock, isNew, isHot, code } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  // Simulated Stock Levels for different regions based on the single stock value
  const getRegionStock = (region: string, baseStock: string) => {
    const hash = (id + region).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rand = hash % 10;
    
    if (baseStock === 'none') return 'none';
    if (baseStock === 'low') return rand > 5 ? 'none' : 'low';
    if (baseStock === 'high') return rand > 2 ? 'high' : 'mid';
    return rand > 5 ? 'mid' : 'low';
  };

  const regions = ['NOA', 'NEA', 'BUE', 'CUY'];

  // Battery Icon Component
  const BatteryIcon = ({ level }: { level: string }) => {
    let colorClass = '';
    let fillHeight = 'h-full';
    
    switch(level) {
      case 'high': 
        colorClass = 'bg-stock-high';
        fillHeight = 'h-full';
        break;
      case 'mid': 
        colorClass = 'bg-stock-mid';
        fillHeight = 'h-3/4';
        break;
      case 'low': 
        colorClass = 'bg-stock-low';
        fillHeight = 'h-1/2';
        break;
      case 'none': 
        colorClass = 'border-stock-none border-[1.5px] bg-transparent'; // Outline only for empty? Or red empty?
        // The image shows empty battery in red outline for 'none'
        fillHeight = 'h-0';
        break;
      default:
         colorClass = 'bg-gray-300';
    }

    if (level === 'none') {
        return (
            <div className="relative flex flex-col items-center justify-end w-[10px] h-[18px] border border-stock-none rounded-[1px]">
                <div className="absolute -top-[2px] w-[4px] h-[2px] bg-stock-none"></div>
            </div>
        )
    }

    return (
      <div className="relative flex flex-col items-center justify-end w-[10px] h-[18px] bg-gray-200 rounded-[1px]">
        <div className={`w-full ${fillHeight} ${colorClass} rounded-[1px]`}></div>
        <div className={`absolute -top-[2px] w-[4px] h-[2px] ${colorClass}`}></div>
      </div>
    );
  };

  const StockTable = () => (
    <div className="grid grid-cols-4 gap-2 mt-auto pt-2 pb-2 w-full">
      {regions.map(region => {
        const level = getRegionStock(region, stock);
        return (
          <div key={region} className="text-center flex flex-col items-center gap-1">
             <span className="text-[0.65rem] font-bold text-gray-400 uppercase">{region}</span>
             <BatteryIcon level={level} />
          </div>
        );
      })}
    </div>
  );

  const ActionIcons = () => (
      <div className="flex justify-between items-center w-full px-2 mt-2 text-gray-400">
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><ArrowRightLeft className="w-4 h-4 hover:text-brand-blue-600 cursor-pointer" /></TooltipTrigger>
                <TooltipContent><p>Comparar</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><LinkIcon className="w-4 h-4 hover:text-brand-blue-600 cursor-pointer" /></TooltipTrigger>
                <TooltipContent><p>Copiar Link</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><Bike className="w-4 h-4 hover:text-brand-blue-600 cursor-pointer" /></TooltipTrigger>
                <TooltipContent><p>Vehículos compatibles</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger><Info className="w-4 h-4 hover:text-brand-blue-600 cursor-pointer" /></TooltipTrigger>
                <TooltipContent><p>Más información</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
      </div>
  )

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-[#eaeef3] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row relative group">
        {(isNew || isHot || discount > 0) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {discount > 0 && <Badge className="bg-red-600 hover:bg-red-700 text-[10px] font-bold">{discount}% OFF</Badge>}
            </div>
        )}
        
        <div className="w-full sm:w-[180px] h-[180px] shrink-0 p-4 flex items-center justify-center bg-white border-r border-gray-50">
           <img src={image} alt={title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
        </div>
        
        <div className="flex-1 min-w-0 p-5 flex flex-col">
          <div className="flex justify-between items-start">
             <div>
                <div className="text-xs font-bold text-brand-blue-600 uppercase tracking-wider mb-1">{brand}</div>
                <h3 className="font-bold text-lg leading-tight text-brand-fg mb-2 group-hover:text-brand-blue-700 transition-colors">{title}</h3>
                
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${stock === 'none' ? 'bg-red-500' : stock === 'low' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            {stock === 'none' ? 'SIN STOCK' : stock === 'low' ? 'STOCK BAJO' : 'STOCK ALTO'}
                        </span>
                    </div>
                    <span className="text-xs text-gray-300">|</span>
                    <div className="text-xs text-gray-400">Cod: <span className="text-gray-600">{code}</span></div>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <span className="font-semibold text-gray-500">Rodado:</span> 
                        <span className="text-gray-800">{product.attributes.rim || 'N/A'}"</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <span className="font-semibold text-gray-500">Ancho:</span> 
                        <span className="text-gray-800">{product.attributes.width || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                        <span className="font-semibold text-gray-500">Posición:</span> 
                        <span className="text-gray-800">{product.attributes.position || 'Universal'}</span>
                    </div>
                </div>
             </div>

             <div className="text-right">
                {originalPrice && (
                    <div className="text-sm text-gray-400 line-through mb-1">${originalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</div>
                )}
                <div className="text-3xl font-black text-brand-fg">
                    ${price.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                </div>
             </div>
          </div>
          
          <div className="mt-auto pt-4 flex justify-end gap-3">
             <Button variant="outline" className="text-gray-500 border-gray-300 hover:text-brand-blue-700 hover:border-brand-blue-700">
                Ver Detalles
             </Button>
             <Button className="bg-brand-blue-700 hover:bg-brand-blue-800 text-white font-bold px-8">
                AGREGAR AL CARRITO
             </Button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View - AMA Bottle Style
  return (
    <div className="relative bg-white border border-[#eaeef3] rounded-xl overflow-hidden shadow-sm flex flex-col h-full hover:shadow-lg transition-all duration-300 group">
      <button className="absolute top-3 left-3 z-10 text-gray-400 hover:text-brand-blue-700">
         <Heart className="w-5 h-5" />
      </button>

      <div className="p-4 pb-0 flex justify-center bg-white relative">
         <div className="w-full aspect-square flex items-center justify-center">
            <img 
            src={image} 
            alt={title} 
            className="max-w-[80%] max-h-[80%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" 
            />
         </div>
         {/* Small brand logo placeholder if needed, or just text below */}
      </div>

      <div className="px-4 pb-4 flex flex-col flex-1">
        <h3 className="font-bold text-[0.9rem] leading-snug text-brand-blue-800 uppercase mb-1 line-clamp-2 min-h-[2.8em]">
          {title}
        </h3>
        
        <div className="text-[0.75rem] font-bold text-brand-fg mb-3">
            Código: <span className="font-normal">{code}</span>
        </div>

        <div className="mb-2">
           <div className="text-[0.7rem] text-gray-400 uppercase">Precio final:</div>
           <div className="text-[1.4rem] font-extrabold text-brand-blue-600 leading-none">
             ${price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
           </div>
        </div>
        
        {originalPrice && (
            <div className="mb-4">
                <div className="text-[0.7rem] text-gray-400 uppercase">Precio público:</div>
                <div className="text-[1rem] font-medium text-orange-400 line-through">
                    ${originalPrice.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
            </div>
        )}

        <StockTable />
        
        <ActionIcons />

        <div className="mt-4">
           <Button className="w-full bg-intercap-purple hover:bg-brand-blue-900 text-white font-bold text-[0.75rem] h-9 rounded shadow-sm uppercase tracking-wide">
             AGREGAR AL CARRITO
           </Button>
        </div>
      </div>
    </div>
  );
}
