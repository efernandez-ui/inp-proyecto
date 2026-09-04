import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Facebook,
  Headphones,
  Instagram,
  Linkedin,
  MapPin,
  Search,
  Truck,
  WalletCards,
  Youtube,
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
import heroIntroVideo from "@assets/00_Video.mp4";
import intercapLogo from "@assets/intercap-logo-blanco.png";
import portalPreview from "@assets/PortalWeb.webp";
import posnetImage from "@assets/Posnet.webp";
import distributionCenterImage from "@assets/CDistribucion.webp";
import mapImage from "@assets/mapa.webp";
import zonesImage from "@assets/zonas.webp";
import warehouseImage from "@assets/image_1767978864290.png";
import serviceCatalogIcon from "@assets/Iconos-03.png";
import serviceSalesIcon from "@assets/Iconos-04.png";
import serviceSupportIcon from "@assets/Iconos-05.png";
import serviceInpayIcon from "@assets/Iconos-06.png";
import serviceExclusiveIcon from "@assets/Iconos-07.png";
import serviceProductsIcon from "@assets/Iconos-08.png";
import serviceLogisticsIcon from "@assets/Iconos-09.png";
import serviceSelfManagementIcon from "@assets/Iconos-10.png";
import motulLogo from "@assets/Logos_Marcas-05_1785501128944.png";
import ngkLogo from "@assets/Logos_Marcas-06_1785501128944.png";
import pirelliLogo from "@assets/Logos_Marcas-07_1785501128944.png";
import motegLogo from "@assets/Logos_Marcas-02_1785501128944.png";
import pietcardLogo from "@assets/Logos_Marcas-11_1785501128945.png";

const services = [
  {
    title: "Catalogo",
    text: "Nuestro catalogo en tu comercio, una manera de tener acceso a todos los productos.",
    icon: serviceCatalogIcon,
  },
  {
    title: "Equipo de ventas",
    text: "Contamos con un equipo de venta especialmente capacitado para asesorarlo en todo lo que usted necesite.",
    icon: serviceSalesIcon,
  },
  {
    title: "SAI Intercap",
    text: "Un equipo preparado para brindar asesoramiento, dar respuestas y soluciones via telefonica, chat y whatsapp.",
    icon: serviceSupportIcon,
  },
  {
    title: "INPay",
    text: "Servicio completo para que puedan realizar cobros con tarjetas en sus mostradores bajando cargas financieras y administrativas.",
    icon: serviceInpayIcon,
  },
  {
    title: "Representacion exclusiva",
    text: "Somos Distribuidores oficiales de PIRELLI, EUROGRIP, VEDAMOTORS en argentina.",
    icon: serviceExclusiveIcon,
  },
  {
    title: "Variedad de productos",
    text: "Contamos con mas de 33.000 articulos.",
    icon: serviceProductsIcon,
  },
  {
    title: "Logistica",
    text: "Cumpliendo en tiempo y forma todas las entregas del dia a dia brindando la tranquilidad que el cliente necesita.",
    icon: serviceLogisticsIcon,
  },
  {
    title: "Autogestion 24/7",
    text: "Hace tus pedidos, descarga facturas y controla tu cuenta corriente desde nuestra plataforma online, a cualquier hora.",
    icon: serviceSelfManagementIcon,
  },
];

const brandLogos = [motegLogo, motulLogo, ngkLogo, pietcardLogo, pirelliLogo];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/intercapsrl/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/intercapsrl/", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/intercap-s-r-l", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@intercapsrl", icon: Youtube },
];

const heroBanners = [
  { type: "video", src: heroIntroVideo, alt: "Video institucional Intercap" },
  { type: "image", src: eurogripBanner, alt: "Eurogrip, the bike tyre specialist" },
  { type: "image", src: pirelliBanner, alt: "Pirelli, desarrollado para rendir" },
  { type: "image", src: kendaBanner, alt: "Kenda, built for performance" },
  { type: "image", src: motulBanner, alt: "Motul lubricantes para motos" },
  { type: "image", src: ngkBanner, alt: "NGK spark plugs" },
];

