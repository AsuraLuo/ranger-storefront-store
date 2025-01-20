import { useEffect } from "react";
import Button from "@mui/material/Button";

import { useRouter } from "@/hooks/Router";
import { useAxios } from "@/provider";
import { clientCookie } from "@/utils/client";
import Link from "@/components/Link";
import { StyledHeader, StyledInner, StyledActions } from "./styled";

const Header = () => {
  const axiosInstance = useAxios();
  const router = useRouter();

  const onRedirect = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    console.info("CSR Cookies:", clientCookie.getItem("i18n"));
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const { data } = await axiosInstance.get(
          "/api/config/api/mallConfig/getCurrentTime"
        );
        console.info(data);
      } catch (error) {
        console.info(error);
      }
    };

    fetchApi();
  }, [axiosInstance]);

  return (
    <StyledHeader>
      <StyledInner>
        <div className="grid">
          <Link href="/">Website Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
          <Link href="/store/retail">URL Key</Link>
        </div>
        <div className="grid">
          <Link href="/store">Store Home</Link>
          <Link href="/store/cart">Cart</Link>
          <Link href="/store/checkout">Checkout</Link>
          <Link href="/store/found">Resolver Page</Link>
        </div>
        <div className="grid">
          <Link href="/choose-country">Choose Country</Link>
          <Link href="/support">Support</Link>
        </div>
      </StyledInner>
      <StyledActions>
        <div className="grid">
          <Button
            variant="contained"
            onClick={() => {
              // clientCookie.setItem("i18n", {
              //   locale: "en",
              //   params: {
              //     "global.yes": "Yes",
              //     "global.no": "No",
              //   },
              // });
              clientCookie.setItem("i18n", "10086");
              onRedirect("/login");
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onRedirect("/register");
            }}
          >
            Register
          </Button>
        </div>
        <div className="grid">
          <Button
            variant="contained"
            onClick={() => {
              onRedirect("/store/cart");
            }}
          >
            Cart
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onRedirect("/store/checkout");
            }}
          >
            Checkout
          </Button>
        </div>
        <div className="grid">
          <Button
            variant="contained"
            onClick={() => {
              onRedirect("/choose-country");
            }}
          >
            Choose Country
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onRedirect("/support");
            }}
          >
            Support
          </Button>
        </div>
      </StyledActions>
    </StyledHeader>
  );
};

export default Header;
