import {
  BookOpen,
  CreditCard,
  Grid2X2,
  Mail,
  Settings,
  ShoppingCart,
  SlidersHorizontal,
  WalletCards,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const sidebarGroups = [
  {
    title: "COMPRAS",
    items: [
      { label: "CATALOGO", icon: BookOpen },
      { label: "CARRITOS", icon: ShoppingCart },
    ],
  },
  {
    title: "CUENTA",
    items: [
      { label: "CUENTA CORRIENTE", icon: WalletCards },
      { label: "COBRA CON INPAY", icon: CreditCard },
    ],
  },
  {
    title: "VENDEDOR",
    items: [
      { label: "PANEL VENDEDOR", icon: Grid2X2 },
      { label: "PARAMETROS", icon: Settings },
      { label: "VENTAS ESPECIALES", icon: SlidersHorizontal },
      { label: "CORREOS NO ENVIADOS", icon: Mail, disabled: true },
    ],
  },
];

const modules = [
  {
    title: "Catalogo",
    text: "Explora productos, precios y stock disponible.",
    icon: BookOpen,
  },
  {
    title: "Carritos",
    text: "Gestiona carritos del cliente seleccionado.",
    icon: ShoppingCart,
    disabled: true,
    badge: "SELECCIONA CLIENTE",
  },
  {
    title: "Cuenta corriente",
    text: "Estado de cuenta del cliente seleccionado.",
    icon: WalletCards,
    disabled: true,
    badge: "SELECCIONA CLIENTE",
  },
  {
    title: "Cobra con INPay",
    text: "Simulador de ventas y coeficientes por terminal.",
    icon: CreditCard,
  },
  {
    title: "Panel vendedor",
    text: "Panel principal de gestion comercial.",
    icon: Grid2X2,
  },
  {
    title: "Parametros",
    text: "Configuracion general de la tienda virtual.",
    icon: Settings,
  },
  {
    title: "Ventas especiales",
    text: "Administra estrategias y campanas especiales.",
    icon: SlidersHorizontal,
  },
  {
    title: "Correos no enviados",
    text: "Revision de correos pendientes de envio.",
    icon: Mail,
    disabled: true,
    badge: "PROXIMAMENTE",
  },
];

export default function SellerHome() {
  return (
    <div className="min-h-screen bg-white pt-24 text-intercap-blue-dark">
      <Header mode="seller" />

      <main className="bg-[#f0f0f0]">
        <div className="flex w-full">
          <aside className="hidden w-56 shrink-0 bg-intercap-blue-dark text-white lg:block">
            <div className="border-b border-white/10 px-5 py-6 text-xl font-black italic">
              PANEL
            </div>
            <div className="p-3">
              <button className="mb-5 flex h-10 w-full items-center gap-3 rounded-md bg-teal-500 px-4 text-left text-xs font-black">
                <Grid2X2 className="h-4 w-4" />
                TODOS LOS MODULOS
              </button>

              {sidebarGroups.map((group) => (
                <section key={group.title} className="border-t border-white/10 py-4">
                  <h2 className="mb-3 px-1 text-[11px] font-black tracking-[0.2em] text-blue-300">
                    {group.title}
                  </h2>
                  <div className="space-y-1">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.label}
                          disabled={item.disabled}
                          className="flex h-9 w-full items-center gap-3 rounded px-2 text-left text-xs font-black text-white/85 disabled:text-white/25"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </aside>

          <section className="min-h-[720px] flex-1 px-5 py-6 md:px-8">
            <div className="bg-white px-6 py-6 shadow-sm">
              <p className="text-[12px] font-black uppercase tracking-[0.32em] text-teal-600">
                Panel de control
              </p>
              <h1 className="mt-2 text-3xl font-black">¡Bienvenido, VENDEDOR!</h1>
              <p className="mt-3 text-sm">
                Tipo: <strong>Vendedor</strong>
                <span className="ml-6">
                  Operando para: <strong>Sin cliente seleccionado</strong>
                </span>
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-slate-500">
                Todos los modulos
              </h2>
              <span className="text-xs font-semibold text-slate-400">8 modulos</span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {modules.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className={`relative min-h-36 border bg-white p-6 shadow-sm ${
                      item.disabled ? "opacity-45" : ""
                    }`}
                  >
                    {item.badge && (
                      <span className="absolute right-5 top-5 rounded bg-slate-100 px-3 py-1 text-[10px] font-black text-slate-400">
                        {item.badge}
                      </span>
                    )}
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-intercap-blue-dark text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 text-base font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                    {!item.disabled && (
                      <button className="mt-4 text-xs font-black uppercase text-teal-600">
                        Abrir
                        <span className="ml-2">›</span>
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
