import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  BadgeCheck,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Headphones,
  MapPin,
  PackageCheck,
  Search,
  ShieldCheck,
  Truck,
  UserRoundCheck,
  Warehouse,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import eurogripBanner from "@assets/inicio-banner-01-eurogrip.png";
import pirelliBanner from "@assets/inicio-banner-02-pirelli.png";
import kendaBanner from "@assets/inicio-banner-03-kenda.png";
import motulBanner from "@assets/inicio-banner-04-motul.png";
import ngkBanner from "@assets/inicio-banner-05-ngk.png";
import intercapLogo from "@assets/intercap-logo-blanco.png";
import portalPreview from "@assets/Intercap-Modificado-2_1784373676417.jpg";
import warehouseImage from "@assets/image_1767978864290.png";
import motulLogo from "@assets/Logos_Marcas-05_1785501128944.png";
import ngkLogo from "@assets/Logos_Marcas-06_1785501128944.png";
import pirelliLogo from "@assets/Logos_Marcas-07_1785501128944.png";
import motegLogo from "@assets/Logos_Marcas-02_1785501128944.png";
import pietcardLogo from "@assets/Logos_Marcas-11_1785501128945.png";

const services = [
  {
    title: "Catalogo",
    text: "Acceso simple a todos los productos para motos.",
    icon: PackageCheck,
  },
  {
    title: "Equipo de ventas",
    text: "Asesoramiento comercial para cada necesidad.",
    icon: UserRoundCheck,
  },
  {
    title: "SAI Intercap",
    text: "Atencion agil por telefono, chat y WhatsApp.",
    icon: Headphones,
  },
  {
    title: "INPay",
    text: "Pagos y cobranzas para simplificar la gestion.",
    icon: BadgeCheck,
  },
  {
    title: "Representacion exclusiva",
    text: "Distribuidores oficiales de marcas lideres.",
    icon: ShieldCheck,
  },
  {
    title: "Variedad de productos",
    text: "Mas de 33.000 articulos disponibles.",
    icon: Boxes,
  },
  {
    title: "Logistica",
    text: "Envios a todo el pais con seguimiento.",
    icon: Truck,
  },
  {
    title: "Autogestion 24/7",
    text: "Compra online cuando tu negocio lo necesite.",
    icon: Warehouse,
  },
];

const brandLogos = [motegLogo, motulLogo, ngkLogo, pietcardLogo, pirelliLogo];

const heroBanners = [
  { src: eurogripBanner, alt: "Eurogrip, the bike tyre specialist" },
  { src: pirelliBanner, alt: "Pirelli, desarrollado para rendir" },
  { src: kendaBanner, alt: "Kenda, built for performance" },
  { src: motulBanner, alt: "Motul lubricantes para motos" },
  { src: ngkBanner, alt: "NGK spark plugs" },
];

const navLinks = [
  { label: "CATÁLOGO", href: "/catalogo" },
  { label: "¿QUIÉNES SOMOS?", href: "#quienes-somos" },
  { label: "QUIERO SER CLIENTE", href: "#quiero-ser-cliente" },
  { label: "SUCURSALES", href: "#sucursales" },
  { label: "FORMA PARTE", href: "#forma-parte" },
];

