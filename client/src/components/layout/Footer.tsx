import { Facebook, Headphones, Instagram, Linkedin, MapPin, Truck, WalletCards, Youtube } from "lucide-react";
import { Link } from "wouter";
import intercapLogo from "@assets/intercap-logo-blanco.png";

type FooterVariant = "landing" | "portal";

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/intercapsrl/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/intercapsrl/", icon: Facebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/intercap-s-r-l", icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/@intercapsrl", icon: Youtube },
];

const landingUserLinks = [
  { label: "Acceso clientes", href: "/home" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Solicitud de cliente", href: "#quiero-ser-cliente" },
  { label: "Formá parte", href: "https://www.intercap.com.ar/TiendaVirtual/forma-parte;jsessionid=0f54a49cd6f6af23cb237ea377bc" },
  { label: "Bancos", href: "#" },
];

const portalUserLinks = [
  { label: "Mi cuenta", href: "/home" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Mis carritos", href: "#" },
  { label: "Pedidos", href: "#" },
  { label: "Cuenta corriente", href: "#" },
  { label: "Informar un pago", href: "#" },
  { label: "Consultas y reclamos", href: "#" },
];

const landingInfoLinks = ["Sobre nosotros", "Sucursales", "Preguntas frecuentes", "Información útil", "Ayuda"];
const portalInfoLinks = ["Sobre nosotros", "Sucursales", "Cobrá con Inpay", "Bancos", "Preguntas frecuentes", "Información útil", "Ayuda"];

function FooterLink({ label, href }: { label: string; href: string }) {
  const className = "block w-fit transition hover:text-blue-600 hover:underline";
  if (href.startsWith("http") || href.startsWith("#")) return <a className={className} href={href}>{label}</a>;
  return <Link className={className} href={href}>{label}</Link>;
}

export function Footer({ variant = "portal" }: { variant?: FooterVariant }) {
  const isLanding = variant === "landing";
  const userLinks = isLanding ? landingUserLinks : portalUserLinks;
  const infoLinks = isLanding ? landingInfoLinks : portalInfoLinks;

  return (
    <footer className="border-t border-slate-200 bg-white text-[#062642]">
      {isLanding && (
        <section className="bg-[#062642] px-5 py-10 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center">
                <MapPin className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Estamos cerca tuyo</h3>
                <p className="mt-2 max-w-[230px] text-xs font-medium leading-5">Depósitos en Buenos Aires, Tucumán, Resistencia y Mendoza</p>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Envíos rápidos a todo el país</h3>
                <p className="mt-2 max-w-[230px] text-xs font-medium leading-5">Ahorrando en cada compra</p>
              </div>
              <div className="flex flex-col items-center">
                <Headphones className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Atención personalizada</h3>
                <p className="mt-2 max-w-[230px] text-xs font-medium leading-5">Asesor comercial y servicio al cliente</p>
              </div>
              <div className="flex flex-col items-center">
                <WalletCards className="h-6 w-6" strokeWidth={2.2} />
                <h3 className="mt-3 text-sm font-black">Ahorrá tiempo con autogestión</h3>
                <p className="mt-2 max-w-[230px] text-xs font-medium leading-5">Cuenta corriente y pedidos online</p>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 text-center text-xs font-black md:flex-row md:items-center md:justify-between md:text-left">
              <p>Desde el año 1991 somos expertos en el negocio de repuestos y accesorios para motos</p>
              <a href="http://192.168.0.205:3000/info/quienes-somos" className="inline-flex items-center justify-center rounded-full bg-sky-400 px-6 py-3 text-white transition hover:bg-sky-300">
                Conocé más de nosotros
              </a>
            </div>
          </div>
        </section>
      )}
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.35fr] lg:gap-12">
        <div className="pt-1">
          <img src={intercapLogo} alt="Intercap" className="h-8 w-auto [filter:brightness(0)_saturate(100%)_invert(18%)_sepia(42%)_saturate(2384%)_hue-rotate(232deg)_brightness(93%)_contrast(95%)]" />
        </div>
        <div>
          <h3 className="text-xl font-medium text-[#39328b]">Usuarios</h3>
          <ul className="mt-3 space-y-1 text-sm leading-5">
            {userLinks.map((link) => <li key={link.label}><FooterLink {...link} /></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium text-[#39328b]">Información</h3>
          <ul className="mt-3 space-y-1 text-sm leading-5">
            {infoLinks.map((label) => <li key={label}><a className="block w-fit transition hover:text-blue-600 hover:underline" href="#">{label}</a></li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-medium text-[#39328b]">Hablá con nosotros</h3>
          <div className="mt-3 text-sm leading-5">
            <a className="block w-fit transition hover:text-blue-600 hover:underline" href="mailto:info@intercap.com.ar">Contacto</a>
            <a className="block w-fit transition hover:text-blue-600 hover:underline" href="tel:+54081088821130">+54 0810-888-21130</a>
            <a className="block w-fit transition hover:text-blue-600 hover:underline" href="mailto:info@intercap.com.ar">info@intercap.com.ar</a>
          </div>
          <p className="mt-6 text-sm leading-5">Lunes a Viernes: 08:00 a 17:00 hs<br />Sábados: 09:00 a 12:00 hs</p>
          <p className="mt-5 text-sm">Seguinos en redes</p>
          <div className="mt-3 flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#39328b] text-white transition hover:bg-blue-600"><Icon className="h-4 w-4" strokeWidth={2.2} /></a>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
