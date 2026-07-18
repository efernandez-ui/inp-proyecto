import { Link } from "wouter";

export function PromoMosaic() {
  return (
    <section className="py-16 bg-white">
      <div className="mx-auto px-4 max-w-[1500px]">
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display italic text-brand-blue-900 font-bold uppercase tracking-tight">
            OFERTAS Y PROMOCIONES
          </h2>
          <div className="w-16 h-1 bg-brand-orange mt-2 mb-4 mx-auto rounded-full"></div>
          <Link href="/ofertas" className="text-sm font-bold text-gray-500 hover:text-brand-orange transition-colors uppercase tracking-wide flex items-center gap-1">
            Ver todas las promociones
          </Link>
        </div>

        {/* Layout: Cascos left (852×650) + 3 stacked right (640×206 each) */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Left: Cascos banner — aspect 852/650 */}
          <Link
            href="/catalogo"
            className="rounded-[16px] overflow-hidden group block shadow-md flex-shrink-0 md:w-[calc(852/1496*100%)]"
          >
            <div style={{ aspectRatio: "852 / 650" }} className="w-full overflow-hidden">
              <img
                src="/images/promo-cascos.png"
                alt="Especial Mundial 10% OFF en todos los cascos"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </Link>

          {/* Right: 3 stacked banners — each aspect 640/206 */}
          <div className="flex flex-col gap-3 flex-1">
            <Link href="/catalogo" className="rounded-[16px] overflow-hidden group block shadow-md">
              <div style={{ aspectRatio: "640 / 206" }} className="w-full overflow-hidden">
                <img
                  src="/images/promo-cubiertas.png"
                  alt="Cubiertas para salir a la cancha"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <Link href="/catalogo" className="rounded-[16px] overflow-hidden group block shadow-md">
              <div style={{ aspectRatio: "640 / 206" }} className="w-full overflow-hidden">
                <img
                  src="/images/promo-titular.png"
                  alt="Equipo Titular para Rodar"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </Link>

            <Link href="/catalogo" className="rounded-[16px] overflow-hidden group block shadow-md">
              <div style={{ aspectRatio: "640 / 206" }} className="w-full overflow-hidden">
                <img
                  src="/images/promo-moto.png"
                  alt="Pone tu moto a punto"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
