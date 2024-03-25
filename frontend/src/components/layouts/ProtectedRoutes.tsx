"use client";

import { loginRoutes, protectedRoutes } from "@/lib/constants";
import { useLogin, useUserLoading } from "@/stores/useAuth";
import { usePathname, redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = useLogin();
  const { isLoading } = useUserLoading();
  const path = usePathname();

  useEffect(() => {
    if (!isLoading && !status) {
      if (protectedRoutes.includes(path)) {
        redirect("/auth/signin");
      }
    } else if (!isLoading && status) {
      if (loginRoutes.includes(path)) {
        if (data.user.role == "admin") {
          redirect("/dashboard");
        } else {
          redirect("/user");
        }
      }
    }

    // if (status) {
    //   if (loginRoutes.includes(path)) {
    //     if (data.user.role == "admin") {
    //       redirect("/dashboard");
    //     } else {
    //       redirect("/user");
    //     }
    //   }
    // } else {
    //   if (protectedRoutes.includes(path)) {
    //     redirect("/auth/signin");
    //   }
    // }
  }, [path, status, data]);

  return <>{children}</>;
}
