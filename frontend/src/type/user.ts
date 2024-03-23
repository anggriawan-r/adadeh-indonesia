import { z } from "zod";

type userData = {
  name?: string;
  email?: string;
  address?: string;
  password?: string;
  phone?: string;
};

export interface useUserI {
  status: boolean;
  message: string;
  edit: (data: userData, token: string) => Promise<void>;
}

export const userChangePassword = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "Password harus terdiri minimal 8 karakter" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password harus terdiri minimal 8 karakter" }),
  })
  .refine((schema) => schema.newPassword === schema.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });

export const userChangeAddress = z.object({
  address: z.string(),
});

export const userChangePhone = z.object({
  phone: z
    .string()
    .min(12, { message: "Nomor HP harus terdiri minimal 12 angka" }),
});

export const userChangeAccount = z.object({
  name: z.string().min(2, { message: "Nama harus terdiri minimal 2 karakter" }),
  email: z.string().email().optional(),
});
