"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { categories } from "@/lib/constants";
import { twJoin } from "tailwind-merge";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

export default function CatalogFilter({ className }: { className?: string }) {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof filterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
                  <Select onValueChange={field.onChange} {...field}>
                    <SelectTrigger
                      id="category"
                      className="w-full rounded-none hover:bg-zinc-100 focus:ring-2"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((item, index) => (
                        <SelectItem key={index} value={item.name}>
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
                        <SelectItem value="cheap">Cheapest</SelectItem>
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
