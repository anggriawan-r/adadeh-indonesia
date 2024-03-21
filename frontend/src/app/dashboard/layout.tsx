import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/admin/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerse - Admin",
  description: "Admin operation",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="relative z-10 bg-white flex min-h-screen gap-4">
        <div className="basis-1/5 border-r border-slate-200">
            <Sidebar />
        </div>
        <div className="basis-4/5">
            {children}
        </div>
    </section>
  );
}
