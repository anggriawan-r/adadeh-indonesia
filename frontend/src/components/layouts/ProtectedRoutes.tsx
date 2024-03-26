"use client";

import { loginRoutes, protectedRoutes } from "@/lib/constants";
import { useLogin, useUserLoading } from "@/stores/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status, data } = useLogin();
  const { isLoading } = useUserLoading();
  const path = usePathname();

  useEffect(() => {
    if (!isLoading && !status) {
      if (protectedRoutes.includes(path)) {
        router.push("/auth/signin");
      }
    } else if (!isLoading && data) {
      if (loginRoutes.includes(path)) {
        if (data.user.role == "admin") {
          router.push("/dashboard");
        } else {
          router.push("/user");
        }
      }
    }
  }, [path, status, data, isLoading, router]);

  return <>{children}</>;
}
