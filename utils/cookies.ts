import { destroyCookie, parseCookies, setCookie } from "nookies";

export interface Options {
  domain?: string;
  encode?: string;
  expires?: string;
  httpOnly?: boolean;
  maxAge?: number;
  path?: string;
  sameSite?: boolean | string;
  secure?: boolean;
}

const defaultOptions: Options = {
  maxAge: 60 * 60 * 24 * 1,
  path: "/",
  sameSite: "lax",
  secure: true,
};

const setItem = (
  ctx: any = null,
  name: string,
  value: string,
  options?: Options
) => {
  setCookie(ctx, name, value, { ...defaultOptions, ...options });
};

const getItem = (ctx: any = null, name: string) => {
  const cookies = parseCookies(ctx);
  return cookies[name];
};

const getAll = (ctx: any = null) => {
  const cookies = parseCookies(ctx);
  return cookies;
};

const removeItem = (ctx: any = null, name: string, options?: Options) => {
  destroyCookie(ctx, name, { ...defaultOptions, ...options });
};

export const serverCookies = {
  setItem,
  getItem,
  getAll,
  removeItem,
};
