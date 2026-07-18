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
      <header className="bg-intercap-blue-dark py-0 h-16 border-b border-white/5">
        <div className="container mx-auto px-4 h-full flex items-center gap-4 justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0 text-white no-underline">
               <div className="w-2 h-7 rounded-[3px] bg-intercap-blue-main"></div>
               <span className="font-display font-black text-[1.8rem] leading-none tracking-tighter uppercase">INTERCAP</span>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 ml-4">
            <Link href="/" className={`text-white font-black text-[11px] tracking-tighter px-3 py-2 rounded-lg hover:bg-white/5 transition-all ${location === '/' ? 'text-intercap-blue-main' : ''}`}>HOME</Link>
            <Link href="/catalogo" className={`text-white font-black text-[11px] tracking-tighter px-3 py-2 rounded-lg hover:bg-white/5 transition-all ${location === '/catalogo' ? 'text-intercap-blue-main' : ''}`}>CATALOGO</Link>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg w-full ml-auto flex items-center gap-2">
            <div className="relative w-full hidden md:block">
              <Input 
                type="search" 
                placeholder="¿Qué estás buscando?" 
                className="h-[40px] rounded-[4px] bg-white/10 text-white border-white/10 px-4 placeholder:text-gray-500 w-full focus-visible:ring-1 focus-visible:ring-intercap-blue-main font-black text-[11px] tracking-tighter uppercase"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            </div>
            
            <button className="flex items-center justify-center w-[40px] h-[40px] rounded-[4px] bg-white/5 text-gray-200 border border-white/10 hover:border-intercap-blue-main transition-colors relative">
              <ShoppingCart className="w-4 h-4" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-intercap-orange rounded-full text-[9px] font-black flex items-center justify-center text-white">0</div>
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
                    <Link href="/" className="text-lg font-bold">Home</Link>
                    <Link href="/catalogo" className="text-lg font-bold">Catálogo</Link>
                  </nav>
                </SheetContent>
             </Sheet>
        </div>
      </header>
    </div>
  );
}
