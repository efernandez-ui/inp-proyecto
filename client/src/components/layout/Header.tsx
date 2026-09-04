import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Search, ShoppingCart, Home, LayoutGrid, ChevronDown, LogOut, HelpCircle, User, Users, Settings, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import intercapLogo from "@assets/intercap-logo-blanco.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { label: "CATÁLOGO", href: "/catalogo", hasDropdown: true },
  { label: "CARRITO", href: "/carrito" },
  { label: "PEDIDOS", href: "/pedidos" },
  { label: "CUENTA CORRIENTE", href: "/cuenta-corriente" },
  { label: "COBRÁ CON INPAY", href: "/inpay" },
  { label: "RECLAMOS", href: "/reclamos" },
];

type HeaderProps = {
  mode?: "client" | "admin" | "seller";
};

export function Header({ mode }: HeaderProps) {
  const [location, navigate] = useLocation();
  const [storedMode, setStoredMode] = useState<"client" | "admin" | "seller">("client");
  const effectiveMode = mode ?? storedMode;
  const isAdmin = effectiveMode === "admin";
  const isSeller = effectiveMode === "seller";
  const homeHref = isAdmin ? "/admin" : "/home";
  const isManagementUser = isAdmin || isSeller;
  const AvatarMenuIcon = isManagementUser ? Settings : User;
  const avatarMenuLabel = isManagementUser ? "Panel de Gestion" : "Mis Datos";
  const managementPanelHref = isAdmin ? "/admin" : "/vendedor";

  useEffect(() => {
    const sessionMode = window.localStorage.getItem("intercap-user-mode");

    if (sessionMode === "admin" || sessionMode === "seller" || sessionMode === "client") {
      setStoredMode(sessionMode);
    }
  }, []);

  useEffect(() => {
    if (mode) {
      window.localStorage.setItem("intercap-user-mode", mode);
      setStoredMode(mode);
    }
  }, [mode]);

  const handleLogout = () => {
    window.localStorage.removeItem("intercap-user-mode");
    navigate("/");
  };

  return (
    <div className="flex flex-col w-full fixed top-0 z-50 shadow-lg">

      {/* ── ROW 1 ── */}
      <header className="bg-intercap-blue-dark h-14 border-b border-white/5">
        <div className="mx-auto px-6 h-full flex w-full items-center gap-3 max-w-[1500px]">

          {/* Logo */}
          <Link href="/home" className="flex items-center gap-2 shrink-0 text-white no-underline mr-2">
            <img src={intercapLogo} alt="Intercap" className="h-7 w-auto" />
          </Link>

          {/* Pill nav buttons */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href={homeHref}
              className={`flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all
                ${location === homeHref
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
                className="h-9 rounded-full bg-white text-slate-800 border-white pl-4 pr-10 placeholder:text-slate-400 w-full focus-visible:ring-1 focus-visible:ring-intercap-blue-main text-[12px] font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {isAdmin && (
            <button className="hidden h-9 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-[11px] font-black uppercase text-white/80 transition hover:bg-white/15 lg:flex">
              <Users className="h-3.5 w-3.5" />
              Seleccionar Clientes
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Cart + client badge */}
          {!isAdmin && <button className="hidden md:flex items-center gap-2 bg-white/8 hover:bg-white/15 border border-white/15 rounded-lg px-3 h-9 text-white transition-colors relative">
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                2
              </span>
            </div>
            <span className="bg-intercap-blue-main text-white text-[9px] font-black rounded-md px-4 h-[18px] flex items-center justify-center tracking-tight ml-0.5">
              Baterias
            </span>
          </button>}

          {/* Brand name */}
          <span className="hidden lg:block text-white font-black text-[13px] tracking-widest uppercase ml-2">
            {isAdmin ? "ADMIN" : isSeller ? "VENDEDOR" : "MOTOINP"}
          </span>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu de usuario"
                className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-intercap-blue-dark shadow-sm transition hover:bg-slate-100 md:flex"
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-lg border-slate-200 p-2 shadow-xl">
              <DropdownMenuItem
                onClick={() => {
                  if (isManagementUser) {
                    navigate(managementPanelHref);
                  }
                }}
                className="cursor-pointer font-semibold"
              >
                <AvatarMenuIcon className="h-4 w-4" />
                {avatarMenuLabel}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer font-black text-green-600 focus:bg-green-50 focus:text-green-700"
              >
                <LogOut className="h-4 w-4" />
                SALIR
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Abrir notificaciones"
                className="relative order-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15 md:order-none"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-black leading-none text-white ring-2 ring-intercap-blue-dark">
                  3
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={10}
              className="w-[288px] overflow-hidden rounded-[10px] border border-red-200 bg-white p-0 shadow-xl"
            >
              <div className="bg-red-50 px-4 pb-4 pt-3">
                <p className="text-[11px] font-black uppercase text-red-600">
                  SALDO VENCIDO
                </p>
                <p className="mt-2 text-[14px] font-black leading-5 text-slate-950">
                  Tenes <span className="text-red-600">8</span> documentos pendientes de pago
                </p>
              </div>
              <div className="border-t border-red-100 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-500">Monto vencido</span>
                  <span className="text-sm font-black text-red-600">$ 4.531.101,48</span>
                </div>
                <button
                  type="button"
                  className="mt-3 h-8 w-full rounded-lg bg-red-600 text-[11px] font-black uppercase text-white transition hover:bg-red-700"
                >
                  Ver cuenta corriente
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Ayuda */}
          <button className="hidden lg:flex items-center gap-1.5 text-white/80 hover:text-white text-[11px] font-bold transition-colors">
            AYUDA
            <HelpCircle className="w-3.5 h-3.5" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu de usuario"
                className="order-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white text-intercap-blue-dark shadow-sm transition hover:bg-slate-100 md:hidden"
              >
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-lg border-slate-200 p-2 shadow-xl">
              <DropdownMenuItem
                onClick={() => {
                  if (isManagementUser) {
                    navigate(managementPanelHref);
                  }
                }}
                className="cursor-pointer font-semibold"
              >
                <AvatarMenuIcon className="h-4 w-4" />
                {avatarMenuLabel}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer font-black text-green-600 focus:bg-green-50 focus:text-green-700"
              >
                <LogOut className="h-4 w-4" />
                SALIR
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="order-3 ml-1 text-white lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-intercap-blue-dark text-white border-r border-white/10">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/home" className="text-base font-bold">Home</Link>
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
      {!isAdmin && <nav className="hidden lg:flex bg-[#0d1730] border-b border-white/5 h-10 items-center justify-center">
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
        {isSeller && (
          <button className="mr-3 hidden h-8 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-[11px] font-black uppercase text-white/70 lg:flex">
            <Users className="h-3.5 w-3.5" />
            Seleccionar Clientes
            <ChevronDown className="h-3 w-3 opacity-70" />
          </button>
        )}
        <span className="text-white/50 text-[11px] font-semibold whitespace-nowrap">
          {isAdmin || isSeller ? "COTIZACIÓN USD $ 1.430,00" : "COTIZACIÓN USD $ 1490,00"}
        </span>
        </div>
      </nav>}

    </div>
  );
}
