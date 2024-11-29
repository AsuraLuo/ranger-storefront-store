import type { CookieSerializeOptions } from "@/interface/cookie";

type DomainConf = {
  ip: {
    key: string;
    countryKey: string;
    apiKey: string;
    apiUrl: string;
  };
  i18n: {
    locales: string[];
    defaultLocale: string;
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
    locales: [
      "en-US",
      "uk",
      "au",
      "at",
      "ca",
      "de",
      "es",
      "fr",
      "it",
      "jp",
      "kr",
      "th",
    ],
    defaultLocale: "en-US",
  },
  cookie: {
    key: "x-store-code",
    options: {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    },
  },
  whiteList: ["/choose-country"],
};
