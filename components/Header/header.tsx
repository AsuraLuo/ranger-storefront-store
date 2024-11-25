import Link from "next/link";

import { StyledHeader, StyledInner } from "./styled";

const Header = () => {
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
    </StyledHeader>
  );
};

export default Header;
