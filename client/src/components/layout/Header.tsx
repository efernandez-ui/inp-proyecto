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
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg w-full ml-auto flex items-center gap-2">
            <div className="relative w-full hidden md:block">
              <Input 
                type="search" 
                placeholder="¿Qué estás buscando?" 
                className="h-[44px] rounded-[6px] bg-white text-gray-800 border-none px-4 placeholder:text-gray-400 w-full focus-visible:ring-2 focus-visible:ring-brand-blue-500 shadow-sm font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            <button className="flex items-center justify-center w-[44px] h-[44px] rounded-[6px] bg-[#0b1226] text-gray-200 border border-[#223] hover:border-brand-blue-600 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full text-[10px] font-bold flex items-center justify-center text-white">0</div>
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
                  </nav>
                </SheetContent>
             </Sheet>
        </div>
      </header>
    </div>
  );
}
