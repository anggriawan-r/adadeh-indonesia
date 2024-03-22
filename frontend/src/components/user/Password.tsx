"use client";

import React, { useState } from "react";
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
  const [message, setMessage] = useState<string>();

  const form = useForm<z.infer<typeof userChangePassword>>({
    resolver: zodResolver(userChangePassword),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (val: z.infer<typeof userChangePassword>) => {
    setMessage("");
    try {
      await edit(
        {
          password: val.newPassword,
        },
        data.token,
      );
      setMessage("Password has been changed successfully!");
    } catch (error) {
      setMessage("Failed to change password!");
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
          name="newPassword"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
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
                  type="password"
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
        {message && <p>{message}</p>}
      </form>
    </Form>
  );
}
