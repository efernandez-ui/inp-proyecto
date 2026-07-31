import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Home, LayoutGrid, ChevronDown, LogOut, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const NAV_LINKS = [
  { label: "CATÁLOGO", href: "/catalogo", hasDropdown: true },
  { label: "CARRITO", href: "/carrito" },
  { label: "PEDIDOS", href: "/pedidos" },
  { label: "CUENTA CORRIENTE", href: "/cuenta-corriente" },
  { label: "COBRÁ CON INPAY", href: "/inpay" },
  { label: "RECLAMOS", href: "/reclamos" },
];

export function Header() {
  const [location] = useLocation();

  return (
    <div className="flex flex-col w-full fixed top-0 z-50 shadow-lg">

      {/* ── ROW 1 ── */}
      <header className="bg-intercap-blue-dark h-14 border-b border-white/5">
        <div className="mx-auto px-6 h-full flex items-center gap-3 max-w-[1800px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 text-white no-underline mr-2">
            <div className="w-[5px] h-7 rounded-[3px] bg-intercap-blue-main" />
            <span className="font-display font-black text-[1.6rem] leading-none tracking-tight uppercase">
              INTERCAP
            </span>
          </Link>

          {/* Pill nav buttons */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all
                ${location === "/"
                  ? "bg-white text-intercap-blue-dark border-white"
                  : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`}
            >
              <Home className="w-3 h-3" />
              Home
            </Link>
            <Link
              href="/catalogo"
              className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all
                ${location === "/catalogo"
                  ? "bg-white text-intercap-blue-dark border-white"
                  : "bg-transparent text-white border-white/30 hover:bg-white/10"}`}
            >
              <LayoutGrid className="w-3 h-3" />
              Catálogo
            </Link>
          </nav>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Input
                type="search"
                placeholder="¿Qué estás buscando?"
                className="h-9 rounded-full bg-white/10 text-white border-white/15 pl-4 pr-10 placeholder:text-gray-400 w-full focus-visible:ring-1 focus-visible:ring-intercap-blue-main text-[12px] font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Cart + client badge */}
          <button className="hidden md:flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 rounded-lg px-3 h-9 text-white transition-colors relative">
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                2
              </span>
            </div>
            <span className="bg-intercap-blue-main text-white text-[9px] font-black rounded-md px-2 h-[18px] flex items-center justify-center tracking-tight ml-0.5">
              #332058
            </span>
          </button>

          {/* Brand name */}
          <span className="hidden lg:block text-white font-black text-[13px] tracking-widest uppercase ml-2">
            MOTOINP
          </span>

          {/* Ayuda */}
          <button className="hidden lg:flex items-center gap-1.5 text-white/80 hover:text-white text-[11px] font-bold transition-colors">
            AYUDA
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          {/* Salir */}
          <button className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-[11px] font-bold px-4 h-9 rounded-lg transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            SALIR
          </button>

          {/* Mobile trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="lg:hidden text-white ml-1">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-intercap-blue-dark text-white border-r border-white/10">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-base font-bold">Home</Link>
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="text-base font-bold">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── ROW 2: Main nav + cotización ── */}
      <nav className="hidden lg:flex bg-[#0d1730] border-b border-white/5 h-10 items-center justify-center">
        <div className="w-full max-w-[1500px] mx-auto px-6 flex items-center h-full">
        {/* Nav links — left */}
        <div className="flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 text-[11px] font-bold tracking-wide uppercase px-4 h-10 hover:text-intercap-blue-main transition-colors
                ${location === link.href ? "text-intercap-blue-main" : "text-white/80"}`}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-60" />}
            </Link>
          ))}
        </div>

        {/* Cotización — right */}
        <span className="text-white/50 text-[11px] font-semibold whitespace-nowrap">
          COTIZACIÓN USD $ 1490,00
        </span>
        </div>
      </nav>

    </div>
  );
}
