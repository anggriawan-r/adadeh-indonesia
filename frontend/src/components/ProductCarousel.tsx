"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { productsType } from "@/lib/constants";
import ProductCard from "./card/ProductCard";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";

export default function ProductCarousel({ data }: { data: productsType[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex w-full flex-col items-center gap-4 px-0 sm:gap-8 md:px-24">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", dragFree: false, dragThreshold: 0 }}
        className="w-full"
      >
        <CarouselContent className="-ml-[4px]">
          {data.map((item, index) => (
            <CarouselItem
              className="basis-1/2 pl-[4px] md:basis-1/4 xl:basis-1/5"
              key={index}
            >
              <ProductCard data={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="invisible md:visible" />
        <CarouselNext className="invisible md:visible" />
      </Carousel>
      {count > 1 && (
        <div className="flex h-[6px] items-end gap-1">
          {Array.from(Array(count)).map((_, index) => (
            <div
              key={index}
              className={twJoin(
                "h-[2px] w-6 bg-black transition-all hover:h-[6px]",
                index + 1 === current && "h-[6px]",
              )}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
