import { Link } from "wouter";

export function PromoMosaic() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-display italic text-brand-blue-900 font-bold border-l-4 border-brand-orange pl-3">
            OFERTAS Y PROMOCIONES
          </h2>
          <Link href="/ofertas" className="text-sm font-bold text-brand-blue-600 hover:text-brand-blue-800 transition-colors uppercase tracking-wide flex items-center gap-1">
              Ver todas las promociones
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[500px]">
          {/* Main Large Banner (Left) */}
          <Link href="/catalogo" className="relative rounded-xl overflow-hidden group block h-[300px] md:h-full bg-gray-900 shadow-md">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: 'url("/images/promo-1.png")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-6 left-6">
                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
                  OFERTA DE LA SEMANA
                </span>
              </div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-display italic font-bold text-white mb-2 leading-tight">
                  HASTA 30% OFF <br/>
                  <span className="text-brand-orange">EN KIT DE TRANSMISIÓN</span>
                </h3>
                <p className="text-gray-200 text-sm font-medium">Marcas seleccionadas. Promoción válida hasta agotar stock.</p>
              </div>
            </Link>

          {/* Right Column (Stacked smaller banners) */}
          <div className="grid grid-rows-3 gap-4 h-[600px] md:h-full">
            {/* Small Banner 1 */}
            <Link href="/catalogo" className="relative rounded-xl overflow-hidden group block bg-gray-900 shadow-md">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/images/promo-2.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                <div className="absolute inset-y-0 left-6 flex flex-col justify-center w-2/3">
                  <span className="text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">Novedad</span>
                  <h4 className="text-xl font-bold text-white leading-tight mb-2">Nuevos Cascos HJC</h4>
                  <span className="text-sm font-medium text-gray-300">Descubrí la nueva colección</span>
                </div>
              </Link>

            {/* Small Banner 2 */}
            <Link href="/catalogo" className="relative rounded-xl overflow-hidden group block bg-gray-900 shadow-md">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/images/promo-3.png")' }}
                />
                <div className="absolute inset-0 bg-brand-blue-700/80 mix-blend-multiply" />
                <div className="absolute inset-y-0 left-6 flex flex-col justify-center w-2/3">
                  <span className="bg-white text-brand-blue-900 text-[10px] font-bold px-2 py-0.5 rounded w-fit mb-2">POOL DE COMPRAS</span>
                  <h4 className="text-xl font-bold text-white leading-tight mb-2">Unite al pool de NGK</h4>
                  <span className="text-sm font-medium text-white/90">Ahorrá hasta un 25% extra</span>
                </div>
              </Link>

            {/* Small Banner 3 */}
            <Link href="/catalogo" className="relative rounded-xl overflow-hidden group block bg-gray-900 shadow-md">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: 'url("/images/promo-4.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent" />
                <div className="absolute inset-y-0 right-6 flex flex-col justify-center items-end text-right w-2/3">
                  <span className="text-white text-xs font-bold uppercase tracking-wider mb-1">Combos</span>
                  <h4 className="text-xl font-bold text-white leading-tight mb-2">Service Completo</h4>
                  <span className="text-sm font-medium text-gray-200">Aceite + Filtros con descuento</span>
                </div>
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
