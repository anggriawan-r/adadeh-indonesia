import { columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import FormCategory from "@/components/admin/FormCategory";

async function getData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    );
    return response.data.data;
  } catch (error: any) {
    console.log(error.response.data.message);
  }
}

export default async function Categories() {
  const data = await getData();
  return (
    <>
      <div className="container space-y-2 md:w-full w-screen">
        <div className="mt-10 flex items-center justify-between">
          <p className="text-2xl font-bold">Category</p>
          <FormCategory />
        </div>
        <Separator />
      </div>
      <div className="container mx-auto py-2 md:w-full w-screen">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
