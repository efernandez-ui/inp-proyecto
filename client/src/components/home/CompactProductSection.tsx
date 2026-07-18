import { Link } from "wouter";
import { ProductCard } from "./ProductCard";

interface CompactProductSectionProps {
  products: any[];
}

export function CompactProductSection({ products }: CompactProductSectionProps) {
  const newProducts = products.slice(0, 4).map(p => ({...p, isNew: true}));
  const launches = products.slice(4, 8).map(p => ({...p, originalPrice: undefined}));

  const CompactCard = ({ product }: { product: any }) => {
    const formatPrice = (price: number) => {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS'
      }).format(price);
    };

    return (
      <Link href={`/producto/${product.id}`} className="flex items-center gap-4 bg-white p-3 rounded-lg border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all group">
          <div className="w-20 h-20 bg-gray-50 rounded flex items-center justify-center p-2 shrink-0">
            <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-gray-500 font-bold uppercase">{product.brand}</span>
            <h4 className="text-sm font-bold text-gray-800 truncate" title={product.title}>{product.title}</h4>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-bold text-gray-900">{formatPrice(product.price)}</span>
              <span className="text-[10px] text-gray-500">+IVA</span>
            </div>
          </div>
          <div className="text-brand-orange shrink-0 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
            &rarr;
          </div>
        </Link>
    );
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          
          {/* Left Column: Nuevos Ingresos */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-brand-blue-900 border-l-4 border-brand-orange pl-3">
                NUEVOS INGRESOS
              </h3>
              <Link href="/catalogo" className="text-xs font-bold text-gray-500 hover:text-brand-orange uppercase tracking-wide">
                  Ver todos
                </Link>
            </div>
            <div className="flex flex-col gap-3">
              {newProducts.map(p => <CompactCard key={p.id} product={p} />)}
            </div>
          </div>

          {/* Right Column: Lanzamientos */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-bold text-brand-blue-900 border-l-4 border-brand-blue-600 pl-3">
                LANZAMIENTOS
              </h3>
              <Link href="/catalogo" className="text-xs font-bold text-gray-500 hover:text-brand-blue-600 uppercase tracking-wide">
                  Ver todos
                </Link>
            </div>
            <div className="flex flex-col gap-3">
              {launches.map(p => <CompactCard key={p.id} product={p} />)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
