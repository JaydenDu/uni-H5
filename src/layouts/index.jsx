import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="layout-content">
      <Outlet />
    </main>
  );
};

export default Layout;
