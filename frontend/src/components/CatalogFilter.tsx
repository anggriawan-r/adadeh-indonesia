"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { twJoin } from "tailwind-merge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useFilterStore } from "@/stores/useFilter";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { filterSchema } from "@/type/filter";
import axios from "axios";
import useSWR from "swr";
import { categoriesType } from "@/lib/constants";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function CatalogFilter({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const searchCat = searchParams.get("category") ?? null;
  const searchName = searchParams.get("name") ?? null;
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: "",
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetcher = async (url: string) => {
    try {
      const response = await axios.get<{ data: categoriesType[] }>(url);
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };

  const { data: categories } = useSWR(`${baseUrl}/categories`, fetcher);

  const setFilter = useFilterStore((state) => state.setFilter);

  function onSubmit(values: z.infer<typeof filterSchema>) {
    let newKey = "";
    let newValue = "";

    if (values.category == "All") {
      values.category = "";
    }

    if (values.sortBy === "newest") {
      newKey = "new";
      newValue = "asc";
    } else if (values.sortBy === "oldest") {
      newKey = "new";
      newValue = "desc";
    } else if (values.sortBy === "cheapest") {
      newKey = "price";
      newValue = "asc";
    } else if (values.sortBy === "expensive") {
      newKey = "price";
      newValue = "desc";
    }

    const updatedValues = { ...values, [newKey]: newValue };
    setFilter(updatedValues);
    console.log("added to store", updatedValues);
  }

  useEffect(() => {
    if (searchCat || searchName) {
      setFilter({
        category: searchCat ?? "",
        name: searchName ?? "",
      });
    } else {
      setFilter({});
    }
  }, [searchCat, searchName, setFilter]);

  return (
    <aside
      className={twJoin(
        "z-[2] flex h-max w-full flex-col gap-4 border border-black/10 bg-white p-4 md:sticky md:top-24 md:w-max",
        className,
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Search by name"
                    className="rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    {...(searchCat && { defaultValue: searchCat })}
                    {...field}
                  >
                    <SelectTrigger
                      id="category"
                      className="w-full rounded-none hover:bg-zinc-100 focus:ring-2"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="All" value="All">
                        All
                      </SelectItem>
                      {categories?.map((item) => (
                        <SelectItem key={item.id} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sortBy"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Sort By</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    {...field}
                  >
                    <SelectTrigger
                      id="sort"
                      className="w-full rounded-none hover:bg-zinc-100 focus:ring-2"
                    >
                      <SelectValue placeholder="Choose sort by" />
                    </SelectTrigger>
                    <SelectContent className="p-2">
                      <SelectGroup>
                        <Label className="shrink-0">Created</Label>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <Label className="shrink-0">Price</Label>
                        <SelectItem value="cheapest">Cheapest</SelectItem>
                        <SelectItem value="expensive">
                          Most Expensive
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="rounded-none border border-transparent transition hover:border-black hover:bg-white hover:text-black active:bg-black active:text-white"
          >
            Filter
          </Button>
        </form>
      </Form>
    </aside>
  );
}
