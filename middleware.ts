import { NextResponse } from "next/server";
import type { NextRequest, NextMiddleware } from "next/server";

import { domainConf } from "@/config/domain.conf";

const {
  ip,
  i18n: { defaultLocale, locales },
  cookie,
  whiteList,
} = domainConf;

export const middleware: NextMiddleware = async (request: NextRequest) => {
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

  // Get the client's IP address
  const ipAddress =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || // Check for forwarded IP
    request.headers.get("x-real-ip") || // Alternate forwarded IP header
    "127.0.0.1"; // Default for localhost or unknown

  console.log("Client IP:", ipAddress);

  // Call an external geolocation service
  try {
    const start = +new Date();
    console.info("middleware ip query cost...", +new Date() - start);
    const geoResponse = await fetch(
      `https://api.ipbase.com/v2/info?ip=${ipAddress}&apikey=${ip.apikey}`
    );
    const geoData = await geoResponse.json();
    console.info("middleware ip query cost...", +new Date() - start);

    // Determine the locale based on the geolocation data
    const country: any = geoData?.data?.location?.country; // Default to 'US' if no data
    const countryCode: string = (country?.alpha2 ?? "").toLowerCase();
    const countryName: string = country?.name ?? "";
    const realLocale = countryCode === "US" ? "en" : countryCode;

    // Auto location to match store
    if (locales.includes(realLocale)) {
      if (locale === realLocale) {
        // Handle other requests normally
        const response = NextResponse.next();
        response.headers.set(cookie.key, locale);
        response.headers.set(ip.key, ipAddress);
        response.headers.set(ip.countryKey, countryName);
        response.cookies.set(cookie.key, locale, cookie.options);
        response.cookies.set(ip.key, ipAddress, cookie.options);
        response.cookies.set(ip.countryKey, countryName, cookie.options);
        return response;
      } else {
        url.locale = realLocale;
        const redirectReponse = NextResponse.redirect(url);
        // Set cookies for locale
        redirectReponse.headers.set(cookie.key, realLocale);
        redirectReponse.cookies.set(cookie.key, realLocale, cookie.options);
        return redirectReponse;
      }
    }

    // Handle other requests normally
    const response = NextResponse.next();
    response.headers.set(cookie.key, locale);
    response.headers.set(ip.key, ipAddress);
    response.headers.set(ip.countryKey, countryName);
    response.cookies.set(cookie.key, locale, cookie.options);
    response.cookies.set(ip.key, ipAddress, cookie.options);
    response.cookies.set(ip.countryKey, countryName, cookie.options);
    return response;
  } catch (error) {
    console.info("error:", error);
  }
};

export const config = {
  matcher: [
    "/", // Required when i18n is enabled, otherwise middleware won't be executed on index route
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|images|sitemap.xml|robots.txt|manifest.json).*)",
  ],
};
