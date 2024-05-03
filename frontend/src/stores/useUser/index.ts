import axios from "axios";
import { create } from "zustand";
import { useUserI } from "@/type/user";

export const useUser = create<useUserI>((set, get) => ({
  status: false,
  message: get()?.message,
  edit: async (data, token) => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/update-user`,
        data,
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        },
      );
      set({ status: response.data.status });
      set({ message: response.data.message });
    } catch (error: any) {
      set({ status: error.response.data.status });
      set({ message: error.response.data.message });
    }
  },
}));
