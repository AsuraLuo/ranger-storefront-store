import React from "react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StyledMain } from "./styled";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </>
  );
};

export default AppLayout;
