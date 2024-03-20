import { z } from "zod";

export const filterSchema = z.object({
  name: z
    .string()
    .max(20, {
      message: "Nama harus kurang dari 20 karakter",
    })
    .optional(),
  category: z.string().optional(),
  sortBy: z.string().optional(),
});
