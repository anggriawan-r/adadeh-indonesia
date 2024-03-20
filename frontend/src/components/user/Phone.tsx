import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Phone() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Your phone number"
          className="rounded-none"
        />
      </div>
      <button className="w-max bg-black px-4 py-3 text-sm text-white transition hover:bg-black/90">
        Save changed
      </button>
    </form>
  );
}
