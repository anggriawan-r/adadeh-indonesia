"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  MdOutlineSpaceDashboard,
  MdCategory,
  MdOutlineProductionQuantityLimits,
  MdLogout,
  MdMenu,
  MdPayment,
} from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { useLogin } from "@/stores/useAuth";
import { FaUsers } from "react-icons/fa6";
import { twJoin } from "tailwind-merge";
import Link from "next/link";

interface props {
  click: any;
}

export default function Sidebar({ click }: props) {
  const router = useRouter();
  const path = usePathname();
  const { handleSignOut } = useLogin();
  return (
    <>
      <header className="relative grid h-40 place-items-center">
        <div className="space-y-2">
          <Link href="/">
            <Image src={"/adadeh.svg"} height={80} width={80} alt="Logo" />
          </Link>
          <p className="text-center font-bold">Admin</p>
        </div>
        <Button
          variant={"ghost"}
          className="absolute right-1 top-4 inline-flex h-10 w-10 border border-slate-200 p-0 md:hidden"
          onClick={() => click()}
        >
          <MdMenu className="text-xl" />
        </Button>
      </header>
      <main className="flex min-h-[calc(100%-160px)] flex-col justify-between">
        <ul className="space-y-4">
          {/* <li>
            <Button
              className={twJoin(
                "w-full justify-start rounded-none",
                path == "/dashboard" &&
                  "bg-black text-white hover:bg-zinc-800 hover:text-white",
              )}
              variant={"ghost"}
              onClick={() => router.push("/dashboard")}
            >
              <MdOutlineSpaceDashboard className="mr-2 text-xl" />
              Dashboard
            </Button>
          </li> */}
          <li>
            <Button
              className={twJoin(
                "w-full justify-start rounded-none",
                path == "/dashboard/customers" &&
                  "bg-black text-white hover:bg-zinc-800 hover:text-white",
              )}
              variant={"ghost"}
              onClick={() => router.push("/dashboard/customers")}
            >
              <FaUsers className="mr-2 text-xl" />
              Customer
            </Button>
          </li>
          <li>
            <Button
              className={twJoin(
                "w-full justify-start rounded-none",
                path == "/dashboard/categories" &&
                  "bg-black text-white hover:bg-zinc-800 hover:text-white",
              )}
              variant={"ghost"}
              onClick={() => router.push("/dashboard/categories")}
            >
              <MdCategory className="mr-2 text-xl" />
              Category
            </Button>
          </li>
          <li>
            <Button
              className={twJoin(
                "w-full justify-start rounded-none",
                path == "/dashboard/products" &&
                  "bg-black text-white hover:bg-zinc-800 hover:text-white",
              )}
              variant={"ghost"}
              onClick={() => router.push("/dashboard/products")}
            >
              <MdOutlineProductionQuantityLimits className="mr-2 text-xl" />
              Product
            </Button>
          </li>
          <li>
            <Button
              className={twJoin(
                "w-full justify-start rounded-none",
                path == "/dashboard/payments" &&
                  "bg-black text-white hover:bg-zinc-800 hover:text-white",
              )}
              variant={"ghost"}
              onClick={() => router.push("/dashboard/payments")}
            >
              <MdPayment className="mr-2 text-xl" />
              Payment
            </Button>
          </li>
        </ul>
        <ul>
          <li>
            <Button
              className="w-full justify-start"
              variant={"ghost"}
              onClick={() => {
                handleSignOut();
                router.push("/auth/signin");
              }}
            >
              <MdLogout className="mr-2 text-xl" />
              Logout
            </Button>
          </li>
        </ul>
      </main>
    </>
  );
}
