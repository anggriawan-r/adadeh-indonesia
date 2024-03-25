import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import ProtectedRoutes from "@/components/layouts/ProtectedRoutes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adadeh Indonesia",
  description:
    "Toko Online Resmi Adadeh Indonesia menyediakan produk terbaik mulai dari sepatu olahraga hingga sneaker untuk semua kebutuhan Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="SB-Mid-client-5o_Ubr0-SXDlQGP-"
        ></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
