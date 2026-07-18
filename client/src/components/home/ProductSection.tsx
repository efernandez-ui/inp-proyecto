import { Link } from "wouter";
import { ProductCard } from "./ProductCard";

interface ProductSectionProps {
  title: string;
  products: any[];
  highlightColor?: "orange" | "blue" | "green";
  showNumbering?: boolean;
}

export function ProductSection({ title, products, highlightColor = "blue", showNumbering = false }: ProductSectionProps) {
  const borderColorMap = {
    orange: "border-brand-orange",
    blue: "border-brand-blue-600",
    green: "border-green-500"
  };

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
           <h3 className={`text-2xl font-display italic font-bold text-brand-blue-900 border-l-4 ${borderColorMap[highlightColor]} pl-3 uppercase`}>
             {title}
           </h3>
           <Link href="/catalogo" className="text-sm font-bold text-gray-500 hover:text-brand-blue-900 uppercase tracking-wide flex items-center gap-1">
               Ver todos &rarr;
             </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product, idx) => (
            <div key={product.id} className="relative">
              {showNumbering && (
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-brand-blue-900 text-white flex items-center justify-center font-black z-20 border-2 border-white shadow-md">
                  {idx + 1}
                </div>
              )}
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
