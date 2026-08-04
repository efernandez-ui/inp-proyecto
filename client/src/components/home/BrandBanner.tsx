import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import pirelliBannerBg from "@/assets/home/pirelli-banner-bg.png";

export function BrandBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative w-full h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg bg-gray-900 flex items-center">
          {/* Background image & gradient */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${pirelliBannerBg}")` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          
          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 max-w-2xl flex flex-col items-start">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Pirelli_logo.svg/512px-Pirelli_logo.svg.png" 
              alt="Pirelli" 
              className="h-10 md:h-12 object-contain mb-4"
            />
            <h3 className="text-2xl md:text-4xl font-display text-white font-bold leading-tight mb-2">
              EL ADN DE LAS CARRERAS <br/>
              <span className="text-yellow-500">EN TU MOTO</span>
            </h3>
            <p className="text-gray-300 mb-6 font-medium max-w-md hidden md:block">
              Descubrí la gama completa de neumáticos Pirelli para calle, pista y off-road. El máximo rendimiento garantizado.
            </p>
            <Link href="/catalogo" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-2 rounded transition-colors uppercase text-sm tracking-wide">
                Ver Catálogo Oficial
              </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
