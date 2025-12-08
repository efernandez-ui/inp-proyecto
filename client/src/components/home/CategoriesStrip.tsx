import { Link } from "wouter";
import { Battery, Zap, Cable, Disc, Monitor, Droplet, Cog, Settings, Activity } from "lucide-react";

export function CategoriesStrip() {
  const categories = [
    { name: "Baterias", icon: Battery },
    { name: "Bujias", icon: Zap },
    { name: "Cables", icon: Cable },
    { name: "Camaras", icon: Disc },
    { name: "Cubiertas", icon: Disc },
    { name: "Electronica", icon: Monitor },
    { name: "Lubricantes", icon: Droplet },
    { name: "Partes motor", icon: Cog },
    { name: "Transmision", icon: Settings },
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-3 shadow-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center overflow-x-auto no-scrollbar gap-8 min-w-full">
          {categories.map((cat, idx) => (
            <Link key={idx} href="/catalogo">
              <a className="flex items-center gap-2 group cursor-pointer whitespace-nowrap">
                <cat.icon className="w-5 h-5 text-brand-blue-900" strokeWidth={2} />
                <span className="text-sm font-bold text-brand-blue-900 group-hover:text-brand-blue-600 transition-colors">
                  {cat.name}
                </span>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
