import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CategoriesStrip } from "@/components/home/CategoriesStrip";
import { TireFinder } from "@/components/home/TireFinder";

export default function Home() {
  // Filter products for "Oferta" section
  const offerProducts = PRODUCTS.slice(0, 5);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pt-16">
      <Header />
      
      <main className="flex-1">
        
        {/* Categories Strip */}
        <CategoriesStrip />

        {/* Tire Finder */}
        <TireFinder />

        {/* Main Slider */}
        <section className="relative overflow-hidden bg-gray-100">
          <Carousel 
            className="w-full" 
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {/* Slide 1 - NGK (Based on screenshot) */}
              <CarouselItem>
                <div className="relative w-full h-[300px] md:h-[450px] bg-gradient-to-r from-white via-red-50 to-red-600 overflow-hidden">
                  <div className="container mx-auto h-full flex items-center relative z-10">
                    <div className="w-full grid md:grid-cols-2 gap-8 items-center px-8">
                       <div className="space-y-4">
                          <h2 className="text-5xl md:text-7xl font-display italic text-red-600 drop-shadow-sm tracking-tighter transform -skew-x-12">
                            REINGRESO
                          </h2>
                          <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-lg transform -rotate-12">
                            NGK
                          </div>
                       </div>
                       <div className="flex justify-end">
                          {/* Mockup of spark plugs */}
                          <img src="https://placehold.co/500x400/transparent/png?text=Spark+Plugs" alt="NGK Bujias" className="object-contain max-h-[350px]" />
                       </div>
                    </div>
                  </div>
                  {/* Diagonal divider */}
                  <div className="absolute top-0 right-0 w-2/3 h-full bg-red-600 transform -skew-x-12 translate-x-1/4 z-0" />
                  
                  {/* Promo Text Box */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-2xl rotate-2 border-4 border-yellow-400 hidden md:block z-20">
                    <h3 className="text-red-600 font-bold text-xl text-center uppercase border-b-2 border-red-100 pb-2 mb-2">Escala de Descuentos</h3>
                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                      <li className="flex justify-between gap-4"><span>1 A 199 UNID.</span> <span className="text-red-600">PRECIO LISTA</span></li>
                      <li className="flex justify-between gap-4"><span>200 A 599 UNID.</span> <span className="text-red-600">-5% OFF</span></li>
                      <li className="flex justify-between gap-4"><span>+600 UNID.</span> <span className="text-red-600">-10% OFF</span></li>
                    </ul>
                    <Button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-red-900 font-bold rounded-none uppercase">
                      Ver Más
                    </Button>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2 - Generic */}
              <CarouselItem>
                <div className="relative w-full h-[300px] md:h-[450px] bg-gradient-to-r from-blue-900 to-blue-600">
                  <div className="container mx-auto h-full flex items-center justify-center text-white">
                     <h2 className="text-5xl font-display italic">NUEVOS INGRESOS</h2>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            
            <CarouselPrevious className="left-4 bg-white/50 hover:bg-white border-none" />
            <CarouselNext className="right-4 bg-white/50 hover:bg-white border-none" />
          </Carousel>
        </section>

        {/* Categories Section - REMOVED */}

        {/* Promo Banners - Side by Side */}
        <section className="py-8 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <a href="#" className="block rounded-xl overflow-hidden group relative h-[200px] bg-black">
              <img 
                src="https://placehold.co/800x400/111/fff?text=SUPER+CITY" 
                alt="Super City" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-display italic text-yellow-400">SUPER CITY</h4>
                <p className="text-sm font-medium">Cubiertas de alto rendimiento</p>
              </div>
            </a>
            <a href="#" className="block rounded-xl overflow-hidden group relative h-[200px] bg-black">
              <img 
                src="https://placehold.co/800x400/2e3192/fff?text=BIG+BORE" 
                alt="Big Bore" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-6 left-6 text-white">
                <h4 className="text-2xl font-display italic text-green-400">BIG BORE</h4>
                <p className="text-sm font-medium">Carburadores de competición</p>
              </div>
            </a>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-gray-800 border-l-4 border-intercap-purple pl-3">
                 Cubiertas en Oferta
               </h3>
               <div className="flex gap-2">
                 <Button variant="outline" size="icon" className="rounded-full w-8 h-8 h-8">
                   <ChevronLeft className="w-4 h-4" />
                 </Button>
                 <Button variant="outline" size="icon" className="rounded-full w-8 h-8 h-8">
                   <ChevronRight className="w-4 h-4" />
                 </Button>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {offerProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative aspect-square p-4 bg-white flex items-center justify-center border-b border-gray-100">
                     {product.originalPrice && (
                       <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                         OFERTA
                       </span>
                     )}
                     <img src={product.image} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{product.brand}</p>
                    <h4 className="text-sm font-bold text-gray-800 leading-tight min-h-[2.5em] line-clamp-2 mb-2 hover:text-intercap-purple cursor-pointer">
                      {product.title}
                    </h4>
                    <p className="text-xs text-gray-400 mb-3">Código: {product.code}</p>
                    
                    <Button className="w-full bg-intercap-purple hover:bg-indigo-900 text-white text-xs font-bold h-8 rounded">
                      VER MÁS
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Footer Brand Strip */}
        <div className="bg-gray-100 py-8 border-t border-gray-200">
           <div className="container mx-auto px-4 flex justify-center">
              <img src="https://placehold.co/200x60/transparent/png?text=MOTUL" className="opacity-50 hover:opacity-100 transition-opacity mx-4" />
              <img src="https://placehold.co/200x60/transparent/png?text=NGK" className="opacity-50 hover:opacity-100 transition-opacity mx-4" />
              <img src="https://placehold.co/200x60/transparent/png?text=PIRELLI" className="opacity-50 hover:opacity-100 transition-opacity mx-4 hidden md:block" />
              <img src="https://placehold.co/200x60/transparent/png?text=DUNLOP" className="opacity-50 hover:opacity-100 transition-opacity mx-4 hidden md:block" />
           </div>
        </div>

        {/* Newsletter */}
        <section className="py-12 bg-white text-center border-t border-gray-200">
          <div className="container mx-auto px-4 max-w-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Recibí Novedades</h3>
            <p className="text-gray-500 mb-6 text-sm">¡Suscríbite a nuestro Newsletter para estar al tanto de los últimos lanzamientos y promociones!</p>
            
            <form className="flex gap-2 max-w-md mx-auto">
               <Input type="email" placeholder="Ingresá tu mail" className="flex-1" />
               <Button className="bg-intercap-blue hover:bg-blue-600 text-white font-bold px-6">
                 SUSCRIBIRSE
               </Button>
            </form>
          </div>
        </section>

      </main>
      
      {/* Main Footer */}
      <Footer />
    </div>
  );
}
