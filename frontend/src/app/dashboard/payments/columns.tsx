"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCategory } from "@/stores/useCategory";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import UpdateCategory from "@/components/admin/UpdateCategory";
import axios from "axios";
import { useLogin } from "@/stores/useAuth";

export type Category = {
  id: string;
  order_id: string
  payment_type: string
  customer: string
  jumlah: string
  status: string
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
    accessorKey: "order_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          OrderID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "payment_type",
    header: "Payment Type",
  },
  {
    accessorKey: "jumlah",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const payment = row.original
      const { data } = useLogin()
      const router = useRouter()
      const { toast } = useToast()
      const handleStatus = async (status: any) =>{
        try {
          await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/payments/status/${payment.id}`, {status}, {
            headers:{
              Authorization: `Bearer ${data.token}`
            }
          })
          .then((res)=>{
            toast({
              title: "Success",
              description: res.data.message,
            });
          })
          router.refresh()
        } catch (error) {
          console.log(error)
          toast({
            variant: "destructive",
            title: "Failed",
            description: "Payment unsuccessfully updated",
          });
        }
      }
      return (
        <>
          <div className="flex gap-4">
            <Button variant={"outline"} className="text-green-500" onClick={()=>handleStatus("success")}>Success</Button>
            <Button variant={"outline"} className="text-red-500" onClick={()=>handleStatus("pending")}>Pending</Button>
          </div>
        </>
      )
    }
  }
];
