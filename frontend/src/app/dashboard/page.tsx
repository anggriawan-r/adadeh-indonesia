"use client";

import ProtectedRoutes from "@/components/layouts/ProtectedRoutes";
import { Separator } from "@/components/ui/separator";

function AdminDashboard() {
  return (
    <div className="space-y-2 px-4">
      <p className="mt-20 text-2xl font-bold">Dashboard</p>
      <Separator />
    </div>
  );
}

export default ProtectedRoutes(AdminDashboard);
