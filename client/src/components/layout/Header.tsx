import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, X, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function Header() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-dark text-white shadow-lg">
      {/* Top Bar */}
      <div className="hidden md:block bg-black/20 py-1 text-xs text-gray-300">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>Envíos a todo el país | El mejor catálogo de productos</p>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone size={12} /> 0800-555-MOTO</span>
            <span className="flex items-center gap-1"><MapPin size={12} /> Sucursales</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2 group">
            <div className="h-8 w-2 bg-brand-blue rounded-sm group-hover:h-6 transition-all" />
            <span className="font-display text-2xl tracking-wide italic text-white">
              INTERCAP
            </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/">
            <a className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/') ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
              Inicio
            </a>
          </Link>
          <Link href="/catalogo">
            <a className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${isActive('/catalogo') ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}>
              Catálogo
            </a>
          </Link>
          <a href="#" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all">
            Ofertas
          </a>
          <a href="#" className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white transition-all">
            Contacto
          </a>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3 ml-auto md:ml-0">
          <div className="relative hidden lg:block w-64">
            <Input 
              type="search" 
              placeholder="Buscar productos..." 
              className="h-9 bg-black/30 border-white/10 text-white placeholder:text-gray-400 focus-visible:ring-brand-blue focus-visible:border-brand-blue pl-9 rounded-xl"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <Button size="icon" variant="ghost" className="lg:hidden text-gray-300 hover:text-white hover:bg-white/10">
            <Search className="w-5 h-5" />
          </Button>

          <Button size="icon" variant="ghost" className="relative text-gray-300 hover:text-white hover:bg-white/10 rounded-xl">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-blue rounded-full ring-2 ring-brand-dark" />
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden text-gray-300 hover:text-white hover:bg-white/10">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-brand-dark border-r border-white/10 text-white w-[300px] p-0">
              <div className="p-6 border-b border-white/10">
                 <span className="font-display text-2xl tracking-wide italic text-white">
                  INTERCAP
                </span>
              </div>
              <div className="flex flex-col p-4 gap-2">
                <Link href="/">
                  <a className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-between ${isActive('/') ? 'bg-brand-blue text-white' : 'text-gray-300 hover:bg-white/5'}`}>
                    Inicio
                  </a>
                </Link>
                <Link href="/catalogo">
                  <a className={`px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-between ${isActive('/catalogo') ? 'bg-brand-blue text-white' : 'text-gray-300 hover:bg-white/5'}`}>
                    Catálogo
                  </a>
                </Link>
                <a href="#" className="px-4 py-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 transition-all">
                  Ofertas
                </a>
                <a href="#" className="px-4 py-3 rounded-lg font-semibold text-gray-300 hover:bg-white/5 transition-all">
                  Contacto
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
