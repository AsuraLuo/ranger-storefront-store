import { parse } from "cookie";

export const parsetCookies = (url: string) => {
  const cookies = parse(url);
  return cookies;
};
