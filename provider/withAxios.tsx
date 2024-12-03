import { Component } from "react";

import { createInstance } from "./createInstance";

export const withAxios = (App: any) =>
  class AppWithAxios extends Component {
    private axiosInstance: any;

    static async getInitialProps(appContext: any) {
      const { router } = appContext;
      const { locale } = router;

      const isServer: boolean = typeof window === "undefined";
      const proto: string = isServer
        ? appContext.ctx?.req?.headers?.["x-forwarded-proto"] ?? ""
        : window.location.protocol;
      const host: string = isServer
        ? appContext.ctx?.req?.headers?.host ?? ""
        : window.location.host;
      const domain: string = isServer
        ? `${proto}://${host}`
        : `${proto}//${host}`;

      const instance = createInstance({ domain, locale });
      // Provide the apollo to getInitialProps of pages
      appContext.ctx.axiosInstance = instance;

      // Run wrapped getInitialProps methods
      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        axiosInstance: instance,
        domain,
      };
    }

    constructor(props: any) {
      super(props);
      this.axiosInstance = createInstance({
        locale: props?.router?.locale,
        domain: props?.domain,
      });
    }

    render() {
      return <App axiosInstance={this.axiosInstance} {...this.props} />;
    }
  };
