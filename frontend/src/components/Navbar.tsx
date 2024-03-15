import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const nav = ["PRIA", "WANITA", "ANAK", "OLAHRAGA", "BRANDS"];

export default function Navbar() {
  return (
    <header className="fixed top-0 z-20 flex h-20 w-full items-center bg-white">
      <div className="mx-auto flex h-full w-full max-w-screen-xl items-center justify-between">
        <div className="relative size-16">
          <Image src="adadeh.svg" alt="logo" fill className="object-contain" />
        </div>
        <nav className="flex h-full items-center gap-8">
          {nav.map((item, index) => (
            <Link key={index} href="#" className="h-full">
              <div className="group relative flex h-full cursor-pointer items-center text-sm font-bold text-slate-700">
                {item}
                <div className="invisible absolute bottom-0 h-1 w-full bg-zinc-900 group-hover:visible" />
              </div>
            </Link>
          ))}
        </nav>
        <div className="flex gap-3">
          <div>
            <Input
              type="text"
              className="rounded-full"
              placeholder="Search our products"
            />
          </div>
          <button
            type="submit"
            className="flex size-10 items-center justify-center rounded-[50%] bg-zinc-200 transition-colors hover:bg-zinc-300"
          >
            <IoSearch className="text-xl text-zinc-900" />
          </button>
          <button className="flex size-10 items-center justify-center rounded-[50%] bg-zinc-900 transition-colors hover:bg-zinc-700">
            <FiShoppingCart className="-ml-0.5 text-xl text-white" />
          </button>
          <button className="ml-2 text-sm font-bold hover:text-zinc-700">
            SIGN UP
          </button>
        </div>
      </div>
    </header>
  );
}
