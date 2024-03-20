import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Password() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Old Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="******"
          className="rounded-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          type="password"
          id="newPassword"
          name="newPassword"
          placeholder="******"
          className="rounded-none"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="******"
          className="rounded-none"
        />
      </div>
      <button className="w-max bg-black px-4 py-3 text-sm text-white transition hover:bg-black/90">
        Save changed
      </button>
    </form>
  );
}
