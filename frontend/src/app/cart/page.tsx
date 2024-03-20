"use client";

import { Checkbox } from "@/components/ui/checkbox";
import CartItem from "@/components/cart/CartItem";
import { useEffect, useState } from "react";
import ProductCarousel from "@/components/ProductCarousel";
import { products } from "@/lib/constants";

interface CartItem {
  id: number;
  name: string;
  jumlah: number;
  image_url: string;
  harga: number;
  checked: boolean;
}

const getTotalHargaByChecked = (cartItems: CartItem[]): number => {
  const totalHarga = cartItems
    .filter((item) => item.checked)
    .reduce((total, item) => total + item.jumlah * item.harga, 0);
  return totalHarga;
};

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productId: 101,
      name: "Produk Aezakmi jcnruad hesoyam",
      jumlah: 2,
      userId: 1,
      image_url: "https://placeholder.co/200x200",
      harga: 90_000,
      checked: false,
    },
    {
      id: 2,
      productId: 102,
      name: "Produk B",
      jumlah: 6,
      userId: 1,
      image_url: "https://placeholder.co/200x200",
      harga: 120_000,
      checked: false,
    },
    {
      id: 3,
      productId: 103,
      name: "Produk C",
      jumlah: 1,
      userId: 1,
      image_url: "https://placeholder.co/200x200",
      harga: 120_000,
      checked: false,
    },
    {
      id: 4,
      productId: 104,
      name: "Produk D",
      jumlah: 3,
      userId: 1,
      image_url: "https://placeholder.co/200x200",
      harga: 120_000,
      checked: false,
    },
    {
      id: 5,
      productId: 105,
      name: "Produk E",
      jumlah: 5,
      userId: 1,
      image_url: "https://placeholder.co/200x200",
      harga: 120_000,
      checked: false,
    },
  ]);

  const [checkAll, setCheckAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const totalHarga = getTotalHargaByChecked(cartItems);
    setTotalPrice(totalHarga);
  }, [cartItems]);

  const handleCountChange = (id: number, newJumlah: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, jumlah: newJumlah };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleCheckAll = () => {
    const updatedCheckAll = !checkAll;
    setCheckAll(updatedCheckAll);
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      checked: updatedCheckAll,
    }));
    setCartItems(updatedCartItems);
  };

  const handleCheck = (id: any, isChecked: boolean) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, checked: isChecked };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <header className="black mt-20 border-y border-black p-4">
        <div className="ml-4 flex items-center">
          <Checkbox id="checkall" checked={checkAll} onClick={handleCheckAll} />
          <label className="ml-4" htmlFor="checkall">
            <h1 className="text-4xl font-semibold">SHOPPING CART</h1>
          </label>
        </div>
      </header>
      <main className="flex">
        <section className="my-5 w-full lg:w-3/4">
          {cartItems.map((item) => (
            <CartItem
              image_url={item.image_url}
              key={item.id}
              id={item.id}
              name={item.name}
              jumlah={item.jumlah}
              onRemove={handleRemoveItem}
              harga={item.harga}
              checked={item.checked}
              onCheck={(id, isChecked) => handleCheck(id, isChecked)}
              onCount={handleCountChange}
            />
          ))}
        </section>

        <section className="lg:m-5 lg:w-1/4">
          <div className="hidden border border-black p-4 lg:block">
            <h1 className="mb-4 text-xl font-semibold">ORDER SUMMARY</h1>
            <div className="flex justify-between">
              <p>SUBTOTAL</p>
              <span className="font-semibold">
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <p>TAX</p>
              <span className="font-semibold">Rp 10.000</span>
            </div>
            <div className="my-4 border-separate border-b"></div>
            <div className="flex justify-between">
              <p className="font-semibold">TOTAL</p>
              <span className="font-semibold">
                {(totalPrice + 10000).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </span>
            </div>
            <div>
              <button className="my-6 inline-block w-full shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                CHECKOUT
              </button>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 border border-black bg-white p-4 lg:hidden">
            <div className="flex justify-between">
              <p className="font-semibold">TOTAL</p>
              <span className="font-semibold">Rp {totalPrice + 10000}</span>
            </div>
            <div>
              <button className="my-6 inline-block w-full shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black">
                CHECKOUT
              </button>
            </div>
          </div>
        </section>
      </main>

      <div className="mb-40 border-y border-black p-4 lg:mb-4">
        <h1 className="ml-4 text-4xl font-semibold">RECOMMENDED PRODUCTS</h1>
      </div>
      <section className="body-font my-12 overflow-hidden bg-white text-gray-700">
        <ProductCarousel data={products} />
      </section>
    </>
  );
}
