import { NextRouter, useRouter as useNextRouter } from "next/router";
import type { UrlObject } from "url";

import { domainConf } from "@/config/domain.conf";
import { usePathContext } from "@/provider/PathProvider";

type Url = UrlObject | string;

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export const useRouter = (): NextRouter => {
  const router = useNextRouter();
  const {
    i18n: { defaultLocale, locales },
  } = domainConf;
  const { basePath = "", locale } = usePathContext();
  const prefix: string = locale === defaultLocale ? "" : `/${locale}`;
  const isSlash: boolean = router.pathname === "/";

  const onPush = (
    url: Url,
    as?: Url,
    options?: TransitionOptions
  ): Promise<boolean> => {
    if (typeof url === "string") {
      return router.push(`${prefix}${basePath}${url}`, as, options);
    }

    return router.push(
      {
        ...url,
        pathname: `${prefix}${basePath}${url.pathname}`,
      },
      as,
      options
    );
  };

  const onReplace = (
    url: Url,
    as?: Url,
    options?: TransitionOptions
  ): Promise<boolean> => {
    if (typeof url === "string") {
      return router.replace(`${prefix}${basePath}${url}`, as, options);
    }

    return router.replace(
      {
        ...url,
        pathname: `${prefix}${basePath}${url.pathname}`,
      },
      as,
      options
    );
  };

  return {
    ...router,
    basePath,
    defaultLocale,
    pathname: `${prefix}${basePath}${isSlash ? "" : router.pathname}`,
    locale,
    locales,
    push: onPush,
    replace: onReplace,
  };
};
