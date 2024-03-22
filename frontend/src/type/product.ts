import { z } from "zod"

export const productSchema = z.object({
    name: z.string({
        required_error: "Nama product harus diisi"
    }),
    description: z.string({
        required_error: "Deskripsi harus diisi"
    }),
    stock: z.string({
        required_error: "Stock harus diisi"
    }),
    price: z.string({
        required_error: "Price harus diisi"
    }),
    category_id: z.string({
        required_error: "Category harus diisi"
    }),
    image: z.instanceof(FileList).optional() || z.any(),
})

export interface useProducts{
    status: boolean
    message: string
    store: (data: any) => Promise<void>
    edit: (data: any, id: any) => Promise<void>
    destroy: (id: any) => Promise<void>
}