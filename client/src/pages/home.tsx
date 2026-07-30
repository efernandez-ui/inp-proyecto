import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PRODUCTS } from "@/lib/products";

// Existing Components
import { CategoriesStrip } from "@/components/home/CategoriesStrip";
import { AccountStatsBar } from "@/components/home/AccountStatsBar";

// New Components
import { MainHero } from "@/components/home/MainHero";
import { PromoMosaic } from "@/components/home/PromoMosaic";
import { ProductSection } from "@/components/home/ProductSection";
import { CategoryBannerGrid } from "@/components/home/CategoryBannerGrid";
import { BrandBanner } from "@/components/home/BrandBanner";
import { ActivePools } from "@/components/home/ActivePools";
import { CompactProductSection } from "@/components/home/CompactProductSection";
import { BrandsNewsSection } from "@/components/home/BrandsNewsSection";

export default function Home() {
  // Select data slices for the sections
  const featuredProducts = PRODUCTS.slice(0, 6);
  const bestSellers = PRODUCTS.slice(6, 12);
  const compactProducts = PRODUCTS.slice(12, 20);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans pt-24">
      <Header />
      
      <main className="flex-1">
        
        {/* Categories Strip */}
        <CategoriesStrip />

        {/* Account Stats Bar */}
        <AccountStatsBar />

        {/* Hero Principal */}
        <MainHero />

        {/* Ofertas y Promociones */}
        <PromoMosaic />

        {/* Productos Destacados */}
        <ProductSection 
          title="Productos Destacados" 
          products={featuredProducts} 
          highlightColor="orange"
        />

        {/* Banners de Categorías */}
        <CategoryBannerGrid />

        {/* Más Vendidos */}
        <ProductSection 
          title="Más Vendidos" 
          products={bestSellers} 
          highlightColor="blue"
          showNumbering={true}
        />

        {/* Banner de Marca */}
        <BrandBanner />

        {/* Pools de Compras */}
        <ActivePools />

        {/* Nuevos Ingresos y Lanzamientos */}
        <CompactProductSection products={compactProducts} />

        {/* Marcas y Noticias */}
        <BrandsNewsSection />

      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
