import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function MainHero() {
  return (
    <section className="relative w-full h-[360px] bg-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/images/main-hero-bg.png")' }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-900/90 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="max-w-2xl text-white">
          <span className="inline-block bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-sm mb-4 tracking-wider uppercase">
            Nuevo Ingreso
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display italic font-black leading-tight mb-4 drop-shadow-md">
            POTENCIA TU VIAJE <br/>
            <span className="text-brand-orange">CONPIRELLI DIABLO</span>
          </h1>
          <p className="text-lg text-gray-200 mb-8 max-w-xl font-medium">
            Descubrí la nueva línea de neumáticos de alto rendimiento diseñados para ofrecer máximo agarre y durabilidad en cualquier terreno.
          </p>
          <Link href="/catalogo" className="inline-flex items-center justify-center bg-brand-orange hover:bg-orange-600 text-white font-bold py-3 px-8 rounded shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              VER PRODUCTOS
            </Link>
        </div>
      </div>

      {/* Simple slider navigation dots (static representation) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        <button className="w-8 h-2 bg-brand-orange rounded-full"></button>
        <button className="w-2 h-2 bg-white/50 hover:bg-white rounded-full transition-colors"></button>
        <button className="w-2 h-2 bg-white/50 hover:bg-white rounded-full transition-colors"></button>
      </div>
    </section>
  );
}
