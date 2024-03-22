import useSWR from "swr";
import axios from "axios";
import ProductCard from "./card/ProductCard";
import { twJoin } from "tailwind-merge";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const fetcher = async (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await axios.get<{ data: Product[] }>(`${baseUrl}/${url}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export default function CatalogList({ className }: { className?: string }) {
  const { data: products, error, isValidating } = useSWR("products", fetcher);

  if (error)
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <h1 className="text-2xl">Error loading products</h1>
      </div>
    );

  if (!products || isValidating)
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-32 lg:h-80 lg:w-72" />
          ))}
        </div>
      </div>
    );

  return (
    <div className={twJoin("grid grid-cols-2 gap-4 md:grid-cols-3", className)}>
      {products.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </div>
  );
}
