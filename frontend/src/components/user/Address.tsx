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
import { userChangeAddress } from "@/type/user";
import { Textarea } from "../ui/textarea";

export default function Address() {
  const { data, mutateAddress } = useLogin();
  const { edit } = useUser();
  const [message, setMessage] = useState<string>("");

  const form = useForm<z.infer<typeof userChangeAddress>>({
    resolver: zodResolver(userChangeAddress),
    defaultValues: {
      address: data?.user?.address,
    },
  });

  const onSubmit = async (val: z.infer<typeof userChangeAddress>) => {
    setMessage("");
    try {
      await edit(
        {
          address: val.address,
        },
        data?.token,
      );
      mutateAddress(val.address);
      setMessage("Address has been changed successfully!");
    } catch (error) {
      setMessage("Failed to change address!");
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
          name="address"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  className="rounded-none"
                  placeholder="Your address"
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
