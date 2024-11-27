import type { CookieSerializeOptions } from "@/interface/cookie";

type DomainConf = {
  ip: {
    key: string;
    countryKey: string;
    apikey: string;
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
    apikey: "ipb_live_nwgWUvuG2YXDTaP8gjdb9jlWkIMqdoS4XFOqAey2",
  },
  i18n: {
    locales: ["au", "at", "ca", "de", "en", "es", "fr", "it", "jp", "kr", "th"],
    defaultLocale: "en",
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
