import CatalogFilter from "@/components/CatalogFilter";
import CatalogList from "@/components/CatalogList";

export default function CatalogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24">
      <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:items-start">
        <CatalogFilter className="w-full md:w-[30%]" />
        <CatalogList className="w-full md:w-[70%]" />
      </div>
    </main>
  );
}
