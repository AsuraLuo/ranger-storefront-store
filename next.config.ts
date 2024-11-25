import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    locales: ["au", "at", "ca", "de", "en", "es", "fr", "it", "jp", "kr", "th"],
  },
  compiler: {
    emotion: {
      sourceMap: false,
      autoLabel: "dev-only",
      labelFormat: "[local]",
    },
  },
};

export default nextConfig;
