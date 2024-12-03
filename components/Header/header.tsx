import { useEffect } from "react";
import Button from "@mui/material/Button";

import { useAxios } from "@/provider";
import { useRouter } from "@/hooks/Router";
import Link from "@/components/Link";
import { StyledHeader, StyledInner, StyledActions } from "./styled";

const Header = () => {
  const axiosInstance = useAxios();
  const router = useRouter();

  const onRedirect = (url: string) => {
    router.push(url);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await axiosInstance.get(
        "/api/config/api/mallConfig/getCurrentTime"
      );
      console.info(data);
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
