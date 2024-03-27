"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { productSchema } from "@/type/product";
import { useProduct } from "@/stores/useProduct";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useLogin } from "@/stores/useAuth";

const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);
const supabase = createClient(
  "https://vcowdsqhhhrcmyvetict.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb3dkc3FoaGhyY215dmV0aWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTM2NDYsImV4cCI6MjAyNTIyOTY0Nn0.KY9p1Lz1x3fYcK86eYx4mrUI3F-nDPvZS4iW3FeGNn0",
);

export default function FormProduct() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher,
  );
  const { data: dataToken } = useLogin()
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
  });
  const { store, message, status } = useProduct();
  const { toast } = useToast();
  const router = useRouter();
  const fileRef = form.register("image");
  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const file = values?.image[0];
    const filePath = file.name;
    const { data, error } = await supabase.storage
      .from("test")
      .upload(filePath, file);
    if (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Gagal upload gambar",
      });
    } else {
      values = {
        ...values,
        image: `https://vcowdsqhhhrcmyvetict.supabase.co/storage/v1/object/public/test/${values.image[0].name}`,
      };
      console.log(values);
      await store(values, dataToken?.token);
      router.refresh();
      setIsSubmitted(true);
    }
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  useEffect(() => {
    if (isSubmitted) {
      if (status) {
        toast({
          title: "Success",
          description: message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed",
          description: message,
        });
      }
      setIsSubmitted(false);
    }
  }, [status, message, isSubmitted]);
  return (
    <Dialog>
      <DialogTrigger className="rounded-lg border border-slate-200 px-4 py-2">
        Add Product
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
                encType="multipart/form-data"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name Product</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {data?.map((d: any, index: number) => (
                            <SelectItem value={d.id.toString()} key={index}>
                              {d.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input type="file" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
