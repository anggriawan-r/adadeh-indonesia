import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import FormProduct from "@/components/admin/FormProduct";

async function getData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
    );
    return response.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

export default async function Products() {
  const data = await getData();
  return (
    <>
      <div className="container space-y-2">
        <div className="mt-10 flex items-center justify-between">
          <p className="text-2xl font-bold">Product</p>
          <FormProduct />
        </div>
        <Separator />
      </div>
      <div className="container mx-auto py-2">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}