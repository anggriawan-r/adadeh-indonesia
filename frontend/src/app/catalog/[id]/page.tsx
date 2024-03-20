import Image from "next/image";
import { products } from "@/lib/constants";
import ProductCarousel from "@/components/ProductCarousel";

const ProductDetail = () => {
  return (
    <>
      <header className="black mt-20 border-y border-black p-4">
        <div className="ml-4 flex items-center">
          <h1 className="text-4xl font-semibold">Product Detail</h1>
        </div>
      </header>
      <section className="body-font mt-12 overflow-hidden bg-white text-gray-700">
        <div className="container mx-auto px-5 lg:py-24">
          <div className="mx-auto flex flex-wrap lg:w-4/5">
            <Image
              width={1000}
              height={1000}
              alt="ecommerce"
              className="w-full transform-gpu overflow-hidden rounded border border-gray-200 object-cover object-center transition-transform duration-300 hover:scale-110 lg:w-1/2"
              src="https://www.adidas.co.id/media/catalog/product/i/f/if3219_lscl_ecom.jpg"
            />

            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10">
              <h2 className="title-font text-sm tracking-widest text-gray-500">
                SEPATU RUNNING
              </h2>
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                YEZZY 500 STONE TAUPE
              </h1>
              <div className="mb-4 flex">
                <span className="flex items-center">
                  <span className="text-gray-600">STOCK</span>
                </span>
                <span className="ml-1 text-gray-600">129</span>
              </div>
              <p className="leading-relaxed">
                Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
                seitan poutine tumeric. Gastropub blue bottle austin listicle
                pour-over, neutra jean shorts keytar banjo tattooed umami
                cardigan.
              </p>
              <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-200 pb-5"></div>
              <div className="flex">
                <span className="title-font text-2xl font-medium text-gray-900">
                  $58.00
                </span>
                <button className="ml-auto inline-block shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                  ADD TO CART
                </button>
                <button className="ml-4 inline-flex h-12 w-12 items-center justify-center border border-black bg-black p-0 text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <header className="black mt-20 border-y border-black p-4">
        <div className="ml-4 flex items-center">
          <h1 className="text-4xl font-semibold">RECOMMENDED PRODUCTS</h1>
        </div>
      </header>
      <section className="body-font my-12 overflow-hidden bg-white text-gray-700">
        <ProductCarousel data={products} />
      </section>
    </>
  );
};

export default ProductDetail;
