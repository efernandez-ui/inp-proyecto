import { Button } from "@/components/ui/button";
import { Users, Clock, Plus } from "lucide-react";
import { publicAsset } from "@/lib/assets";

export function ActivePools() {
  return (
    <section className="py-16 bg-brand-blue-900 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue-800 transform skew-x-12 translate-x-32 z-0 hidden lg:block opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 flex items-center gap-3">
              <Users className="w-8 h-8 text-brand-orange" />
              OFERTAS VIGENTES
            </h2>
            <p className="text-brand-blue-200 text-lg font-medium">
              Unite a compras grupales para acceder a descuentos mayoristas exclusivos. ¡Cuantos más somos, menos pagamos!
            </p>
          </div>
          <Button className="bg-transparent border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white font-bold whitespace-nowrap">
            VER TODOS LOS POOLS
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Pool Card 1 — NGK */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col text-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="h-40 relative overflow-hidden">
              <span className="absolute top-3 right-3 z-10 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <Clock className="w-3 h-3" /> Termina pronto
              </span>
              <img
                src={publicAsset("/images/pool-ngk.png")}
                alt="NGK"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="font-bold text-lg leading-tight mb-2">Bujías y Cables NGK</h4>

              <div className="bg-brand-blue-50 rounded-lg p-3 mb-4 mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-bold uppercase">Progreso</span>
                  <span className="text-sm font-bold text-brand-blue-700">80%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-brand-blue-600 w-[80%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 24 adheridos</span>
                  <span className="font-medium text-red-500">2 días rest.</span>
                </div>
              </div>

              <Button className="w-full bg-brand-blue-900 hover:bg-brand-blue-700 text-white font-bold text-sm">
                VER PRODUCTOS
              </Button>
            </div>
          </div>

          {/* Pool Card 2 — MOTUL */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col text-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="h-40 relative overflow-hidden">
              <img
                src={publicAsset("/images/pool-motul.png")}
                alt="Motul"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="font-bold text-lg leading-tight mb-2">Línea completa Motul 3000/5100</h4>

              <div className="bg-brand-blue-50 rounded-lg p-3 mb-4 mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-bold uppercase">Progreso</span>
                  <span className="text-sm font-bold text-brand-blue-700">45%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-brand-blue-600 w-[45%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 12 adheridos</span>
                  <span className="font-medium">10 días rest.</span>
                </div>
              </div>

              <Button className="w-full bg-brand-blue-900 hover:bg-brand-blue-700 text-white font-bold text-sm">
                VER PRODUCTOS
              </Button>
            </div>
          </div>

          {/* Pool Card 3 — PIRELLI Diablo */}
          <div className="bg-white rounded-xl overflow-hidden shadow-xl flex flex-col text-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
            <div className="h-40 relative overflow-hidden">
              <img
                src={publicAsset("/images/pool-pirelli.png")}
                alt="Pirelli Diablo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h4 className="font-bold text-lg leading-tight mb-2">Pirelli Diablo</h4>

              <div className="bg-brand-blue-50 rounded-lg p-3 mb-4 mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-bold uppercase">Progreso</span>
                  <span className="text-sm font-bold text-brand-blue-700">10%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-brand-blue-600 w-[10%] rounded-full"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 3 adheridos</span>
                  <span className="font-medium">14 días rest.</span>
                </div>
              </div>

              <Button className="w-full bg-brand-blue-900 hover:bg-brand-blue-700 text-white font-bold text-sm">
                VER PRODUCTOS
              </Button>
            </div>
          </div>

          {/* Suggest Pool */}
          <div className="rounded-xl overflow-hidden border-2 border-dashed border-brand-blue-400 bg-brand-blue-800/30 flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-brand-blue-800/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-brand-blue-700 flex items-center justify-center mb-4 text-white">
              <Plus className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-xl mb-2">¿Falta tu marca?</h4>
            <p className="text-brand-blue-200 text-sm mb-4">Sugerí un nuevo pool de compras a la comunidad de Intercap.</p>
            <Button className="bg-white text-brand-blue-900 hover:bg-gray-100 font-bold rounded-full px-6">
              SUGERIR POOL
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
