import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavbarUtils from "./NavbarUtils";
import { nav } from "@/lib/constants";

export default function Navbar() {
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
        <div className="flex h-full space-x-4">
          <nav className="hidden h-full items-center gap-8 lg:flex">
            <Link href="/catalogue" className="h-full">
              <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
                CATALOGUE
                <div className="invisible absolute bottom-0 h-1 w-full bg-black group-hover:visible" />
              </div>
            </Link>
            <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
              CATEGORIES
              <div className="invisible absolute bottom-0 h-1 w-full bg-black group-hover:visible" />
              <ul className="invisible absolute bottom-0 left-0 translate-y-full bg-white shadow-2xl group-hover:visible">
                {nav.map((item, index) => (
                  <li key={index}>
                    <Link
                      className="inline-block w-full p-4 hover:bg-slate-200"
                      href="#"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <NavbarUtils nav={nav} />
        </div>
      </div>
    </header>
  );
}
