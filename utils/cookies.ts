import { destroyCookie, parseCookies, setCookie } from "nookies";
import { isString } from "lodash-es";

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
  value: any,
  options?: Options
) => {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  setCookie(ctx, name, stringValue, { ...defaultOptions, ...options });
};

const readCookie = (value: string) => {
  if (!isString(value)) {
    return value;
  }

  try {
    const parsed = JSON.parse(value);
    return parsed;
  } catch (error) {
    console.info(error);
  }
};

const getItem = (ctx: any = null, name: string) => {
  const cookies = parseCookies(ctx);
  return readCookie(cookies[name]);
};

const getAll = (ctx: any = null) => {
  const cookies = parseCookies(ctx);
  return cookies;
};

const removeItem = (ctx: any = null, name: string, options?: Options) => {
  destroyCookie(ctx, name, { ...defaultOptions, ...options });
};

export const serverCookie = {
  setItem,
  getItem,
  getAll,
  removeItem,
};
