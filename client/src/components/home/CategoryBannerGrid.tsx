import { Link } from "wouter";
import catCubiertas from "@/assets/home/cat-cubiertas.png";
import catIndumentaria from "@/assets/home/cat-indumentaria.png";
import catLubricantes from "@/assets/home/cat-lubricantes.png";
import catRepuestos from "@/assets/home/cat-repuestos.png";

export function CategoryBannerGrid() {
  const categories = [
    {
      title: "Cubiertas",
      image: catCubiertas,
      href: "/catalogo?categoria=cubiertas"
    },
    {
      title: "Repuestos",
      image: catRepuestos,
      href: "/catalogo?categoria=repuestos"
    },
    {
      title: "Indumentaria",
      image: catIndumentaria,
      href: "/catalogo?categoria=indumentaria"
    },
    {
      title: "Lubricantes",
      image: catLubricantes,
      href: "/catalogo?categoria=lubricantes"
    }
  ];

  return (
    <section className="py-16 bg-white">
      {/* Max width 1500px, each card 356×220 px → 4×356=1424 + 3×gap */}
      <div className="mx-auto px-4 max-w-[1500px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[25px]">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="rounded-[20px] overflow-hidden group block shadow-md border border-gray-100"
            >
              {/* Fixed aspect ratio 356/220 */}
              <div style={{ aspectRatio: "356 / 220" }} className="w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
