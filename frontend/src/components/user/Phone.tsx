"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useUser } from "@/stores/useUser";
import { useLogin } from "@/stores/useAuth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userChangePhone } from "@/type/user";

export default function Phone() {
  const { data, mutatePhone } = useLogin();
  const { edit } = useUser();
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof userChangePhone>>({
    resolver: zodResolver(userChangePhone),
    defaultValues: {
      phone: data?.user.phone ?? "",
    },
  });

  const onSubmit = async (val: z.infer<typeof userChangePhone>) => {
    setMessage("");
    try {
      await edit(
        {
          phone: val.phone,
        },
        data.token,
      );
      mutatePhone(val.phone);
      setMessage("Phone has been changed successfully!");
    } catch (error) {
      setMessage("Failed to change phone!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  className="rounded-none"
                  placeholder="xxxx-xxxx-xxxx"
                  {...field}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button className="w-max bg-black px-4 py-3 text-sm text-white transition hover:bg-black/90">
          Save changed
        </button>
        {message && <p className="text-emerald-600">{message}</p>}
      </form>
    </Form>
  );
}
