import useSWR from "swr";
import axios from "axios";
import ProductCard from "./card/ProductCard";
import { twJoin } from "tailwind-merge";
import { Skeleton } from "@/components/ui/skeleton";
import { useFilterStore } from "@/stores/useFilter";
import { useEffect, useState } from "react";
import { useLogin } from "@/stores/useAuth";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistItem {
  product_id: number;
}

export default function CatalogList({ className }: { className?: string }) {
  const params = useFilterStore((state) => state);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const productsUrl = `${baseUrl}/products`;
  const wishlistUrl = `${baseUrl}/wishlists`;
  const { data } = useLogin();

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get<{ data: Product[] }>(url, { params });
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  const wishlistFetcher = async (url: string) => {
    try {
      const response = await axios.get<{ data: WishlistItem[] }>(url, {
        headers: { Authorization: `Bearer ${data?.token}` },
      });
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch wishlist data");
    }
  };

  const {
    data: products,
    error,
    isValidating: productsValidating,
    mutate: mutateProducts,
  } = useSWR(productsUrl, fetcher);
  const { data: wishlist, isValidating: wishlistValidating } = useSWR(
    data ? wishlistUrl : null,
    wishlistFetcher,
  );

  const [isLikedMap, setIsLikedMap] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (wishlist && products) {
      const likedMap: { [key: number]: boolean } = {};
      wishlist.forEach((wishlistItem) => {
        likedMap[wishlistItem.product_id] = true;
      });
      setIsLikedMap(likedMap);
    }
  }, [wishlist, products]);

  useEffect(() => {
    mutateProducts();
  }, [params, productsUrl, mutateProducts]);

  if (error)
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <h1 className="text-2xl">Error loading products</h1>
      </div>
    );

  if (productsValidating || wishlistValidating)
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} className="h-24 w-32 lg:h-96 lg:w-80" />
          ))}
        </div>
      </div>
    );

  if (products?.length === 0) {
    return (
      <h1 className="w-full self-start text-center text-2xl">
        Produk tidak ditemukan
      </h1>
    );
  }

  return (
    <div className={twJoin("grid grid-cols-2 gap-4 md:grid-cols-3", className)}>
      {products?.map((item) => (
        <ProductCard
          key={item.id}
          data={item}
          isLiked={isLikedMap[item.id] || false}
        />
      ))}
    </div>
  );
}
