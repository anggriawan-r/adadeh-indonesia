"use client";

import { Checkbox } from "@/components/ui/checkbox";
import CartItem from "@/components/cart/CartItem";
import { useEffect, useState } from "react";
import ProductCarousel from "@/components/ProductCarousel";
import { products } from "@/lib/constants";
import axios from "axios";
import { useLogin } from "@/stores/useAuth";
import { useRouter } from "next/navigation";
import ProtectedRoutes from "@/components/layouts/ProtectedRoutes";

interface CartItem {
  id: number;
  name: string;
  jumlah: number;
  image_url: string;
  harga: number;
  checked: boolean;
}

interface Cart {
  id: number;
  jumlah: number;
  produk_id: number;
  user_id: number;
}

const getTotalHargaByChecked = (cartItems: CartItem[]): number => {
  const totalHarga = cartItems
    .filter((item) => item.checked)
    .reduce((total, item) => total + item.jumlah * item.harga, 0);
  return totalHarga;
};

function Cart() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkAll, setCheckAll] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useLogin();
  const router = useRouter();

  useEffect(() => {
    const totalHarga = getTotalHargaByChecked(cartItems);
    setTotalPrice(totalHarga);
  }, [cartItems]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseUrl}/user/keranjang`, {
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
        });
        const responseData = response.data.data;

        const transformedData: CartItem[] = responseData.map((item: any) => ({
          id: item.id,
          name: item.produk.name,
          jumlah: item.jumlah,
          image_url: item.produk.image,
          harga: item.produk.price,
          checked: false,
        }));

        setCartItems(transformedData);
        const totalHarga = getTotalHargaByChecked(transformedData);
        setTotalPrice(totalHarga);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    if (data) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCountChange = (id: number, newJumlah: number) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, jumlah: newJumlah };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${baseUrl}/keranjang/${id}`, {
        headers: {
          Authorization: `Bearer ${data?.token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
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

  const handleRemoveItem = async (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    await deleteItem(id);
    setCartItems(updatedCartItems);
  };

  const handleSubmit = async () => {
    const selectedItems = cartItems.filter((item) => item.checked);
    let item_details: any[] = [];
    selectedItems.forEach((item) => {
      const payment = {
        id: item.id,
        user_id: data?.user.id,
        price: item.harga,
        name: item.name,
        quantity: item.jumlah,
        url: item.image_url,
      };
      item_details.push(payment);
    });
    try {
      const payment = {
        jumlah: totalPrice,
        item_details: item_details,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/payments/buy`,
        payment,
        {
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
        },
      );

      item_details.forEach((a) => {
        a.payment_id = response.data.data.id;
        delete a.url;
        delete a.id;
      });

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/histories`,
        item_details,
        {
          headers: {
            Authorization: `Bearer ${data?.token}`,
          },
        },
      );

      router.push("/transaction");
    } catch (error) {
      console.log(error);
    }
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
          {isLoading ? (
            <div className="mt-10 flex justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed dark:border-red-400"></div>
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
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
            ))
          ) : (
            <h1 className="mt-10 text-center text-xl font-semibold">
              Anda belum memiliki produk dalam keranjang
            </h1>
          )}
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
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <p>TAX</p>
              <span className="font-semibold">
                {(0).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div className="my-4 border-separate border-b"></div>
            <div className="flex justify-between">
              <p className="font-semibold">TOTAL</p>
              <span className="font-semibold">
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="my-6 inline-block w-full shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black"
              >
                CHECKOUT
              </button>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 z-10 border border-black bg-white p-4 lg:hidden">
            <div className="flex justify-between">
              <p className="font-semibold">TOTAL</p>
              <span className="font-semibold">
                {totalPrice.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            <div>
              <button
                onClick={handleSubmit}
                className="my-6 inline-block w-full shrink-0 border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black"
              >
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

export default ProtectedRoutes(Cart);
