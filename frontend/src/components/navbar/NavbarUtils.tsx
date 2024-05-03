"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { FaAngleRight } from "react-icons/fa6";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MdAccountCircle } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";
import { PiSignOutBold } from "react-icons/pi";
import { useLogin } from "@/stores/useAuth";
import { useToast } from "@/components/ui/use-toast";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { categoryType } from "@/type/category";
import { MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function NavbarUtils({ navList }: { navList: categoryType[] }) {
  const { message, data, status, handleSignOut, hasHydrated } = useLogin();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [productName, setProductName] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const onSignOut = () => {
    setIsSubmitted(true);
    handleSignOut();
    router.push("/auth/signin");
  };

  useEffect(() => {
    if (isSubmitted) {
      toast({
        title: "Success",
        description: message,
      });
      setIsSubmitted(false);
    }
  }, [message, toast, isSubmitted]);

  function handleSubmitSearchProduct(event: React.SyntheticEvent) {
    event.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("name", productName);
    router.push(`/catalogue?${urlParams.toString()}`);
  }

  function handleChangeProductName(event: any) {
    setProductName(event.target.value);
  }

  return (
    <div className="flex items-center gap-3">
      <form
        onSubmit={handleSubmitSearchProduct}
        className="hidden min-[500px]:flex"
      >
        <div>
          <input
            type="text"
            className="h-full rounded-none border border-gray-300 p-2 text-sm"
            placeholder="Search our products"
            value={productName}
            onChange={handleChangeProductName}
          />
        </div>
        <button
          type="submit"
          className="-ml-1 flex size-10 shrink-0 items-center justify-center bg-black transition-colors hover:bg-black/80"
        >
          <IoSearch className="text-xl text-white" />
        </button>
      </form>

      {hasHydrated && data && (
        <>
          <Link href="/cart">
            <button className="flex size-10 shrink-0 items-center justify-center rounded-[50%] bg-black transition-colors hover:bg-black/80">
              <FiShoppingCart className="-ml-0.5 text-xl text-white" />
            </button>
          </Link>
          <div className="group relative flex h-full items-center">
            <Avatar>
              <AvatarFallback className="font-bold">
                {hasHydrated && data?.user.name[0]}
              </AvatarFallback>
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
                href="/transaction"
                className="flex w-full items-center gap-4 p-4 hover:bg-zinc-100"
              >
                <MdPayment className="basis-1/5 text-2xl" />
                <p className="basis-4/5">Transaction</p>
              </Link>
              {hasHydrated && data?.user.role == "admin" && (
                <Link
                  href="/dashboard/categories"
                  className="flex w-full items-center gap-4 p-4 hover:bg-zinc-100"
                >
                  <MdOutlineSpaceDashboard className="basis-1/5 text-2xl" />
                  <p className="basis-4/5">Dashboard</p>
                </Link>
              )}
              <Link
                href="/wishlist"
                className="flex w-full items-center gap-4 p-4 hover:bg-zinc-100"
              >
                <GoHeartFill className="basis-1/5 text-xl" />
                <p className="basis-4/5">Wishlist</p>
              </Link>
              <div
                onClick={onSignOut}
                className="flex w-full cursor-pointer items-center gap-4 bg-white p-4 text-base font-semibold text-black hover:bg-zinc-100"
              >
                <PiSignOutBold className="basis-1/5 text-xl" />
                <p className="basis-4/5">Sign Out</p>
              </div>
            </div>
          </div>
        </>
      )}
      {hasHydrated && !status && (
        <>
          <Button
            disabled={!hasHydrated}
            variant="outline"
            className="hidden w-max items-center gap-2 rounded-none text-xs sm:flex"
            asChild
          >
            <Link href="/auth/signup">SIGN UP</Link>
          </Button>
          <Button
            disabled={!hasHydrated}
            className="hidden w-max items-center gap-2 rounded-none text-xs sm:flex"
            asChild
          >
            <Link href="/auth/signin">SIGN IN</Link>
          </Button>
        </>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <button className="h-max w-max">
            <RxHamburgerMenu className="block text-2xl lg:hidden" />
          </button>
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-4 overflow-y-scroll">
          {hasHydrated && !status && (
            <SheetClose asChild>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="mt-16 w-max rounded-none"
                  asChild
                >
                  <Link href="/auth/signup">SIGN UP</Link>
                </Button>
                <Button className="mt-16 w-max rounded-none" asChild>
                  <Link href="/auth/signin">SIGN IN</Link>
                </Button>
              </div>
            </SheetClose>
          )}
          <nav className={`flex flex-col gap-2 ${status && "mt-16"}`}>
            <form className="mb-4 flex w-full">
              <div className="w-full">
                <input
                  type="text"
                  className="h-full w-full rounded-none border border-gray-300 p-2 text-sm"
                  placeholder="Search our products"
                  autoFocus={false}
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

            <SheetClose asChild>
              <Link href="/catalogue">
                <div className="group relative flex h-full cursor-pointer items-center justify-between p-2 text-lg font-bold text-black/80 hover:bg-black hover:text-white">
                  CATALOGUE
                </div>
              </Link>
            </SheetClose>

            <hr />
            {navList.map((item, index: number) => (
              <SheetClose key={index} asChild>
                <Link href="#">
                  <div className="group relative flex h-full cursor-pointer items-center justify-between p-2 text-lg font-bold text-black/80 hover:bg-black hover:text-white">
                    {item.name}
                    <FaAngleRight />
                  </div>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