const branches = [
  {
    name: "Reconquista",
    type: "Administracion Central",
    address: 'Belgrano 777 Dpto. "D" (S3560AXO) - Reconquista - Santa Fe',
    phone: "03482 421130 421123",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Belgrano%20777%2C%20Reconquista%2C%20Santa%20Fe",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13938.647244375865!2d-59.646212!3d-29.1451639!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xe8f65a18dc9c8547!2sIntercap+S.R.L+-+Casa+Central!5e0!3m2!1ses-419!2sar!4v1539381516854",
  },
  {
    name: "Buenos Aires",
    type: "Centro de Distribucion",
    address: "Lagos Garcia 4470 - B1839 9 de Abril - Buenos Aires",
    phone: "11-4357-2232/33",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Lagos%20Garcia%204470%2C%209%20de%20Abril%2C%20Buenos%20Aires",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13110.03279340287!2d-58.4804526!3d-34.7679796!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcd17940c9363d%3A0x665e4885122d29e3!2sIntercap+S.R.L+-+Centro+de+distribuci%C3%B3n!5e0!3m2!1ses!2sar!4v1694433107351!5m2!1ses!2sar",
  },
  {
    name: "Tucuman",
    type: "Almacen",
    address: "Mendoza 2050 (T4000DBP) - S.M. de Tucuman - Tucuman",
    phone: "0381 4238888 / 4326007",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Mendoza%202050%2C%20San%20Miguel%20de%20Tucuman%2C%20Tucuman",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14242.098596539192!2d-65.2276839!3d-26.8232604!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcb278c221a7a5ede!2sIntercap+S.R.L+-+Deposito+Tucuman!5e0!3m2!1ses-419!2sar!4v1539382457490",
  },
  {
    name: "Resistencia",
    type: "Almacen",
    address: "Santa Maria de Oro 778 (H3500BKP) - Resistencia - Chaco",
    phone: "0362 4421130 / 4425777",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Santa%20Maria%20de%20Oro%20778%2C%20Resistencia%2C%20Chaco",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14161.646031947435!2d-58.9942369!3d-27.4564454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x65a0928ee0f4ec2!2sIntercap+S.R.L+-+Deposito+Resistencia!5e0!3m2!1ses-419!2sar!4v1539382262265",
  },
  {
    name: "Mendoza",
    type: "Almacen",
    address: "Adolfo Calle 470 (M5526BDJ) - Dorrego, Guaymallen - Mendoza",
    phone: "0261 8018005",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Adolfo%20Calle%20470%2C%20Guaymallen%2C%20Mendoza",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13399.758273918875!2d-68.83084!3d-32.899766!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb6f70603b9a6ccd3!2sIntercap+S.R.L+-+Deposito+Mendoza!5e0!3m2!1ses-419!2sar!4v1539381882515",
  },
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
          <div className="mx-auto flex h-full w-full max-w-[1500px] items-center justify-start gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:px-6 [&::-webkit-scrollbar]:hidden">
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
              bannerItem.type === "video" ? (
                <video
                  key={bannerItem.src}
                  src={bannerItem.src}
                  aria-label={bannerItem.alt}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                    index === activeBanner ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <img
                  key={bannerItem.src}
                  src={bannerItem.src}
                  alt={bannerItem.alt}
                  className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
                    index === activeBanner ? "opacity-100" : "opacity-0"
                  }`}
                />
              )
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

        <section id="quiero-ser-cliente" className="scroll-mt-28 mx-auto grid max-w-[1500px] gap-6 px-5 py-16 md:grid-cols-[0.95fr_1.05fr]">
          <div className="flex min-h-[420px] flex-col justify-center rounded-lg bg-[#39328b] px-10 py-12 text-white md:px-12">
            <p className="text-sm font-black uppercase leading-5">
              Duenos de negocios de motopartes:
            </p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight">
              Potencien su rentabilidad
            </h2>
            <p className="mt-6 max-w-xl text-lg font-medium leading-6 text-white/95">
              Registrate hoy y desbloquea nuestra lista de precios mayorista.
              <br />
              Todo lo que tu negocio necesita en un solo lugar: desde transmision
              y frenos hasta accesorios de alta rotacion.
            </p>
            <p className="mt-7 max-w-lg text-base font-medium leading-7 text-white/95">
              - Stock permanente y envios a todo el pais.
              <br />
              - Distribuidor Mayorista Integral.
              <br />
              - Expertos en el rubro abasteciendo al pais desde 1991.
            </p>
            <Link
              href="/home"
              className="mt-12 inline-flex w-fit rounded-full bg-blue-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-blue-500"
            >
              Quiero ser cliente
            </Link>
          </div>

          <div className="grid gap-6">
            <div className="grid overflow-hidden rounded-lg bg-[#39328b] text-white md:grid-cols-[0.85fr_1.15fr]">
              <img
                src={posnetImage}
                alt="Cobro con posnet"
                className="h-56 w-full object-cover md:h-full"
              />
              <div className="flex min-h-[210px] flex-col justify-center p-7">
                <h3 className="text-3xl font-black leading-9">
                  Soluciones de pagos y envios para nuestros clientes
                </h3>
                <p className="mt-1 text-xl font-medium leading-6 text-white/95">
                  Brindamos un servicio completo para que puedan realizar cobros
                  con tarjetas en sus mostradores bajando cargas financieras y
                  administrativas.
                </p>
              </div>
            </div>
            <div className="flex min-h-[180px] items-center rounded-lg bg-[#39328b] px-10 py-9 text-2xl font-medium leading-8 text-white">
              Software CRM para sistematizar y mejorar la atencion a los clientes.
            </div>
          </div>
        </section>

        <section id="sucursales" className="scroll-mt-28 bg-[#f3f4f6] px-5 py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1fr_1.15fr]">
            <div className="flex justify-center lg:justify-start">
              <img
                src={mapImage}
                alt="Mapa de cobertura Intercap"
                className="h-auto max-h-[540px] w-auto max-w-full object-contain"
              />
            </div>

            <div className="flex flex-col items-start">
              <h2 className="max-w-md text-3xl font-black leading-tight text-[#39328b]">
                Centro de distribucion central de 5000 m2 con avanzados sistemas
                de almacenaje.
              </h2>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="mt-8 inline-flex rounded-full bg-blue-600 px-8 py-3 text-base font-medium text-white transition hover:bg-blue-500"
                  >
                    Conocelo
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl rounded-lg border-0 bg-neutral-950 p-0 shadow-2xl">
                  <DialogHeader className="sr-only">
                    <DialogTitle>Centro de distribucion Intercap</DialogTitle>
                    <DialogDescription>
                      Video del centro de distribucion Intercap.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
                    <iframe
                      src="https://www.youtube.com/embed/eqssV1NLnzk?si=bx6SblMaiINXj3-q"
                      title="Centro de distribucion Intercap"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <img
                src={zonesImage}
                alt="Cuatro zonas comerciales"
                className="mt-8 h-auto w-full max-w-[300px] object-contain"
              />
            </div>

            <div className="flex flex-col items-start">
              <img
                src={distributionCenterImage}
                alt="Centro de distribucion Intercap"
                className="h-auto w-full rounded-lg object-cover shadow-lg"
              />
              <p className="mt-8 max-w-md text-xl font-medium leading-7 text-[#19118a]">
                Cuatro sucursales localizadas estrategicamente para llegar
                rapidamente a cualquier punto del pais.
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="mt-5 inline-flex rounded-full bg-blue-600 px-8 py-3 text-base font-medium text-white transition hover:bg-blue-500"
                  >
                    Ver sucursales
                  </button>
                </DialogTrigger>
                <DialogContent className="max-h-[94vh] max-w-[1500px] overflow-hidden rounded-lg border-0 bg-white p-0 shadow-2xl">
                  <DialogHeader className="border-b border-[#39328b]/20 px-6 py-4 text-left">
                    <DialogTitle className="text-3xl font-black text-[#39328b]">
                      Sucursales
                    </DialogTitle>
                    <DialogDescription className="text-base font-medium text-[#51499d]">
                      Almacenes ubicados en zonas estrategicas para llegar a todo el pais.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-5 overflow-y-auto p-5 lg:overflow-visible">
                    <div className="grid gap-5 lg:grid-cols-2">
                      {branches.slice(0, 2).map((branch) => (
                        <article
                          key={branch.name}
                          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                        >
                          <div className="h-[180px] bg-slate-100">
                            <iframe
                              src={branch.mapSrc}
                              title={`Mapa de ${branch.name}`}
                              className="h-full w-full border-0"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              allowFullScreen
                            />
                          </div>
                          <div className="flex items-end justify-between gap-4 p-4">
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                                {branch.type}
                              </p>
                              <h3 className="mt-1 text-xl font-black text-[#39328b]">
                                {branch.name}
                              </h3>
                              <p className="mt-2 text-sm font-semibold leading-5 text-slate-700">
                                {branch.address}
                              </p>
                              <p className="mt-2 text-sm font-bold text-slate-900">
                                Tel.: {branch.phone}
                              </p>
                            </div>
                            <a
                              href={branch.directionsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-blue-600 px-5 text-xs font-black uppercase text-white transition hover:bg-blue-500"
                            >
                              ¿Como Llegar?
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                      {branches.slice(2).map((branch) => (
                        <article
                          key={branch.name}
                          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                        >
                          <div className="h-[150px] bg-slate-100">
                            <iframe
                              src={branch.mapSrc}
                              title={`Mapa de ${branch.name}`}
                              className="h-full w-full border-0"
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              allowFullScreen
                            />
                          </div>
                          <div className="flex items-end justify-between gap-3 p-4">
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-600">
                                {branch.type}
                              </p>
                              <h3 className="mt-1 text-lg font-black text-[#39328b]">
                                {branch.name}
                              </h3>
                              <p className="mt-2 text-xs font-semibold leading-5 text-slate-700">
                                {branch.address}
                              </p>
                              <p className="mt-2 text-xs font-bold text-slate-900">
                                Tel.: {branch.phone}
                              </p>
                            </div>
                            <a
                              href={branch.directionsUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-blue-600 px-4 text-[11px] font-black uppercase text-white transition hover:bg-blue-500"
                            >
                              ¿Como Llegar?
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        <section id="forma-parte" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-center text-4xl font-black text-[#39328b]">Nuestros Servicios</h2>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex min-h-[355px] flex-col items-center rounded-lg bg-slate-50 px-8 py-9 text-center"
              >
                <img
                  src={service.icon}
                  alt=""
                  className="h-16 w-16 object-contain"
                  aria-hidden="true"
                />
                <h3 className="mt-7 text-lg font-black leading-7 text-[#19118a]">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm font-medium leading-5 text-slate-700">
                  {service.text}
                </p>
              </article>
            ))}
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
        <div className="bg-[#062642] px-5 py-10 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Estamos cerca tuyo</h3>
                <p className="mt-2 max-w-[230px] text-xs font-medium leading-5">
                  Depositos en Buenos Aires, Tucuman, Resistencia y Mendoza
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Envios rapidos a todo el pais</h3>
                <p className="mt-2 text-xs font-medium leading-5">
                  Ahorrando en cada compra
                </p>
              </div>
              <div className="flex flex-col items-center">
                <Headphones className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Atencion personalizada</h3>
                <p className="mt-2 text-xs font-medium leading-5">
                  Asesor comercial y servicio al cliente
                </p>
              </div>
              <div className="flex flex-col items-center">
                <WalletCards className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Ahorra tiempo con autogestion</h3>
                <p className="mt-2 text-xs font-medium leading-5">
                  Cuenta corriente y pedidos online
                </p>
              </div>
            </div>

            <div className="mt-14 flex flex-col gap-4 text-xs font-black md:flex-row md:items-center md:justify-between">
              <p>
                Desde el ano 1991 somos expertos en el negocio de repuestos y accesorios para motos
              </p>
              <a href="#quienes-somos" className="text-white transition hover:text-white/75">
                Conoce mas de nosotros
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 text-sm text-[#062642] md:grid-cols-[1.35fr_1.1fr_1fr_1fr_1.1fr]">
          <img
            src={intercapLogo}
            alt="Intercap"
            className="h-7 w-auto brightness-0 saturate-100 [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(42%)_saturate(2384%)_hue-rotate(232deg)_brightness(93%)_contrast(95%)]"
          />
          <div>
            <h3 className="font-black text-black">Servicio al Cliente</h3>
            <ul className="mt-4 space-y-3">
              <li>Envianos un mensaje</li>
              <li>Bancos</li>
              <li>Noticias</li>
              <li>Tasas</li>
              <li>Preguntas Frecuentes</li>
              <li>Terminos y Condiciones</li>
              <li>Politicas de Privacidad</li>
              <li>Defensa del Consumidor</li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-black">Mi Cuenta</h3>
            <ul className="mt-4 space-y-3">
              <li>Quiero ser Cliente</li>
              <li>Forma Parte</li>
              <li>Mis Compras</li>
              <li>Autogestion</li>
              <li>Cuenta Corriente</li>
              <li>Informar un Pago</li>
              <li>Mis Carritos</li>
              <li>Consultas y Reclamos</li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-black">Nosotros</h3>
            <ul className="mt-4 space-y-3">
              <li>Sobre Nosotros</li>
              <li>Sucursales</li>
            </ul>
          </div>
          <div>
            <h3 className="font-black text-black">Contacto</h3>
            <p className="mt-4 leading-6">
              +54 0810-888-21130
              <br />
              info@intercap.com.ar
            </p>
            <p className="mt-4 text-[11px] leading-5 sm:text-xs">
              <span className="whitespace-nowrap">Lunes a Viernes: 08:00 a 17:00 hs</span>
              <br />
              <span className="whitespace-nowrap">Sabados: 09:00 a 12:00 hs</span>
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#39328b] text-white transition hover:bg-blue-600"
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.2} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
