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
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const second = ("0" + date.getSeconds()).slice(-2);
  const milisecond = ("00" + date.getMilliseconds()).slice(-3);

  const dateResult = `${day} ${month} ${year} ${hour}:${minute}:${second}:${milisecond}`

  return { dateResult };
}
