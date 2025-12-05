import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/mockData";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, TrendingUp, ShieldCheck, Truck } from "lucide-react";
import { Link } from "wouter";

// Helper for carousel
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  // Get some featured products
  const featuredProducts = PRODUCTS.slice(0, 8);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-brand-dark overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-r from-blue-600 to-transparent rotate-12 blur-3xl" />
             <div className="absolute top-[20%] right-[0%] w-[50%] h-[100%] bg-gradient-to-l from-brand-blue to-transparent -rotate-12 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-in slide-in-from-left duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-300 text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" /> Distribuidor Oficial
                </div>
                <h1 className="text-4xl md:text-6xl font-display italic text-white leading-tight">
                  POTENCIA <br/>
                  <span className="text-brand-blue">TU RODADO</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-lg">
                  Encuentra la más amplia variedad de cubiertas, repuestos y accesorios para tu moto. Calidad garantizada y envíos a todo el país.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Link href="/catalogo">
                    <a className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-900/50 transition-all hover:scale-105">
                      Ver Catálogo
                    </a>
                  </Link>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg h-auto">
                    Nuestras Marcas
                  </Button>
                </div>
              </div>
              
              {/* Hero Image Placeholder - ideally a cool bike or tire composition */}
              <div className="relative animate-in slide-in-from-right duration-700 delay-200 hidden md:block">
                <div className="relative z-10 w-full aspect-square bg-gradient-to-br from-white/5 to-transparent rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center p-12">
                  <img 
                    src="https://placehold.co/600x600/png?text=Motorcycle+Tire" 
                    alt="Hero Tire" 
                    className="w-full h-full object-contain drop-shadow-2xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute top-10 right-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white shadow-xl">
                  <div className="text-xs text-gray-300 uppercase tracking-wider font-bold">Oferta Especial</div>
                  <div className="text-2xl font-display italic">25% OFF</div>
                  <div className="text-sm text-blue-300">En Pirelli</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-white border-b border-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Envíos a todo el país</h3>
                  <p className="text-sm text-gray-500">Despachamos en 24hs hábiles</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Garantía Oficial</h3>
                  <p className="text-sm text-gray-500">Productos 100% originales</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark">Mejores Precios</h3>
                  <p className="text-sm text-gray-500">Venta mayorista y minorista</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-display italic text-brand-dark">CATEGORÍAS</h2>
              <p className="text-gray-500 mt-2">Explora nuestro catálogo por tipo de producto</p>
            </div>
            <Button variant="ghost" className="text-brand-blue hover:text-blue-700">
              Ver todas <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Cubiertas', 'Cámaras', 'Transmisión', 'Lubricantes'].map((cat, i) => (
              <Link key={i} href="/catalogo">
                <a className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer">
                  <img 
                    src={`https://placehold.co/400x500/png?text=${cat}`} 
                    alt={cat}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-xl font-bold font-display italic">{cat}</h3>
                    <span className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity delay-100 flex items-center gap-1">
                      Explorar <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Carousel */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-10">
               <h2 className="text-3xl font-display italic text-brand-dark">DESTACADOS</h2>
               <div className="hidden md:flex gap-2">
                 {/* Carousel controls would go here if creating a custom controller */}
               </div>
            </div>
            
            <Carousel className="w-full" opts={{ align: "start", loop: true }}>
              <CarouselContent className="-ml-4">
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <div className="h-full">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </section>

        {/* Banner Promo */}
        <section className="container mx-auto px-4 py-16">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-brand-blue to-blue-600 relative text-white shadow-2xl shadow-blue-900/30">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
            <div className="grid md:grid-cols-2 gap-8 p-12 items-center relative z-10">
              <div className="space-y-6">
                <span className="bg-white text-brand-blue font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider">Oferta Limitada</span>
                <h2 className="text-4xl md:text-5xl font-display italic">KIT TRANSMISIÓN <br/> COMPLETO</h2>
                <p className="text-blue-100 text-lg">Lleva el rendimiento de tu moto al siguiente nivel con nuestros kits de transmisión de competición.</p>
                <Button className="bg-brand-dark hover:bg-black text-white border-none px-8 py-6 rounded-xl text-lg font-bold">
                  Comprar Ahora
                </Button>
              </div>
              <div className="flex justify-center">
                <img src="https://placehold.co/500x300/png?text=Kit+Transmision" alt="Kit" className="drop-shadow-2xl transform hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals Grid */}
        <section className="py-16 container mx-auto px-4 mb-16">
          <h2 className="text-3xl font-display italic text-brand-dark mb-8">RECIÉN LLEGADOS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/catalogo">
               <a className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 rounded-xl text-gray-600 font-bold hover:bg-brand-dark hover:text-white hover:border-transparent transition-all">
                 Ver todos los productos
               </a>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
