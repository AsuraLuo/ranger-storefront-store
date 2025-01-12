import type { NextApiRequest, NextApiResponse } from "next/types";
import { createProxyMiddleware } from "http-proxy-middleware";

import { domainConf } from "@/config/domain.conf";

const { i18n } = domainConf;

const apiMap: any = {
  en: "https://uat-api.olightstore.com",
  uk: "https://uat-api.olightstore.uk",
  fr: "https://uat-api.olightstore.fr",
  ca: "https://uat-api.olightstore.ca",
};

const apiProxy: any = createProxyMiddleware({
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    "^/api": "",
  },
  router: async (req: any) => {
    const locale: string =
      req?.headers?.["x-locale-code"] || i18n.defaultLocale;
    return apiMap?.[locale] ?? apiMap?.[i18n.defaultLocale];
  },
} as any);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  apiProxy(req, res, (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default handler;
