import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import heroSlide1 from "@/assets/home/hero-slide-1.png";
import heroSlide2 from "@/assets/home/hero-slide-2.png";
import heroSlide3 from "@/assets/home/hero-slide-3.png";
import heroSlideMobile1 from "@/assets/home/hero-slide-mobile-1.png";
import heroSlideMobile2 from "@/assets/home/hero-slide-mobile-2.png";
import heroSlideMobile3 from "@/assets/home/hero-slide-mobile-3.png";

const slides = [
  {
    desktop: heroSlide1,
    mobile: heroSlideMobile1,
    alt: "Eurogrip Trailhound STR - Nuevo Ingreso",
    href: "/catalogo",
  },
  {
    desktop: heroSlide2,
    mobile: heroSlideMobile2,
    alt: "Pirelli Diablo Rosso IV - Domina cada curva",
    href: "/catalogo",
  },
  {
    desktop: heroSlide3,
    mobile: heroSlideMobile3,
    alt: "Repuestos que mueven tu moto",
    href: "/catalogo",
  },
];

export function MainHero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const goTo = (idx: number) => setCurrent(idx);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      {/* Slides */}
      <div className="relative w-full">
        {slides.map((slide, idx) => (
          <Link
            key={idx}
            href={slide.href}
            className={`block w-full transition-opacity duration-700 ${
              idx === current ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            aria-hidden={idx !== current}
          >
            {/* Desktop image */}
            <img
              src={slide.desktop}
              alt={slide.alt}
              className="hidden sm:block w-full h-auto object-contain"
              draggable={false}
            />
            {/* Mobile image */}
            <img
              src={slide.mobile}
              alt={slide.alt}
              className="block sm:hidden w-full h-auto object-contain"
              draggable={false}
            />
          </Link>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? "w-8 bg-brand-orange"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
