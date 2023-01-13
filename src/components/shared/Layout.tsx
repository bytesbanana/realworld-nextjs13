import React from "react";
import Header from "./Header";
interface Props {
  children: JSX.Element | React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
