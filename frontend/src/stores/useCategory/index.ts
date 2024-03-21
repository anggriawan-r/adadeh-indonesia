import { useCategories } from "@/type/category";
import axios from "axios";
import { create } from "zustand";


export const useCategory = create<useCategories>(
    (set, get)=>({
        status: false,
        message: get()?.message,
        store: async (data) =>{
            try {
                const response = await axios.post("http://localhost:8000/api/categories", data)
                set({ status: response.data.status })
                set({ message: response.data.message })
            } catch (error: any) {
                set({ status: error.response.data.status })
                set({ message: error.response.data.message })
            }
        },
        edit: async (data, id) => {
            try {
                const response = await axios.patch(`http://localhost:8000/api/categories/${id}`, data)
                set({ status: response.data.status })
                set({ message: response.data.message })
            } catch (error: any) {
                set({ status: error.response.data.status })
                set({ message: error.response.data.message })
            }
        },
        destroy: async (id) => {
            try {
                const response = await axios.delete(`http://localhost:8000/api/categories/${id}`)
                set({ status: response.data.status })
                set({ message: response.data.message })
            } catch (error: any) {
                set({ status: error.response.data.status })
                set({ message: error.response.data.message })
            }
        }
    })
)