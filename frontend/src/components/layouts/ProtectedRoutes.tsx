"use client";

import { loginRoutes, protectedRoutes } from "@/lib/constants";
import { useLogin } from "@/stores/useAuth";
import { usePathname, redirect } from "next/navigation";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useLogin();
  const path = usePathname();

  if (status) {
    if (loginRoutes.includes(path)) {
      redirect("/");
    }
  } else {
    if (protectedRoutes.includes(path)) {
      redirect("/auth/signin");
    }
  }

  return <>{children}</>;
}
