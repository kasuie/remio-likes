/*
 * @Author: kasuie
 * @Date: 2024-04-26 11:51:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-05-14 16:07:48
 * @Description:
 */
import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/theme");

const UIThemes = {
  light: {
    extend: "light",
  },
  dark: {
    extend: "dark",
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|dropdown|spinner|link|button|skeleton|modal|select|input|chip).js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "mio-main": "hsl(var(--mio-background))",
        "mio-bg": "rgba(var(--mio-bg))",
        "mio-content": "rgba(var(--mio-text-default))",
      },
      textColor: {
        "mio-text-color": "rgba(var(--mio-text-color))",
        "mio-text-default": "hsl(var(--mio-foreground))",
      },
    },
  },
  plugins: [nextui({ prefix: "mio", themes: UIThemes })],
};
export default config;
