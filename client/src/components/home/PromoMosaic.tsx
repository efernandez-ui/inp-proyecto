import { Link } from "wouter";

export function PromoMosaic() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display italic text-brand-blue-900 font-bold uppercase tracking-tight">
            OFERTAS Y PROMOCIONES
          </h2>
          <div className="w-16 h-1 bg-brand-orange mt-2 mb-4 mx-auto rounded-full"></div>
          <Link href="/ofertas" className="text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors uppercase tracking-wide flex items-center gap-1">
            Ver todas las promociones
          </Link>
        </div>

        {/* Main cascos banner — full width */}
        <Link href="/catalogo" className="relative rounded-[20px] overflow-hidden group block shadow-md mb-4">
          <img
            src="/images/promo-cascos.png"
            alt="Especial Mundial 10% OFF en todos los cascos"
            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Three smaller banners below in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/catalogo" className="relative rounded-[20px] overflow-hidden group block shadow-md">
            <img
              src="/images/promo-cubiertas.png"
              alt="Cubiertas para salir a la cancha"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </Link>

          <Link href="/catalogo" className="relative rounded-[20px] overflow-hidden group block shadow-md">
            <img
              src="/images/promo-titular.png"
              alt="Equipo Titular para Rodar"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </Link>

          <Link href="/catalogo" className="relative rounded-[20px] overflow-hidden group block shadow-md">
            <img
              src="/images/promo-moto.png"
              alt="Pone tu moto a punto"
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