export default function Landing() {
  const [, navigate] = useLocation();
  const [activeBanner, setActiveBanner] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBanner((current) => (current + 1) % heroBanners.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const goToPreviousBanner = () => {
    setActiveBanner((current) =>
      current === 0 ? heroBanners.length - 1 : current - 1,
    );
  };

  const goToNextBanner = () => {
    setActiveBanner((current) => (current + 1) % heroBanners.length);
  };

  const enterAs = (mode: "client" | "seller" | "admin", path: string) => {
    window.localStorage.setItem("intercap-user-mode", mode);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white text-intercap-blue-dark">
      <header className="sticky top-0 z-50 bg-intercap-blue-dark text-white shadow-md">
        <div className="mx-auto grid h-14 w-full max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center justify-self-start">
            <img src={intercapLogo} alt="Intercap" className="h-7 w-auto" />
          </Link>

          <div className="relative hidden w-full max-w-md justify-self-center sm:block">
            <input
              aria-label="Buscar"
              placeholder="Que estas buscando?"
              className="h-8 w-full rounded-full border-0 bg-white px-4 pr-10 text-xs font-medium text-slate-700 outline-none"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="flex items-center gap-3 justify-self-end">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="rounded bg-teal-500 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white transition hover:bg-teal-400"
                >
                  Ingresar
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl rounded-lg border-0 bg-white p-0 shadow-2xl">
                <DialogHeader className="border-b px-6 py-5">
                  <DialogTitle className="text-2xl font-black text-intercap-blue-dark">
                    Elegi tu acceso
                  </DialogTitle>
                  <DialogDescription>
                    Selecciona como queres ingresar al portal.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 p-6 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => enterAs("client", "/home")}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-intercap-blue-main hover:bg-blue-50"
                  >
                    <span className="block text-lg font-black text-intercap-blue-dark">
                      Cliente
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-500">
                      Entrar al home y catalogo de compras.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => enterAs("seller", "/vendedor")}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-teal-500 hover:bg-teal-50"
                  >
                    <span className="block text-lg font-black text-intercap-blue-dark">
                      Vendedor
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-500">
                      Entrar al panel de gestion comercial.
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => enterAs("admin", "/admin")}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-teal-500 hover:bg-teal-50"
                  >
                    <span className="block text-lg font-black text-intercap-blue-dark">
                      Admin
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-slate-500">
                      Entrar al panel de administracion.
                    </span>
                  </button>
                </div>
              </DialogContent>
            </Dialog>
            <Link
              href="/catalogo"
              className="hidden rounded bg-teal-600 px-4 py-2 text-[11px] font-black uppercase tracking-wide text-white transition hover:bg-teal-500 sm:inline-flex"
            >
              Registrarme
            </Link>
          </div>
        </div>

        <nav className="h-10 border-t border-white/10 bg-[#0d1730]">
          <div className="mx-auto flex h-full w-full max-w-[1500px] items-center justify-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
            {navLinks.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex h-10 shrink-0 items-center px-4 text-[11px] font-black uppercase tracking-wide text-white/85 transition hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex h-10 shrink-0 items-center px-4 text-[11px] font-black uppercase tracking-wide text-white/85 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="bg-slate-950">
          <div className="relative h-[calc(100vh-6rem)] min-h-[360px] w-full overflow-hidden bg-slate-950">
            {heroBanners.map((bannerItem, index) => (
              <img
                key={bannerItem.src}
                src={bannerItem.src}
                alt={bannerItem.alt}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                  index === activeBanner ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <Link
              href="/catalogo"
              aria-label="Ver catalogo"
              className="absolute inset-0"
            />

            <button
              type="button"
              aria-label="Banner anterior"
              onClick={goToPreviousBanner}
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              aria-label="Banner siguiente"
              onClick={goToNextBanner}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white transition hover:bg-black/55"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {heroBanners.map((bannerItem, index) => (
                <button
                  key={bannerItem.alt}
                  type="button"
                  aria-label={`Ir al banner ${index + 1}`}
                  onClick={() => setActiveBanner(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeBanner ? "w-8 bg-white" : "w-2.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="quienes-somos" className="scroll-mt-28 mx-auto grid max-w-5xl items-center gap-10 px-5 py-20 md:grid-cols-2">
          <img
            src={portalPreview}
            alt="Portal web Intercap"
            className="h-auto w-full rounded-lg object-cover shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-black text-[#39328b]">Somos el Portal web</h1>
            <p className="mt-5 max-w-md text-sm font-bold leading-7 text-[#51499d]">
              Con el catalogo mas completo del mercado, herramientas de autogestion para
              agilizar los negocios y una experiencia de compra profesional.
            </p>
          </div>
        </section>

        <section className="bg-[#39328b] px-5 py-10 text-center text-white">
          <h2 className="text-xl font-black">
            "Escuchar al cliente para mejorar continuamente"
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-xs font-semibold leading-6 text-white/85">
            En esto se basa nuestra receta, tan simple como infalible. Por esto mas de
            1.500 casas de repuestos de motos de todo el pais nos eligen hace mas de 30 anos.
          </p>
        </section>

        <section id="quiero-ser-cliente" className="scroll-mt-28 mx-auto grid max-w-5xl gap-6 px-5 py-16 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg bg-neutral-950 p-8 text-white shadow-xl">
            <p className="text-[11px] font-black uppercase tracking-[0.35em] text-white/35">
              Duenos de negocios de motopartes
            </p>
            <h2 className="mt-4 text-3xl font-black">Potencien su rentabilidad</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-white/75">
              Registrate hoy y accede a nuestra lista de precios mayorista. Todo lo que tu
              negocio necesita en un solo lugar.
            </p>
            <Link
              href="/home"
              className="mt-8 inline-flex rounded-full bg-blue-600 px-6 py-3 text-xs font-black text-white transition hover:bg-blue-500"
            >
              Quiero ser cliente
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="overflow-hidden rounded-lg bg-neutral-800 text-white shadow-lg">
              <img src={warehouseImage} alt="Gestion comercial" className="h-28 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-black">Pagos y envios</h3>
                <p className="mt-2 text-xs leading-5 text-white/75">
                  Soluciones para cobrar mejor, vender mas y simplificar la gestion.
                </p>
              </div>
            </div>
            <div className="rounded-lg bg-neutral-800 p-5 text-sm font-semibold leading-6 text-white/80">
              Software CRM para sistematizar y mejorar la atencion al cliente.
            </div>
          </div>
        </section>

        <section id="sucursales" className="scroll-mt-28 bg-slate-100 px-5 py-20">
          <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-3">
            <div className="flex justify-center text-[#39328b]">
              <MapPin className="h-40 w-40 stroke-[1.2]" />
            </div>
            <div>
              <h2 className="text-2xl font-black leading-tight text-[#39328b]">
                Centro de distribucion central de 5000 m2 con avanzados sistemas de almacenaje.
              </h2>
              <Link
                href="/home"
                className="mt-6 inline-flex rounded-full bg-blue-600 px-5 py-2 text-xs font-black text-white"
              >
                Conocelo
              </Link>
            </div>
            <div>
              <img src={warehouseImage} alt="Deposito Intercap" className="rounded-lg shadow-md" />
              <p className="mt-5 text-sm font-bold leading-6 text-[#51499d]">
                Cuatro sucursales localizadas estrategicamente para llegar rapidamente a
                cualquier punto del pais.
              </p>
            </div>
          </div>
        </section>

        <section id="forma-parte" className="scroll-mt-28 mx-auto max-w-5xl px-5 py-20">
          <h2 className="text-center text-3xl font-black text-[#39328b]">Nuestros Servicios</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-lg bg-slate-50 p-7 text-center">
                  <Icon className="mx-auto h-10 w-10 text-[#51499d]" />
                  <h3 className="mt-5 text-sm font-black text-[#39328b]">{service.title}</h3>
                  <p className="mt-3 text-xs font-medium leading-5 text-slate-600">{service.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-20 text-center">
          <h2 className="text-sm font-black text-slate-700">Marcas que trabajamos</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-10">
            {brandLogos.map((logo) => (
              <img key={logo} src={logo} alt="Marca" className="max-h-10 max-w-[120px] object-contain" />
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="bg-[#062642] px-5 py-8 text-white">
          <div className="mx-auto grid max-w-5xl gap-6 text-center text-xs font-semibold md:grid-cols-4">
            <span>Estamos cerca tuyo</span>
            <span>Envios rapidos a todo el pais</span>
            <span>Atencion personalizada</span>
            <span>Compra online por autogestion</span>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-8 px-5 py-10 text-sm text-slate-600 md:grid-cols-4">
          <strong className="text-3xl italic text-[#39328b]">INTERCAP</strong>
          <div>
            <h3 className="font-black text-slate-900">Servicio al Cliente</h3>
            <p className="mt-3 leading-7">Envianos un mensaje<br />Bancos<br />Preguntas frecuentes</p>
          </div>
          <div>
            <h3 className="font-black text-slate-900">Mi Cuenta</h3>
            <p className="mt-3 leading-7">Quiero ser cliente<br />Mis compras<br />Autogestion</p>
          </div>
          <div>
            <h3 className="font-black text-slate-900">Contacto</h3>
            <p className="mt-3 leading-7">+54 0810-888-21130<br />info@intercap.com.ar</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
