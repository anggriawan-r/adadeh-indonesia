import ProductCard from "@/components/card/ProductCard";
import HeroSection from "@/components/hero/HeroSection";
import { products, heroes } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24">
      <HeroSection heroes={heroes} />
      <h1 className="my-4 text-3xl font-bold">PRODUK TERBAIK ADADEH</h1>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </main>
  );
}
