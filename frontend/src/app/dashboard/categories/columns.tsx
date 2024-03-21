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

export type Category = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
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
    accessorKey: "created_at",
    header: "Created At",
  },
  {
    accessorKey: "updated_at",
    header: "Updated At",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const category = row.original;
      const { destroy, message } = useCategory()
      const { toast } = useToast();
      const router = useRouter()
      return (
        <>
            <Button variant={"ghost"} className="border border-slate-200">View</Button>
            <UpdateCategory id={category.id} />
            <Button variant={"ghost"} className="border border-slate-200" onClick={async ()=> {
                await destroy(category.id)
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
                  .finally(()=>{
                    router.refresh();
                  })
            }}>Delete</Button>
        </>
      );
    },
  },
];
