import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout-main">
      <main className="layout-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
