import { create, StateCreator } from "zustand";
import { createJSONStorage, persist, PersistOptions } from "zustand/middleware";
import axios from "axios";
import { dataType, signUp, useSignIn, useSignUp } from "@/type/auth";

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

type userLoading = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

type persist = (
  confiq: StateCreator<useSignIn>,
  options: PersistOptions<useSignIn>,
) => StateCreator<useSignIn>;

export const useUserLoading = create<userLoading>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));

export const useLogin = create<useSignIn, []>(
  (persist as persist)(
    (set, get): useSignIn => ({
      message: get()?.message,
      status: false,
      hasHydrated: false,
      data: get()?.data ?? null,
      setHasHydrated: (data) => {
        set({ hasHydrated: data });
      },
      handleSignIn: async (data) => {
        useUserLoading.getState().setIsLoading(true);
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/login`,
            data,
          );
          set({ status: response.data.status });
          set({ message: response.data.message });
          set({ data: response.data.data });
          useUserLoading.getState().setIsLoading(false);
        } catch (error: any) {
          set({ status: error.response.data.status });
          set({ message: error.response.data.message });
          useUserLoading.getState().setIsLoading(false);
        }
      },
      handleSignOut: () => {
        set({ status: false });
        set({ data: null });
        set({ message: "Sign out success!" });
      },
      mutateAddress: (data) =>
        set((state: any) => ({
          data: {
            ...state.data,
            user: {
              ...state.data?.user,
              address: data,
            },
          },
        })),
      mutateName: (data) =>
        set((state: any) => ({
          data: {
            ...state.data,
            user: {
              ...state.data?.user,
              name: data,
            },
          },
        })),
      mutatePhone: (data) =>
        set((state: any) => ({
          data: {
            ...state.data,
            user: {
              ...state.data?.user,
              phone: data,
            },
          },
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
