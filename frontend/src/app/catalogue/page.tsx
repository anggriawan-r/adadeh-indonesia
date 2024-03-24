import CatalogFilter from "@/components/CatalogFilter";
import CatalogList from "@/components/CatalogList";

export default function CatalogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="flex w-full flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <CatalogFilter className="w-full md:basis-1/4" />
        <CatalogList className="w-full md:basis-3/4" />
      </div>
    </main>
  );
}
