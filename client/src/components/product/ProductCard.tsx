import { Product } from "@/lib/mockData";
import { Heart, ShoppingCart, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { id, title, price, originalPrice, image, brand, stock, isNew, isHot } = product;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const StockIndicator = ({ level }: { level: string }) => {
    const config = {
      high: { color: "bg-green-500", text: "Stock Alto", icon: Check },
      mid: { color: "bg-yellow-400", text: "Stock Medio", icon: Check },
      low: { color: "bg-orange-500", text: "Stock Bajo", icon: Check },
      none: { color: "bg-red-500", text: "Sin Stock", icon: X },
    }[level] || { color: "bg-gray-400", text: "Consultar", icon: X };

    return (
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-500">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        {config.text}
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-300 flex">
        <div className="w-48 h-48 shrink-0 p-4 bg-gray-50 flex items-center justify-center relative">
          {(isNew || isHot || discount > 0) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {isNew && <Badge className="bg-blue-600 hover:bg-blue-700 text-[10px]">NUEVO</Badge>}
              {isHot && <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px]">HOT</Badge>}
              {discount > 0 && <Badge className="bg-red-600 hover:bg-red-700 text-[10px]">{discount}% OFF</Badge>}
            </div>
          )}
          <img src={image} alt={title} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">{brand}</div>
            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">{title}</h3>
            <div className="flex items-center gap-4 mb-4">
              <StockIndicator level={stock} />
              <span className="text-xs text-gray-400">Cod: {product.code}</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between">
            <div>
              {originalPrice && (
                <span className="text-sm text-gray-400 line-through block mb-1">${originalPrice.toLocaleString()}</span>
              )}
              <div className="text-3xl font-display font-bold text-brand-dark">
                ${price.toLocaleString()}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-lg border-gray-200 hover:border-red-200 hover:text-red-500">
                <Heart className="w-5 h-5" />
              </Button>
              <Button className="bg-brand-blue hover:bg-blue-700 text-white rounded-lg px-6 font-bold shadow-lg shadow-blue-900/20">
                Agregar <ShoppingCart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 hover:border-blue-100 transition-all duration-300 flex flex-col h-full relative">
      <button className="absolute top-3 right-3 z-20 text-gray-300 hover:text-red-500 transition-colors">
        <Heart className="w-6 h-6" />
      </button>

      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {isNew && <Badge className="bg-blue-600 hover:bg-blue-700 text-[10px]">NUEVO</Badge>}
        {isHot && <Badge className="bg-orange-500 hover:bg-orange-600 text-[10px]">HOT</Badge>}
        {discount > 0 && <Badge className="bg-red-600 hover:bg-red-700 text-[10px]">{discount}% OFF</Badge>}
      </div>

      <div className="aspect-[4/3] p-6 bg-gray-50 flex items-center justify-center overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">{brand}</div>
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors min-h-[2.5em]">
          {title}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              {originalPrice && (
                <span className="text-[10px] text-gray-400 line-through block">${originalPrice.toLocaleString()}</span>
              )}
              <div className="text-xl font-display font-bold text-brand-dark">
                ${price.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
               <StockIndicator level={stock} />
            </div>
          </div>
          
          <Button className="w-full bg-brand-blue hover:bg-blue-700 text-white rounded-lg font-bold shadow-md shadow-blue-900/10 group-hover:shadow-blue-900/20 transition-all">
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}
