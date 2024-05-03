"use client";

import { categoryType } from "@/type/category";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

export default function NavList({
  categories,
}: {
  categories: categoryType[];
}) {
  const path = usePathname();

  return (
    <nav className="hidden h-full items-center gap-8 lg:flex">
      <Link href="/" className="h-full">
        <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
          HOME
          <div
            className={twJoin(
              "absolute bottom-0 h-1 w-full bg-black group-hover:visible",
              path == "/" && "visible",
              path != "/" && "invisible",
            )}
          />
        </div>
      </Link>
      <Link href="/catalogue" className="h-full">
        <div className="group relative flex h-full cursor-pointer items-center text-xs font-bold text-black/80 lg:text-sm">
          CATALOGUE
          <div
            className={twJoin(
              "absolute bottom-0 h-1 w-full bg-black group-hover:visible",
              path == "/catalogue" && "visible",
              path != "/catalogue" && "invisible",
            )}
          />
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
                  href={`/catalogue?category=${item.name}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
