import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { twJoin } from "tailwind-merge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CatalogFilter({ className }: { className?: string }) {
  return (
    <aside
      className={twJoin(
        "z-[2] flex h-max w-full flex-col gap-4 border border-black/10 bg-white p-4 md:sticky md:top-24 md:w-max",
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

      <div className="flex items-center gap-4">
        <Label htmlFor="sort" className="shrink-0">
          Sort By
        </Label>
        <Select defaultValue="newest">
          <SelectTrigger
            id="sort"
            className="w-full rounded-none hover:bg-zinc-100 focus:ring-2"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="rounded-none border border-transparent transition hover:border-black hover:bg-white hover:text-black active:bg-black active:text-white">
        Filter
      </Button>
    </aside>
  );
}
