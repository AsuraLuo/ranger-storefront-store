import NextLink from "next/link";
import type { LinkProps } from "next/link";

import { domainConf } from "@/config/domain.conf";

const { i18n, whiteList } = domainConf;

const Link: React.FC<LinkProps & { children: React.ReactNode }> = ({
  children,
  href = "",
  prefetch = true,
  ...props
}) => {
  if (typeof href === "string") {
    const validWhite = whiteList.includes(href);
    const params = validWhite ? { locale: i18n.defaultLocale } : {};
    return (
      <NextLink href={href} prefetch={prefetch} {...params} {...props}>
        {children}
      </NextLink>
    );
  }

  const validWhite = whiteList.includes(href.pathname as string);
  const params = validWhite ? { locale: i18n.defaultLocale } : {};
  return (
    <NextLink href={href} prefetch={prefetch} {...params} {...props}>
      {children}
    </NextLink>
  );
};

export default Link;
