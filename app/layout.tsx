import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import "@fontsource-variable/noto-sans-bengali";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Ticker, { TickerSkeleton } from "@/components/Ticker";
import Footer from "@/components/Footer";
import { getCategories, type Category } from "@/lib/api";

export const metadata: Metadata = {
  title: { default: "বাজার দর — BazarDor", template: "%s | বাজার দর" },
  description: "প্রয়োজনীয় পণ্যের দৈনিক বাজারদর এক নজরে।",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {}

  return (
    <html lang="bn" data-theme="bazardor">
      <body className="flex min-h-screen flex-col bg-base-100 text-base-content">
        <Navbar categories={categories} />
        <Suspense fallback={<TickerSkeleton />}>
          <Ticker />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
