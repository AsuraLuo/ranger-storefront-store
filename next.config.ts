import type { NextConfig } from "next";

import { domainConf } from "@/config/domain.conf";

const { i18n } = domainConf;

const nextConfig: NextConfig = {
  reactStrictMode: false,
  basePath:
    i18n.currentLocale === i18n.defaultLocale ? "" : `/${i18n.currentLocale}`,
  i18n: {
    defaultLocale: i18n.currentLocale,
    locales: [i18n.currentLocale],
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
