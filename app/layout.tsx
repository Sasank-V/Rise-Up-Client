import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Providers } from "@/components/providers";
import { outfit } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "RiseUp - Empowering Youth with Skills and Opportunities",
  description: "Platform for youth to gain skills and find job opportunities",
  icons: ["/logo.svg"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <div className={`flex min-h-screen flex-col ${outfit.className}`}>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
