import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Account() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          defaultValue="John Doe"
          className="rounded-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue="john.doe@example.com"
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
