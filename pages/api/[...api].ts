import type { NextApiRequest, NextApiResponse } from "next/types";
// import { createProxyMiddleware } from "http-proxy-middleware";

import { domainConf } from "@/config/domain.conf";

const { i18n } = domainConf;

// const apiProxy: any = createProxyMiddleware({
//   changeOrigin: true,
//   secure: true,
//   pathRewrite: {
//     "^/api": "",
//   },
//   router: async (req: any) => {
//     const locale: string =
//       req?.headers?.["x-locale-code"] || i18n.defaultLocale;
//     console.log("locale:", locale);

//     const ipAddress =
//       req.headers?.["x-forwarded-for"]?.split(",")[0]?.trim() || // Check for forwarded IP
//       req.headers?.["x-real-ip"] || // Alternate forwarded IP header
//       "127.0.0.1"; // Default for localhost or unknown
//     return `${ip.apiUrl}?apiKey=${ip.apiKey}&ip=${ipAddress}&lang=${locale}`;
//   },
// } as any);

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const locale = req.headers?.["x-locale-code"] as string;
  console.log("locale:", locale);

  if (!i18n.locales.includes(locale)) {
    res.status(400).json({ error: "Unsupported locale" });
    return;
  }

  return res.status(200).json({ locale });
  // apiProxy(req, res, (result: unknown) => {
  //   if (result instanceof Error) {
  //     throw result;
  //   }

  //   throw new Error(
  //     `Request '${req.url}' is not proxied! We should never reach here!`
  //   );
  // });
};

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default handler;
