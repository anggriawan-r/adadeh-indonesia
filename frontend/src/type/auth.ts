import { z } from "zod";

export interface signUp {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface useSignUp {
  message: string;
  handleSignUp: (data: signUp) => Promise<void>;
}

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Nama pengguna harus terdiri dari minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email harus berformat email",
  }),
  password: z.string().min(8, {
    message: "Password harus terdiri minimal 8 kata",
  }),
  password_confirmation: z.string().min(8, {
    message: "Password confirmation harus terdiri minimal 8 karakter",
  }),
});

export interface signIn {
  email: string;
  password: string;
}

export interface useSignIn {
  message: string;
  status: boolean;
  handleSignIn: (data: signIn) => Promise<void>;
  handleSignOut: () => void;
  mutateAddress: (data: string) => void;
  mutateName: (data: string) => void;
  mutatePhone: (data: string) => void;
  data: (() => void) | any;
}

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email harus berformat email",
  }),
  password: z.string().min(8, {
    message: "Password harus terdiri minimal 8 karakter",
  }),
});
