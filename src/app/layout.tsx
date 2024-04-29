/*
 * @Author: kasuie
 * @Date: 2024-04-26 11:51:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-29 09:20:49
 * @Description:
 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/providers";
import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "个人喜好表",
  description: "个人喜好表",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
