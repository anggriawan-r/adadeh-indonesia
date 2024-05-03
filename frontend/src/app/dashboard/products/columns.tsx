"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProduct } from "@/stores/useProduct";
import UpdateProduct from "@/components/admin/UpdateProduct";
import { useLogin } from "@/stores/useAuth";

export type Product = {
  id: string;
  name: string;
  description: string
  stock: number
  price: number
  category: string
  image: string
  created_at: string;
  updated_at: string;
  action: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row })=>{
      const product = row.original
      return(
        <Image src={product.image} height={200} width={200} alt={product.name} />
      )
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row })=>{
      const product = row.original
      return(
        <p className="h-40 text-wrap truncate w-40">{product.description}</p>
      )
    }
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      const { destroy, message } = useProduct();
      const { toast } = useToast();
      const router = useRouter();
      const { data } = useLogin()
      return (
        <>
          <UpdateProduct id={category.id} token={data?.token} />
          <Button
            variant={"ghost"}
            className="border border-slate-200"
            onClick={async () => {
              await destroy(category.id, data?.token)
                .then(() => {
                  toast({
                    title: "Success",
                    description: message,
                  });
                })
                .catch(() => {
                  toast({
                    variant: "destructive",
                    title: "Failed",
                    description: message,
                  });
                })
                .finally(() => {
                  router.refresh();
                });
            }}
          >
            Delete
          </Button>
        </>
      );
    },
  },
];
