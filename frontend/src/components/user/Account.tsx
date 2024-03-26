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
import { userChangeAccount } from "@/type/user";

export default function Account() {
  const { data, mutateName } = useLogin();
  const { edit } = useUser();
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof userChangeAccount>>({
    resolver: zodResolver(userChangeAccount),
    defaultValues: {
      name: data?.user?.name,
      email: data?.user?.email,
    },
  });

  const onSubmit = async (val: z.infer<typeof userChangeAccount>) => {
    setMessage("");
    try {
      await edit(
        {
          name: val.name,
          email: val.email,
        },
        data?.token,
      );
      setMessage("Account information has been changed successfully!");
      mutateName(val.name);
    } catch (error) {
      setMessage("Failed to change account information!");
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
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="rounded-none"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  className="rounded-none"
                  disabled
                  {...field}
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
