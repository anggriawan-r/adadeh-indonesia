import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { productsType } from "@/lib/constants";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { Button } from "@/components/ui/button";

export default function ProductCard({ data }: { data: productsType }) {
  return (
    <div className="relative flex h-full flex-col justify-between border border-transparent pb-4 hover:border-black sm:pb-0">
      <button className="absolute right-4 top-4 z-[1]">
        <GoHeart className="text-xl text-black" />
      </button>
      <div className="w-full">
        <AspectRatio ratio={1 / 1}>
          <Image
            src={data.image_url}
            alt="Image"
            fill
            className="object-cover"
          />
        </AspectRatio>
      </div>
      <div className="h-full p-2">
        <p className="mb-2 text-xs font-light">{data.category}</p>
        <h2 className="text-xs sm:text-sm">{data.name}</h2>
        <p className="text-xs font-light sm:text-sm">{data.price}</p>
      </div>
      <Button className="rounded-none text-white">Add to cart</Button>
    </div>
  );
}
