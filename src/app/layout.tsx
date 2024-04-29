/*
 * @Author: kasuie
 * @Date: 2024-04-26 11:51:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-29 15:01:48
 * @Description:
 */
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/providers";
import "@/styles/index.css";
import { siteConfig } from "@/config/app.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  creator: "kasuie",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icons/favicon192.png",
    apple: "/icons/apple-touch.png",
  },
  openGraph: {
    title: {
      default: siteConfig.name,
      template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.domain}/icons/favicon64.png`,
        width: 800,
        height: 600,
      },
      {
        url: `${siteConfig.domain}/icons/favicon192.png`,
        width: 1800,
        height: 1600,
        alt: siteConfig.name,
      },
    ],
    locale: "zh_CN",
    type: "website",
    url: siteConfig.domain,
  },
};

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#000212" },
      { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    ],
    width: "device-width",
    initialScale: 1,
    userScalable: false,
    minimumScale: 1,
    maximumScale: 1,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
