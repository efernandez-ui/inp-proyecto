import { Link } from "wouter";

export function CategoryBannerGrid() {
  const categories = [
    {
      title: "CUBIERTAS",
      desc: "Todas las marcas y rodados",
      image: "/images/cubiertas-bg.png",
      color: "from-black/80"
    },
    {
      title: "REPUESTOS",
      desc: "Originales y alternativos",
      image: "/images/repuestos-bg.png",
      color: "from-brand-blue-900/90"
    },
    {
      title: "INDUMENTARIA",
      desc: "Equipamiento para el piloto",
      image: "/images/indumentaria-bg.png",
      color: "from-brand-orange/90"
    },
    {
      title: "LUBRICANTES",
      desc: "Aceites y aditivos",
      image: "/images/lubricantes-bg.png",
      color: "from-gray-900/80"
    }
  ];

  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Link key={idx} href="/catalogo" className="relative h-[200px] rounded-xl overflow-hidden group block shadow-sm">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-black/40 to-transparent opacity-90`} />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-display italic font-bold text-white mb-1 leading-none tracking-wide group-hover:-translate-y-1 transition-transform">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-gray-200 font-medium mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {cat.desc}
                  </p>
                  <span className="inline-block text-xs font-bold text-white uppercase tracking-wider underline decoration-2 underline-offset-4 decoration-transparent group-hover:decoration-brand-orange transition-colors">
                    Ver catálogo &rarr;
                  </span>
                </div>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
