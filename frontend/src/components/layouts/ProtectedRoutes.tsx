"use client";

import { loginRoutes, protectedRoutes } from "@/lib/constants";
import { useLogin } from "@/stores/useAuth";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes(Component: any) {
  return function ProtectedRoutes(props: any) {
    const { data, hasHydrated } = useLogin();
    const path = usePathname();

    useEffect(() => {
      if (hasHydrated && data?.user.role != "admin" && path == "/dashboard") {
        redirect("/");
      }
      if (hasHydrated && data && loginRoutes.includes(path)) {
        redirect("/");
      }
      if (hasHydrated && !data && protectedRoutes.includes(path)) {
        redirect("/auth/signin");
      }
    }, [hasHydrated, data, path]);

    if (!hasHydrated) {
      return null;
    }

    return <Component {...props} />;
  };
}
