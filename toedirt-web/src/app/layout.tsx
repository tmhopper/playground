import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { CartDrawer } from "@/components/shop/CartDrawer";

export const metadata: Metadata = {
  title: "Toe Dirt — Rugged. Raw. Ready.",
  description:
    "Toe Dirt is a classy, down-to-earth construction guy with a side hustle you didn't know you needed. Packages, merch, and Bob.",
  openGraph: {
    title: "Toe Dirt",
    description: "Rugged. Raw. Ready.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <AgeGate />
      </body>
    </html>
  );
}
