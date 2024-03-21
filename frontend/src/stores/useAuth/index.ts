import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import axios from "axios";
import { signUp, useSignIn, useSignUp } from "@/type/auth";

export const useRegister = create<useSignUp>((set) => ({
  message: "",
  handleSignUp: async (data: signUp) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/register`,
        data,
      );
      set({ message: response.data.message });
    } catch (error: any) {
      console.log(error);
      set({ message: error.response.data.message });
    }
  },
}));

type persist = (
  confiq: StateCreator<useSignIn>,
  options: PersistOptions<useSignIn>,
) => StateCreator<useSignIn>;

export const useLogin = create<useSignIn, []>(
  (persist as persist)(
    (set, get): useSignIn => ({
      message: get()?.message,
      status: get()?.status,
      data: get()?.data,
      handleSignIn: async (data) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            data,
          );
          set({ status: response.data.status });
          set({ message: response.data.message });
          set({ data: response.data.data });
        } catch (error: any) {
          set({ status: error.response.data.status });
          set({ message: error.response.data.message });
        }
      },
      handleSignOut: () => {
        set({ status: false });
        set({ data: null });
        set({ message: "Sign out success!" });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
