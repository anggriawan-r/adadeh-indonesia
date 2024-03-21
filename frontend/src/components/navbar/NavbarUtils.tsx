"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { navType } from "@/lib/constants";
import { FaAngleRight } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdAccountCircle } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";

export default function NavbarUtils({ nav }: { nav: navType }) {
  const isLoggedIn = true;

  return (
    <div className="flex items-center gap-3">
      <form className="hidden min-[500px]:flex">
        <div>
          <input
            type="text"
            className="h-full rounded-none border border-gray-300 p-2 text-sm"
            placeholder="Search our products"
          />
        </div>
        <button
          type="submit"
          className="-ml-1 flex size-10 shrink-0 items-center justify-center bg-black transition-colors hover:bg-black/80"
        >
          <IoSearch className="text-xl text-white" />
        </button>
      </form>

      {isLoggedIn && (
        <>
          <Link href="/cart">
            <button className="flex size-10 shrink-0 items-center justify-center rounded-[50%] bg-black transition-colors hover:bg-black/80">
              <FiShoppingCart className="-ml-0.5 text-xl text-white" />
            </button>
          </Link>
          <div className="group relative flex h-full items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="invisible absolute bottom-0 right-[50%] translate-x-[30%] translate-y-full bg-white font-semibold shadow-2xl group-hover:visible">
              <Link
                href="/user"
                className="flex w-full items-center gap-4 p-4 hover:bg-zinc-100"
              >
                <MdAccountCircle className="basis-1/5 text-2xl" />
                <p className="basis-4/5">Account</p>
              </Link>
              <Link
                href="/wishlist"
                className="flex w-full items-center gap-4 p-4 hover:bg-zinc-100"
              >
                <GoHeartFill className="basis-1/5 text-xl" />
                <p className="basis-4/5">Wishlist</p>
              </Link>
              <div
                onClick={() => console.log("Logout")}
                className="flex w-full cursor-pointer items-center gap-4 bg-white p-4 text-base font-semibold text-black hover:bg-zinc-100"
              >
                <PiSignOutBold className="basis-1/5 text-xl" />
                <p className="basis-4/5">Sign Out</p>
              </div>
            </div>
          </div>
        </>
      )}
      {!isLoggedIn && (
        <Link href="/auth/signup">
          <button className="ml-2 hidden shrink-0 text-xs font-bold hover:text-zinc-700 md:flex lg:text-sm">
            SIGN UP
          </button>
        </Link>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <button className="h-max w-max">
            <RxHamburgerMenu className="block text-2xl lg:hidden" />
          </button>
        </SheetTrigger>
        <SheetContent>
          <nav className="mt-20 flex flex-col gap-2">
            <form className="mb-4 flex w-full">
              <div className="w-full">
                <input
                  type="text"
                  className="h-full w-full rounded-none border border-gray-300 p-2 text-sm"
                  placeholder="Search our products"
                />
              </div>
              <button
                type="submit"
                className="-ml-1 flex size-10 shrink-0 items-center justify-center bg-black transition-colors hover:bg-black/80"
              >
                <IoSearch className="text-xl text-white" />
              </button>
            </form>

            <hr />

            <Link href="/catalogue">
              <div className="group relative flex h-full cursor-pointer items-center justify-between p-2 text-lg font-bold text-black/80 hover:bg-black hover:text-white">
                CATALOGUE
              </div>
            </Link>

            <hr />
            {nav.map((item, index) => (
              <Link key={index} href="#">
                <div className="group relative flex h-full cursor-pointer items-center justify-between p-2 text-lg font-bold text-black/80 hover:bg-black hover:text-white">
                  {item}
                  <FaAngleRight />
                </div>
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
