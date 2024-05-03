import Image from "next/image";
import { categoriesType } from "@/lib/constants";
import { twJoin } from "tailwind-merge";
import Link from "next/link";

export default function CategoryCard({
  data,
  className,
}: {
  data: categoriesType;
  className?: string;
}) {
  return (
    <div className={twJoin("relative", className)}>
      <div className="h-[500px] w-full">
        <Image
          src={data.image_url}
          alt="lifestyle"
          fill
          sizes="90vw, (min-width: 640px) 33vw"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-10 flex w-full justify-center">
        <Link href={`/catalogue?category=${data.name}`}>
          <button className="z-[1] bg-black p-4 text-sm font-semibold text-white hover:bg-zinc-900">
            {data.name.toUpperCase()}
          </button>
        </Link>
        <div className="pointer-events-none absolute translate-x-1 translate-y-1 border border-black bg-transparent p-4 text-sm font-semibold text-transparent">
          {data.name}
        </div>
      </div>
    </div>
  );
}
