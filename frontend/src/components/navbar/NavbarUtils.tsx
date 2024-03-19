import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { navType } from "@/lib/constants";
import { FaAngleRight } from "react-icons/fa6";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavbarUtils({ nav }: { nav: navType }) {
  const isLoggedIn = false;

  return (
    <div className="flex items-center gap-3">
      <form className="flex">
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
          <button className="flex size-10 shrink-0 items-center justify-center rounded-[50%] bg-black transition-colors hover:bg-black/80">
            <FiShoppingCart className="-ml-0.5 text-xl text-white" />
          </button>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
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
            {nav.map((item, index) => (
              <Link key={index} href="#">
                <div className="group relative flex h-full cursor-pointer items-center justify-between p-4 text-xl font-bold text-black/80 hover:bg-black hover:text-white">
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
