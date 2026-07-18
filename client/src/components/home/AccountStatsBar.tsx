import { Link } from "wouter";
import { Wallet, ShoppingCart, ClipboardList, CalendarDays } from "lucide-react";

const stats = [
  {
    icon: Wallet,
    label: "Saldo disponible",
    linkText: "Ver más",
    href: "/cuenta",
    value: "$3.862.462,87",
  },
  {
    icon: ShoppingCart,
    label: "Carritos activos",
    linkText: "Ver carrito",
    href: "/carrito",
    value: "3",
  },
  {
    icon: ClipboardList,
    label: "Pedidos pendientes",
    linkText: "Ver pedidos",
    href: "/pedidos",
    value: "8",
  },
  {
    icon: CalendarDays,
    label: "Última compra",
    linkText: "Ver detalle",
    href: "/pedidos/ultimo",
    value: "13/07/2026",
  },
];

export function AccountStatsBar() {
  return (
    <div className="bg-intercap-bg py-3 border-b border-gray-100">
      <div className="mx-auto px-4 max-w-[1500px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 bg-[#111f42] border border-white/10 rounded-xl px-4 max-h-[80px] h-[72px]"
              >
                {/* Icon box */}
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>

                {/* Label + link */}
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-white text-[12px] font-bold leading-tight truncate">
                    {stat.label}
                  </span>
                  <Link
                    href={stat.href}
                    className="text-intercap-blue-main text-[10px] font-semibold hover:underline leading-tight mt-0.5"
                  >
                    {stat.linkText}
                  </Link>
                </div>

                {/* Value */}
                <span className="text-white font-black text-[15px] leading-none text-right flex-shrink-0 ml-auto">
                  {stat.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
