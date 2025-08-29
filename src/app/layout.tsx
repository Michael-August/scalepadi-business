import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner'
import "./globals.css";
import { Providers } from "@/components/wrappers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScalePadi for Business",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} lg:w-[1440px] lg:max-w-[1440px] lg:mx-auto w-screen`}>
        <Toaster richColors />
        <Providers>
          <div className="flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
