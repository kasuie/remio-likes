/*
 * @Author: kasuie
 * @Date: 2024-04-26 14:08:55
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-28 15:54:26
 * @Description:
 */
"use client";

import { ThemeProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";

export function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  return (
    <NextUIProvider
      navigate={router.push}
      className="relative flex h-screen flex-col"
    >
      <ThemeProvider key="themeProvider" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </NextUIProvider>
  );
}
