/*
 * @Author: kasuie
 * @Date: 2024-04-26 11:51:38
 * @LastEditors: kasuie
 * @LastEditTime: 2024-04-27 17:24:23
 * @Description:
 */
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "standalone",
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 3,
  },
  experimental: {
    serverMinification: true,
  },
  compiler: {
    removeConsole: isProd,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const ret = [
      {
        source: "/apis/:path*",
        destination: "https://kasuie.cc/apis/:path*",
      },
      {
        source: "/bapi/:path*",
        destination: "https://api.bgm.tv/:path*",
      },
      {
        source: "/bpic/:path*",
        destination: "http://lain.bgm.tv/:path*",
      },
    ];
    return {
      beforeFiles: ret,
    };
  },
};

export default nextConfig;
