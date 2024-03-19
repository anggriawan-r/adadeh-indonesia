import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { twJoin } from "tailwind-merge";

export default function CatalogFilter({ className }: { className?: string }) {
  return (
    <aside
      className={twJoin(
        "sticky top-24 flex h-max flex-col gap-4 border border-black/10 p-4",
        className,
      )}
    >
      <input
        type="text"
        className="w-full rounded-none border border-black/10 p-2 text-sm"
        placeholder="Search By Name"
      />

      <Select>
        <SelectTrigger className="w-full rounded-none hover:bg-zinc-100 focus:ring-2">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((item, index) => (
            <SelectItem key={index} value={item.name}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select defaultValue="newest">
        <SelectTrigger className="w-full rounded-none hover:bg-zinc-100 focus:ring-2">
          <SelectValue placeholder="Newest" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </aside>
  );
}
