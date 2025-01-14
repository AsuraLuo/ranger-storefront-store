import { serverCookies } from "@/utils/cookies";

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

interface Cookie {
  setItem: (name: string, value: string, options?: Options) => void;
  getItem: (name: string) => string;
  getAll: () => any;
  removeItem: (name: string, options?: Options) => void;
}

export const useCookies = () => {
  const cookie: Cookie = {
    setItem: (name: string, value: string, options?: Options) => {
      serverCookies.setItem(null, name, value, options);
    },
    getItem: (name: string) => serverCookies.getItem(null, name),
    getAll: () => serverCookies.getAll(null),
    removeItem: (name: string, options?: Options) => {
      serverCookies.removeItem(null, name, options);
    },
  };

  return {
    cookie,
  };
};
