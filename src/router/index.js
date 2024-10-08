import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/index";
import Home from "../views/home";
import Ranking from "../views/ranking";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 使用 Layout 组件包裹其他页面
    children: [
      {
        index: true, // index 路由，表示默认渲染的页面
        element: <Home />,
      },
      {
        path: "ranking",
        element: <Ranking />,
      },
    ],
  },
]);

export default routes;
