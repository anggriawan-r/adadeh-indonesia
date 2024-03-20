import HeroSection from "@/components/hero/HeroSection";
import ProductCarousel from "@/components/ProductCarousel";
import CategoryCard from "@/components/card/CategoryCard";
import { products, heroes, categories } from "@/lib/constants";

export default function Home() {
  return (
    <main className="my-20 flex min-h-screen flex-col items-center justify-center gap-20">
      <HeroSection heroes={heroes} />

      <section className="grid w-full grid-cols-1 gap-8 px-8 sm:grid-cols-3">
        {categories.map((item, index) => (
          <CategoryCard data={item} key={index} />
        ))}
      </section>

      <section className="w-full">
        <h1 className="mb-4 text-center text-xl font-bold sm:text-3xl">
          PRODUK TERBAIK ADADEH
        </h1>
        <ProductCarousel data={products} />
      </section>
    </main>
  );
}
