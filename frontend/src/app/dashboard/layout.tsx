"use client"

import { Inter } from "next/font/google";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdMenu } from "react-icons/md";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [show, setShow] = useState(false)
  const handleButton: any = () => setShow(!show)
  return (
    <section className="relative z-10 bg-white flex min-h-screen gap-4">
        <Button variant={"ghost"} className="md:hidden inline-flex absolute w-10 h-10 top-4 right-1 p-0 border border-slate-200" onClick={()=>handleButton()}>
            <MdMenu className="text-xl" />
        </Button>
        <div className={`md:basis-1/5 w-3/4 md:static fixed top-0 bottom-0 z-20 bg-white ${show? "left-0" : "left-[-100%]"}  border-r border-slate-200 left-0 duration-500 ease-in-out`}>
            <Sidebar click={handleButton} />
        </div>
        <div className="md:basis-4/5">
            {children}
        </div>
    </section>
  );
}
