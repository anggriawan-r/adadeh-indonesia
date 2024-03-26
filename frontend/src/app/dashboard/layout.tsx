"use client";

import { Inter } from "next/font/google";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdMenu } from "react-icons/md";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [show, setShow] = useState(false);
  const handleButton: any = () => setShow(!show);
  return (
    <section className="relative z-10 flex min-h-screen gap-4 bg-white">
      <Button
        variant={"ghost"}
        className="absolute right-1 top-4 inline-flex h-10 w-10 border border-slate-200 p-0 md:hidden"
        onClick={() => handleButton()}
      >
        <MdMenu className="text-xl" />
      </Button>
      <div
        className={`fixed bottom-0 top-0 z-20 w-3/4 bg-white md:static md:basis-1/5 ${show ? "left-0" : "left-[-100%]"}  left-0 border-r border-slate-200 duration-500 ease-in-out`}
      >
        <Sidebar click={handleButton} />
      </div>
      <div className="md:basis-4/5">{children}</div>
    </section>
  );
}
