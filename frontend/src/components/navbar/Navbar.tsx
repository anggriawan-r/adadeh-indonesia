import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarUtils from "./NavbarUtils";
import axios from "axios";
import { categoryType } from "@/type/category";

const getCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      return error;
    }
  }
};

export default async function Navbar() {
  const categories: categoryType[] = await getCategories();

  return (
    <header className="fixed top-0 z-10 flex h-20 w-screen items-center bg-white">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between px-4">
        <Link href="/">
          <div className="relative size-12 md:size-16">
            <Image
              src="/adadeh.svg"
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex h-full gap-8">
          <nav className="hidden h-full items-center gap-8 lg:flex">
            <Link href="/" className="h-full">
              <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
                HOME
                <div className="invisible absolute bottom-0 h-1 w-full bg-black group-hover:visible" />
              </div>
            </Link>
            <Link href="/catalogue" className="h-full">
              <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
                CATALOGUE
                <div className="invisible absolute bottom-0 h-1 w-full bg-black group-hover:visible" />
              </div>
            </Link>
            <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
              CATEGORIES
              <div className="invisible absolute bottom-0 h-1 w-full bg-black group-hover:visible" />
              <ul className="invisible absolute bottom-0 left-0 w-[150px] translate-y-full bg-white shadow-2xl group-hover:visible">
                {categories &&
                  categories.map((item, index) => (
                    <li key={index}>
                      <Link
                        className="inline-block w-full p-4 hover:bg-zinc-200"
                        href="#"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </nav>

          <NavbarUtils navList={categories} />
        </div>
      </div>
    </header>
  );
}
