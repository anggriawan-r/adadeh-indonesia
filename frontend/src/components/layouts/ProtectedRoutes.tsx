"use client";

import { loginRoutes, protectedRoutes } from "@/lib/constants";
import { useLogin } from "@/stores/useAuth";
import { usePathname, redirect } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, data } = useLogin();
  const path = usePathname();

  useEffect(() => {
    if (status) {
      if (loginRoutes.includes(path)) {
        if(data?.user){
          if(data?.user.role == "admin"){
            redirect("/dashboard")
          }else{
            redirect("/")
          }
        }
      }
    } else {
      if (protectedRoutes.includes(path)) {
        redirect("/auth/signin");
      }
    }
  }, [path, status]);

  return <>{children}</>;
}
