import useSWR from "swr";
import axios from "axios";
import { categoryType } from "@/type/category";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response;
    } else {
      return error;
    }
  }
};

export default function useGetCategories() {
  const { data, isLoading, mutate, isValidating } = useSWR<categoryType[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetcher,
  );

  return { data, isLoading, mutate, isValidating };
}
