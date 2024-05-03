"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategory } from "@/stores/useCategory";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UpdateCategory from "@/components/admin/UpdateCategory";
import axios from "axios";

export type Category = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  action: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;
      const { toast } = useToast();
      const router = useRouter();
      const handleReset = async () =>{
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/reset-password/${user.id}`)
        .then((res)=>{
          toast({
            title: "Success",
            description: res.data.message,
          });
        }).catch((error)=>{
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Password unsuccessfully updated",
          });
        })
        router.refresh()
      }
      return (
        <>
          <Button variant={"ghost"} className="border border-slate-200" onClick={handleReset}>
            Reset Password
          </Button>
        </>
      );
    },
  },
];
