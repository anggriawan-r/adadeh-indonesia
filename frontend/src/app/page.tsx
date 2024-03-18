import ProductCard from "@/components/card/ProductCard";
import { products } from "@/lib/constants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-4 text-3xl font-bold">PRODUK TERBAIK ADADEH</h1>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {products.map((item, index) => (
          <ProductCard key={index} data={item} />
        ))}
      </div>
    </main>
  );
}
