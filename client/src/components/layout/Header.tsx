import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Header() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col w-full fixed top-0 z-50 shadow-lg">
      {/* Main Header - Gradient Dark */}
      <header className="bg-gradient-to-b from-brand-blue-950 to-brand-fg py-0 h-16">
        <div className="container mx-auto px-4 h-full flex items-center gap-4 justify-between">
          
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 group shrink-0 text-white no-underline">
               <div className="w-2 h-7 rounded-[3px] bg-brand-blue-500"></div>
               <span className="font-display font-normal text-[1.8rem] leading-none">INTERCAP</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 ml-4">
            <Link href="/"><a className={`text-gray-200 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-brand-blue-700/30 hover:opacity-100 opacity-90 transition-all ${location === '/' ? 'bg-brand-blue-700/30 opacity-100' : ''}`}>HOME</a></Link>
            <Link href="/catalogo"><a className={`text-gray-200 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-brand-blue-700/30 hover:opacity-100 opacity-90 transition-all ${location === '/catalogo' ? 'bg-brand-blue-700/30 opacity-100' : ''}`}>CATALOGO</a></Link>
            <a href="#" className="text-gray-200 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-brand-blue-700/30 hover:opacity-100 opacity-90 transition-all">CARRITO</a>
            <a href="#" className="text-gray-200 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-brand-blue-700/30 hover:opacity-100 opacity-90 transition-all">ADMINISTRACION</a>
            <a href="#" className="text-gray-200 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-brand-blue-700/30 hover:opacity-100 opacity-90 transition-all">VENTAS ESPECIALES</a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm w-full ml-auto flex items-center gap-2">
            <div className="relative w-full hidden md:block">
              <Input 
                type="search" 
                placeholder="Search" 
                className="h-[38px] rounded-[10px] bg-[#0b1226] text-gray-200 border-[#223] px-3 placeholder:text-gray-500 w-full focus-visible:ring-1 focus-visible:ring-brand-blue-600"
              />
            </div>
            
            <button className="flex items-center justify-center w-[36px] h-[36px] rounded-[10px] bg-[#0b1226] text-gray-200 border border-[#223] hover:border-brand-blue-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

             
             {/* Mobile Menu Trigger */}
             <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="lg:hidden text-white ml-2">
                    <Menu className="w-6 h-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-brand-fg text-white border-r-white/10">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link href="/"><a className="text-lg font-bold">Home</a></Link>
                    <Link href="/catalogo"><a className="text-lg font-bold">Catálogo</a></Link>
                    <a href="#" className="text-lg">Carrito</a>
                    <a href="#" className="text-lg">Administración</a>
                    <a href="#" className="text-lg">Ventas Especiales</a>
                  </nav>
                </SheetContent>
             </Sheet>
        </div>
      </header>
    </div>
  );
}
