import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarUtils from "./NavbarUtils";
import axios from "axios";
import { categoryType } from "@/type/category";
import NavList from "./NavList";

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
          <NavList categories={categories} />
          {categories && <NavbarUtils navList={categories} />}
        </div>
      </div>
    </header>
  );
}
