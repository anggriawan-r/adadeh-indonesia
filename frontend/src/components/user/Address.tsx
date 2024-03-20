import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Address() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Address</Label>
        <Textarea placeholder="Your address" />
      </div>
      <button className="w-max bg-black px-4 py-3 text-sm text-white transition hover:bg-black/90">
        Save changed
      </button>
    </form>
  );
}
