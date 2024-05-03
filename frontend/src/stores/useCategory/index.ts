import { useCategories } from "@/type/category";
import axios from "axios";
import { create } from "zustand";

export const useCategory = create<useCategories>((set, get) => ({
  status: false,
  message: get()?.message,
  store: async (Data, token) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        Data,
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
  edit: async (Data, id, token) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
        Data,
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
  destroy: async (id, token) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`,
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
