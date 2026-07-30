import { Link } from "wouter";
import { LayoutGrid, ShoppingCart, ClipboardList, Wallet, Banknote, AlertCircle } from "lucide-react";

const items = [
  { icon: LayoutGrid,   label: "Catálogo",          href: "/catalogo" },
  { icon: ShoppingCart, label: "Carrito",            href: "/carrito" },
  { icon: ClipboardList,label: "Pedidos",            href: "/pedidos" },
  { icon: Wallet,       label: "Cuenta Corriente",   href: "/cuenta" },
  { icon: Banknote,     label: "Cobrá con Inpay",    href: "/inpay" },
  { icon: AlertCircle,  label: "Reclamos",           href: "/reclamos" },
];

export function AccountStatsBar() {
  return (
    <div className="bg-intercap-bg py-3 border-b border-gray-100">
      <div className="mx-auto px-4 max-w-[1500px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3 bg-[#111f42] border border-white/10 rounded-xl px-4 h-[72px] max-h-[80px] hover:bg-[#1a2f5e] transition-colors group"
              >
                {/* Icon box */}
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <span className="text-white text-[12px] font-bold leading-tight group-hover:text-intercap-blue-main transition-colors">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
