import { useProducts } from "@/type/product";
import axios from "axios";
import { create } from "zustand";

export const useProduct = create<useProducts>((set, get) => ({
  status: get()?.status,
  message: get()?.message,
  store: async (data, token) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        data,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      set({ status: response.data.status });
      set({ message: response.data.message });
    } catch (error: any) {
      console.log(error)
      set({ status: error.response.data.status });
      set({ message: error.response.data.message });
    }
  },
  edit: async (data, id, token) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        data,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      set({ status: response.data.status });
      set({ message: response.data.message });
    } catch (error: any) {
      console.log(error)
      set({ status: error.response.data.status });
      set({ message: error.response.data.message });
    }
  },
  destroy: async (id, token) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      set({ status: response.data.status });
      set({ message: response.data.message });
    } catch (error: any) {
      set({ status: error.response.data.status });
      set({ message: error.response.data.message });
    }
  },
}));
