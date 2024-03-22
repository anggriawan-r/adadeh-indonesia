import { z } from "zod";

export type categoryType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export const categorySchema = z.object({
  name: z.string({
    required_error: "Nama category harus dibuat",
  }),
});

export interface useCategories {
  status: boolean;
  message: string;
  store: (data: any) => Promise<void>;
  edit: (data: any, id: any) => Promise<void>;
  destroy: (id: any) => Promise<void>;
}
