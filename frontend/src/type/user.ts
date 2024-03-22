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
    confirmPassword: z.string().min(8),
  })
  .refine((schema) => schema.newPassword === schema.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password does not match",
  });
