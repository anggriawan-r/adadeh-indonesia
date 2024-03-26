import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(data: string) {
  const date = new Date(data);
  const month = new Date(data).toLocaleString("id-ID", {
    month: "long",
  });

  const day = date.getDate();
  const year = date.getFullYear();

  return { day, month, year };
}
