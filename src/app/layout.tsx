import type { Metadata } from "next";
import { LayoutContainer } from "@/components/layout-container";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "TRAI Startup Radar",
  description: "A lightweight tracker for AI startups in Türkiye.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">
        <div className="flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1 py-8 sm:py-10">
            <LayoutContainer>{children}</LayoutContainer>
          </main>
        </div>
      </body>
    </html>
  );
}
