import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

import { domainConf } from "@/config/domain.conf";

const {
  i18n: { defaultLocale },
  cookie,
  whiteList,
} = domainConf;

export const middleware: NextMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  const { locale } = url;

  // Check if pathname starts with a locale and is in the whitelist
  if (whiteList.includes(pathname) && locale !== defaultLocale) {
    url.locale = defaultLocale;
    const redirectReponse = NextResponse.redirect(url);
    // Set cookies for locale
    redirectReponse.headers.set(cookie.key, defaultLocale);
    redirectReponse.cookies.set(cookie.key, defaultLocale, cookie.options);
    return redirectReponse;
  }

  // Handle other requests normally
  const reponse = NextResponse.next();
  reponse.headers.set(cookie.key, locale);
  reponse.cookies.set(cookie.key, locale, cookie.options);
  return reponse;
};

export const config = {
  matcher: [
    "/", // Required when i18n is enabled, otherwise middleware won't be executed on index route
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|sitemap.xml|robots.txt|manifest.json).*)",
  ],
};
