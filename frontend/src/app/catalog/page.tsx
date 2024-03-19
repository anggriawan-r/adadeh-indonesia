import CatalogFilter from "@/components/CatalogFilter";
import CatalogList from "@/components/CatalogList";

export default function CatalogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-20 py-24">
      <div className="flex gap-4">
        <CatalogFilter className="w-[30%]" />
        <CatalogList className="w-[70%]" />
      </div>
    </main>
  );
}
