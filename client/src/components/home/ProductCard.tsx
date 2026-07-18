import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: {
    id: number;
    brand: string;
    title: string;
    code: string;
    price: number;
    originalPrice?: number;
    image: string;
    isNew?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-square p-4 bg-white flex items-center justify-center border-b border-gray-100">
         {/* Badges */}
         <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
           {product.originalPrice && (
             <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
               OFERTA
             </span>
           )}
           {product.isNew && (
             <span className="bg-brand-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
               NUEVO
             </span>
           )}
         </div>
         
         <button className="absolute top-2 right-2 p-2 text-gray-400 hover:text-red-500 transition-colors z-10 bg-white/80 rounded-full hover:bg-white">
           <Heart className="w-5 h-5" />
         </button>

         <Link href={`/producto/${product.id}`} className="w-full h-full flex items-center justify-center relative cursor-pointer">
             <img 
               src={product.image} 
               alt={product.title} 
               className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
               loading="lazy"
             />
           </Link>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">
          {product.brand}
        </p>
        
        <Link href={`/producto/${product.id}`} className="block group-hover:text-brand-blue-600 transition-colors">
            <h4 className="text-sm font-bold text-gray-800 leading-tight min-h-[2.5em] line-clamp-2 mb-2" title={product.title}>
              {product.title}
            </h4>
          </Link>
        
        <p className="text-xs text-gray-400 mb-4 font-mono">Cod: {product.code}</p>
        
        <div className="mt-auto space-y-3">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-900 leading-none">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] text-gray-500 font-medium">
                +IVA
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex border border-gray-200 rounded-md overflow-hidden bg-gray-50 h-9 w-20 shrink-0">
               <button className="w-6 flex items-center justify-center hover:bg-gray-200 font-bold text-gray-600">-</button>
               <input type="text" value="1" className="w-full text-center text-sm font-bold bg-transparent outline-none" readOnly />
               <button className="w-6 flex items-center justify-center hover:bg-gray-200 font-bold text-gray-600">+</button>
            </div>
            <Button className="flex-1 bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold h-9 rounded-md flex items-center gap-2 shadow-sm transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">AGREGAR</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
