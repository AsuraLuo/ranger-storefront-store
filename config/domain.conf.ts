import type { CookieSerializeOptions } from "@/interface/cookie";

type DomainConf = {
  ip: {
    key: string;
    countryKey: string;
    apiKey: string;
    apiUrl: string;
  };
  i18n: {
    currentLocale: string;
    defaultLocale: string;
    locales: string[];
  };
  cookie: {
    key: string;
    options: CookieSerializeOptions;
  };
  whiteList: string[];
};

export const domainConf: DomainConf = {
  ip: {
    key: "x-real-ip",
    countryKey: "x-country-name",
    apiKey: "e8bf7e7d68a74486866272be6d07b9ea",
    apiUrl: "https://api.ipgeolocation.io/ipgeo",
  },
  i18n: {
    currentLocale: process.env.NEXT_PUBLIC_CURRENT_LOCALE as string,
    defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE as string,
    locales: ["en", "at", "de", "au", "ca", "uk", "es", "fr", "it", "jp", "kr"],
  },
  cookie: {
    key: "x-store-code",
    options: {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
    },
  },
  whiteList: [""],
};
