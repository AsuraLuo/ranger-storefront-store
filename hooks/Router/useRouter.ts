import { NextRouter, useRouter as useNextRouter } from "next/router";
import type { UrlObject } from "url";

import { domainConf } from "@/config/domain.conf";

type Url = UrlObject | string;

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

const { i18n, whiteList } = domainConf;

export const useRouter = (): NextRouter => {
  const router = useNextRouter();

  const onPush = (
    url: Url,
    as?: Url,
    options?: TransitionOptions
  ): Promise<boolean> => {
    if (typeof url === "string") {
      const validWhite = whiteList.includes(url);
      const params = validWhite ? { locale: i18n.defaultLocale } : {};
      return router.push(url, as, {
        ...options,
        ...params,
      });
    }

    const validWhite = whiteList.includes(url.pathname as string);
    const params = validWhite ? { locale: i18n.defaultLocale } : {};
    return router.push(
      {
        ...url,
        pathname: `${url.pathname}`,
      },
      as,
      { ...options, ...params }
    );
  };

  const onReplace = (
    url: Url,
    as?: Url,
    options?: TransitionOptions
  ): Promise<boolean> => {
    if (typeof url === "string") {
      const validWhite = whiteList.includes(url);
      const params = validWhite ? { locale: i18n.defaultLocale } : {};
      return router.replace(url, as, { ...options, ...params });
    }

    const validWhite = whiteList.includes(url.pathname as string);
    const params = validWhite ? { locale: i18n.defaultLocale } : {};
    return router.replace(
      {
        ...url,
        pathname: `${url.pathname}`,
      },
      as,
      { ...options, ...params }
    );
  };

  return {
    ...router,
    push: onPush,
    replace: onReplace,
  };
};
