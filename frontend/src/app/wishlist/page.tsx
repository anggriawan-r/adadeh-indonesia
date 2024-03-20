import ProductCarousel from "@/components/ProductCarousel";
import Image from "next/image";
import { products } from "@/lib/constants";
import Link from "next/link";

export default function WishList() {
  const wishlist = [
    {
      id: 1,
      name: "SEPATU NMD S1",
      stock: 190,
      price: 1_200_000,
      imageSrc:
        "https://www.adidas.co.id/media/catalog/product/h/q/hq4451_2_footwear_photography_side20lateral20view_grey.jpg",
    },
    {
      id: 2,
      name: "SEPATU NMD S1",
      stock: 190,
      price: 1_200_000,
      imageSrc:
        "https://www.adidas.co.id/media/catalog/product/h/q/hq4451_2_footwear_photography_side20lateral20view_grey.jpg",
    },
    {
      id: 3,
      name: "SEPATU NMD S1",
      stock: 190,
      price: 1_200_000,
      imageSrc:
        "https://www.adidas.co.id/media/catalog/product/h/q/hq4451_2_footwear_photography_side20lateral20view_grey.jpg",
    },
    {
      id: 4,
      name: "SEPATU NMD S1",
      stock: 190,
      price: 1_200_000,
      imageSrc:
        "https://www.adidas.co.id/media/catalog/product/h/q/hq4451_2_footwear_photography_side20lateral20view_grey.jpg",
    },
    {
      id: 5,
      name: "SEPATU NMD S1",
      stock: 190,
      price: 1_200_000,
      imageSrc:
        "https://www.adidas.co.id/media/catalog/product/h/q/hq4451_2_footwear_photography_side20lateral20view_grey.jpg",
    },
    {
      id: 6,
      name: "SEPATU NMD S1",
      stock: 190,
      price: 1_200_000,
      imageSrc:
        "https://www.adidas.co.id/media/catalog/product/h/q/hq4451_2_footwear_photography_side20lateral20view_grey.jpg",
    },
  ];

  return (
    <>
      <header className="black mt-20 border-y border-black p-4">
        <div className="ml-4 flex items-center">
          <h1 className="text-4xl font-semibold">Wishlist</h1>
        </div>
      </header>
      <section>
        <div className="container mx-auto flex items-center justify-center px-4 py-12 md:px-6 2xl:px-0">
          <div className="jusitfy-start flex flex-col items-start">
            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:mt-12 lg:grid-cols-3">
              {wishlist.map((product) => (
                <div key={product.id} className="flex flex-col">
                  <div className="relative border border-b-0 border-gray-400">
                    <Image
                      height={500}
                      width={500}
                      className="block"
                      src={product.imageSrc}
                      alt="Product Image"
                    />
                    <button
                      aria-label="close"
                      className="absolute right-4 top-4 bg-gray-800 p-1.5 text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-white dark:text-gray-800"
                    >
                      <svg
                        className="fil-current"
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
                            {product.name}
                          </p>
                        </Link>
                      </div>
                      <div className="">
                        <p className="mt-2 text-base font-medium leading-4 tracking-tight text-gray-800 dark:text-white">
                          STOCK {product.stock}
                        </p>
                      </div>
                    </div>

                    <div className="jusitfy-start mt-12 flex flex-col items-start">
                      <div className="mt-6">
                        <p className="text-2xl font-medium leading-4 tracking-tight text-gray-800 dark:text-white">
                          {product.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </p>
                      </div>
                      <div className="jusitfy-between mt-10 flex w-full flex-col items-center space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 xl:space-x-8">
                        <div className="w-full">
                          <button className="w-full border border-gray-800 bg-gray-800 py-4 text-lg leading-4 tracking-tight text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white">
                            Add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
