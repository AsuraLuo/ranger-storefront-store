import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

import { domainConf } from "@/config/domain.conf";

const {
  ip,
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

  // Get the IP address
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // Check for forwarded IP
    request.headers.get("x-real-ip") || // Alternate forwarded IP header
    "Unknown IP";

  console.log("Client IP:", ipAddress);

  // Handle other requests normally
  const response = NextResponse.next();
  response.headers.set(cookie.key, locale);
  response.headers.set(ip.key, ipAddress);
  response.cookies.set(cookie.key, locale, cookie.options);
  response.cookies.set(ip.key, ipAddress, cookie.options);
  return response;
};

export const config = {
  matcher: [
    "/", // Required when i18n is enabled, otherwise middleware won't be executed on index route
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|sitemap.xml|robots.txt|manifest.json).*)",
  ],
};
