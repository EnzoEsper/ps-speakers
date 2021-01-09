import React, { useCallback, useContext } from "react";
import {
  ThemeProvider,
  ThemeContext,
  THEMELIST,
} from "../../contexts/ThemeContext";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";

const LayoutComponent = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const classNameValue =
    theme === THEMELIST.LIGHT
      ? "overflow-auto bg-white"
      : "overflow-auto bg-gray-700";
  return (
    <div className={classNameValue}>
      <div className="mx-4 my-3">
        <Header />
        <Menu />
        {children}
        <Footer />
      </div>
    </div>
  );
};

const Layout = ({ children }) => (
  <ThemeProvider startingTheme={THEMELIST.LIGHT}>
    <LayoutComponent>{children}</LayoutComponent>
  </ThemeProvider>
);

export default Layout;
