"use client";

import CatalogFilter from "@/components/CatalogFilter";
import CatalogList from "@/components/CatalogList";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// function Search({ children }: { children: React.ReactNode }) {
//   const searchParams = useSearchParams();
//   const searchCat = searchParams.get("category") ?? null;
//   const searchName = searchParams.get("name") ?? null;

//   return <>{children}</>;
// }

export default function CatalogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <Suspense>
          <CatalogFilter className="w-full md:basis-1/4" />
        </Suspense>
        <CatalogList className="w-full md:basis-3/4" />
      </div>
    </main>
  );
}
