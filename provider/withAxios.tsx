import { Component } from "react";

import { createInstance } from "./createInstance";

export const withAxios = (App: any) =>
  class AppWithAxios extends Component {
    private axiosInstance: any;

    static async getInitialProps(appContext: any) {
      const { router } = appContext;
      const { locale } = router;

      const instance = createInstance({ locale });
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
      };
    }

    constructor(props: any) {
      super(props);
      this.axiosInstance = createInstance({ locale: props?.router?.locale });
    }

    render() {
      return <App axiosInstance={this.axiosInstance} {...this.props} />;
    }
  };
