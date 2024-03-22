"use client";

import React from "react";
import { Label } from "@/components/ui/label";
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
import { userChangePassword } from "@/type/user";

export default function Password() {
  const { data } = useLogin();
  const { edit } = useUser();

  const form = useForm<z.infer<typeof userChangePassword>>({
    resolver: zodResolver(userChangePassword),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (val: z.infer<typeof userChangePassword>) => {};

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  className="rounded-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="********"
                  className="rounded-none"
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
      </form>
    </Form>
  );
}
