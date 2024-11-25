import type { NextConfig } from "next";

import { domainConf } from "@/config/domain.conf";

const { i18n } = domainConf;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: i18n.defaultLocale,
    locales: i18n.locales,
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
