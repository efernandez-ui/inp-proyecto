import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import brandMetzeler from "@/assets/home/brand-metzeler.png";
import brandMotegi from "@/assets/home/brand-motegi.png";
import brandMotul from "@/assets/home/brand-motul.png";
import brandPietcard from "@/assets/home/brand-pietcard.png";
import brandPirelli from "@/assets/home/brand-pirelli.png";
import brandShell from "@/assets/home/brand-shell.png";
import brandSuperhorse from "@/assets/home/brand-superhorse.png";
import brandYamalube from "@/assets/home/brand-yamalube.png";

export function BrandsNewsSection() {
  const brands = [
    { name: "Pirelli", logo: brandPirelli },
    { name: "Metzeler", logo: brandMetzeler },
    { name: "Motul", logo: brandMotul },
    { name: "Motegi", logo: brandMotegi },
    { name: "Super Horse", logo: brandSuperhorse },
    { name: "Yamalube", logo: brandYamalube },
    { name: "Pietcard", logo: brandPietcard },
    { name: "Shell Advance", logo: brandShell },
  ];

  const news = [
    {
      id: 1,
      title: "Nueva lista de precios Pirelli",
      date: "15 Oct 2026",
      desc: "Actualización de precios vigente a partir del próximo mes. Descargá el excel aquí.",
      image: "https://placehold.co/100x100/111/fff?text=Pirelli"
    },
    {
      id: 2,
      title: "Cierre por feriado nacional",
      date: "10 Oct 2026",
      desc: "Informamos que el próximo lunes nuestros depósitos permanecerán cerrados.",
      image: "https://placehold.co/100x100/002855/fff?text=Info"
    },
    {
      id: 3,
      title: "Ingreso de repuestos Honda",
      date: "05 Oct 2026",
      desc: "Gran surtido de repuestos originales y alternativos para líneas Wave y Titan.",
      image: "https://placehold.co/100x100/f58634/fff?text=Honda"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Brands */}
          <div>
            <h3 className="text-2xl font-display font-bold text-brand-blue-900 mb-8 border-l-4 border-gray-400 pl-3">
              MARCAS CON LAS QUE TRABAJAMOS
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {brands.map((brand, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center hover:border-brand-blue-400 hover:shadow-md transition-all cursor-pointer group grayscale hover:grayscale-0">
                  <img src={brand.logo} alt={brand.name} className="max-w-full h-auto opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
            <div className="mt-6 text-center lg:text-left">
              <Link href="/marcas" className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue-600 hover:text-brand-blue-800 transition-colors">
                  VER TODAS LAS MARCAS <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
          </div>

          {/* News */}
          <div>
            <h3 className="text-2xl font-display font-bold text-brand-blue-900 mb-8 border-l-4 border-gray-400 pl-3">
              NOTICIAS COMERCIALES
            </h3>
            <div className="flex flex-col gap-4">
              {news.map(item => (
                <article key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 flex gap-4 hover:shadow-md transition-shadow group">
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded overflow-hidden">
                    <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <span className="text-xs font-bold text-brand-orange uppercase mb-1">{item.date}</span>
                    <h4 className="text-base font-bold text-gray-900 mb-1 leading-tight group-hover:text-brand-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
