"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/stores/useAuth";
import { useUser } from "@/stores/useUser";

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

export default function Account() {
  const { data } = useLogin();
  const { edit } = useUser();

  const onEdit = async () => {};

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={data.user.name}
          className="rounded-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={data.user.email}
          className="rounded-none"
          disabled
        />
      </div>
      <button className="w-max bg-black px-4 py-3 text-sm text-white transition hover:bg-black/90">
        Save changed
      </button>
    </form>
  );
}
