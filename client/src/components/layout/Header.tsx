import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col w-full">
      {/* Top Bar - Green */}
      <div className="bg-intercap-green text-intercap-purple text-[11px] font-bold py-1 text-center tracking-wide uppercase">
        Envíos a todo el país y el mejor catálogo de productos y repuestos para motos
      </div>

      {/* Main Header - Purple */}
      <header className="bg-intercap-purple py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group shrink-0">
               {/* Simulating the logo from screenshot with icon + text */}
               <div className="flex flex-col items-start leading-none text-white">
                 <div className="flex items-center gap-1">
                   <div className="bg-white/10 p-1 rounded">
                     <ShoppingCart className="text-white w-6 h-6" /> 
                   </div>
                   <div className="flex flex-col">
                     <span className="font-bold text-xl italic tracking-tighter">e-biz</span>
                     <span className="text-[10px] tracking-widest uppercase opacity-80">Intercap</span>
                   </div>
                 </div>
               </div>
            </a>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl w-full relative">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="¿Qué estas Buscando?" 
                className="h-10 rounded-full bg-white text-gray-800 border-transparent pl-5 pr-12 placeholder:text-gray-400 w-full focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-intercap-purple hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 shrink-0">
             <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-bold px-4 h-8">
               INGRESÁ
             </Button>
             <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold px-4 h-8">
               SOLICITÁ ACCESO
             </Button>
             
             {/* Mobile Menu Trigger */}
             <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="md:hidden text-white ml-2">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-intercap-purple text-white border-r-white/10">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link href="/catalogo"><a className="text-lg font-bold">Catálogo</a></Link>
                    <a href="#" className="text-lg">¿Quiénes Somos?</a>
                    <a href="#" className="text-lg">Quiero ser Cliente</a>
                    <a href="#" className="text-lg">Sucursales</a>
                    <a href="#" className="text-lg">Autogestión</a>
                  </nav>
                </SheetContent>
             </Sheet>
          </div>
        </div>
      </header>

      {/* Navigation Bar - Darker Purple */}
      <nav className="bg-intercap-dark-purple text-white text-sm hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 h-10">
            <li>
              <Link href="/catalogo">
                <a className="flex items-center gap-1 font-bold hover:text-intercap-green transition-colors">
                  Catálogo <span className="text-[10px]">▼</span>
                </a>
              </Link>
            </li>
            <li><a href="#" className="hover:text-intercap-green transition-colors">¿Quiénes Somos?</a></li>
            <li><a href="#" className="hover:text-intercap-green transition-colors">Quiero ser Cliente</a></li>
            <li><a href="#" className="hover:text-intercap-green transition-colors">Sucursales</a></li>
            <li><a href="#" className="hover:text-intercap-green transition-colors">Autogestión</a></li>
            <li><a href="#" className="hover:text-intercap-green transition-colors">Exportar Lista</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
