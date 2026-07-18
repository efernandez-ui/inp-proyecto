import { Link } from "wouter";

export function CategoryBannerGrid() {
  const categories = [
    {
      title: "Cubiertas",
      image: "/images/cat-cubiertas.png",
      href: "/catalogo?categoria=cubiertas"
    },
    {
      title: "Repuestos",
      image: "/images/cat-repuestos.png",
      href: "/catalogo?categoria=repuestos"
    },
    {
      title: "Indumentaria",
      image: "/images/cat-indumentaria.png",
      href: "/catalogo?categoria=indumentaria"
    },
    {
      title: "Lubricantes",
      image: "/images/cat-lubricantes.png",
      href: "/catalogo?categoria=lubricantes"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="rounded-[20px] overflow-hidden group block shadow-md border border-gray-100"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
