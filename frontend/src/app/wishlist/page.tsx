"use client";
import ProductCarousel from "@/components/ProductCarousel";
import Image from "next/image";
import { products } from "@/lib/constants";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr";
import { useLogin } from "@/stores/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function WishList() {
  const { toast } = useToast();
  const { data } = useLogin();
  const [postError, setPostError] = useState(false);
  const [postSucceed, setPostSucceed] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetcher = async (url: string) => {
    const response = await axios.get(`${baseUrl}/${url}`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  };
  const {
    data: wishlist,
    error,
    isValidating,
    mutate,
  } = useSWR("wishlists", fetcher);
  const [deleteSucceed, setDeleteSucceed] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const handlePostCart = async (id: number) => {
    try {
      const payload = {
        jumlah: 1,
        produkId: id,
      };
      await axios.post(`${baseUrl}/keranjang`, payload, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      setPostSucceed(true);
    } catch (error) {
      setPostError(true);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/wishlists/${id}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      setDeleteSucceed(true);
      mutate();
    } catch (error) {
      setDeleteError(true);
    }
  };

  useEffect(() => {
    if (postSucceed) {
      toast({
        title: "Success",
        description: "Keranjang ditambahkan!",
      });
    }
    if (postError) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Gagal Menambah Keranjang!",
      });
    }
  }, [postSucceed, postError, toast]);

  useEffect(() => {
    if (deleteSucceed) {
      toast({
        title: "Success",
        description: "Berhasil Dihapus!",
      });
    }
    if (deleteError) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Gagal Hapus Wishlist!",
      });
    }
  }, [deleteSucceed, deleteError, toast]);

  return (
    <>
      <header className="black mt-20 border-y border-black p-4">
        <div className="ml-4 flex items-center">
          <h1 className="text-4xl font-semibold">Wishlist</h1>
        </div>
      </header>
      <section>
        <div className="container mx-auto flex items-center justify-center px-4 py-12 md:px-6 2xl:px-0">
          <div className="flex flex-col items-start justify-start">
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:mt-12 lg:grid-cols-3">
              {isValidating ? (
                <div className="flex w-full space-x-3 lg:w-screen">
                  {[...Array(4)].map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-24 w-32 lg:h-96 lg:w-80"
                    />
                  ))}
                </div>
              ) : wishlist?.length === 0 ? (
                <h1 className="w-full self-start text-center text-2xl">
                  Belum ada produk dalam wishlist anda
                </h1>
              ) : error ? (
                <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
                  <h1 className="text-2xl">Error loading products</h1>
                </div>
              ) : (
                wishlist?.map((product: any) => (
                  <div key={product.id} className="flex flex-col">
                    <div className="relative border border-b-0 border-gray-400">
                      <Image
                        height={500}
                        width={500}
                        className="block"
                        src={product.product.image}
                        alt="Product Image"
                      />
                      <button
                        onClick={() => handleDelete(product.id)}
                        aria-label="close"
                        className="absolute right-4 top-4 bg-gray-800 p-1.5 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-white dark:text-gray-800"
                      >
                        <svg
                          className="fill-current"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 1L1 13"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M1 1L13 13"
                            stroke="currentColor"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="border border-t-0 border-gray-400 p-2">
                      <div className="mt-6 flex flex-col items-start justify-between">
                        <div className="flex items-center justify-center">
                          <Link href={`/catalog/${product.id}`}>
                            <p className="text-2xl font-semibold leading-6 tracking-tight text-gray-800 hover:underline dark:text-white">
                              {product.product.name}
                            </p>
                          </Link>
                        </div>
                        <div className="">
                          <p className="mt-2 text-base font-medium leading-4 tracking-tight text-gray-800 dark:text-white">
                            STOCK {product.product.stock}
                          </p>
                        </div>
                      </div>

                      <div className="mt-12 flex flex-col items-start justify-start">
                        <div className="mt-6">
                          <p className="text-2xl font-medium leading-4 tracking-tight text-gray-800 dark:text-white">
                            {product.product.price.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </p>
                        </div>
                        <div className="mt-10 flex w-full flex-col items-center justify-between space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 xl:space-x-8">
                          <div className="w-full">
                            <button
                              onClick={() => handlePostCart(product.product.id)}
                              className="w-full border border-gray-800 bg-gray-800 py-4 text-lg leading-4 tracking-tight text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="mb-40 border-y border-black p-4 lg:mb-4">
        <h1 className="ml-4 text-4xl font-semibold">RECOMMENDED PRODUCTS</h1>
      </div>
      <section className="body-font my-12 overflow-hidden bg-white text-gray-700">
        <ProductCarousel data={products} />
      </section>
    </>
  );
}
