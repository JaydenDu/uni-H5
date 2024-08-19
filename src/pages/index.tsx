import { RouterProvider, createHashRouter } from "react-router-dom";
import Home from "./Home";
import Apply from "./Apply";
import Card from "./Card";
import Recharge from "./Recharge";
import Equity from "./Equity";
import CardInfo from "./CardInfo";
import History from "./History";
import SignIn from "./Login/SignIn";
import Reapply from "./Reapply";

const rootLoader = async () => {
  return {};
};

const router = createHashRouter([
  {
    path: "/",
    loader: rootLoader,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Card",
        element: <Card />,
      },
      {
        path: "/Apply/:id",
        element: <Apply />,
      },
      {
        path: "/Recharge/:id",
        element: <Recharge />,
      },
      {
        path: "/Equity/:id",
        element: <Equity />,
      },
      {
        path: "/CardInfo/:id",
        element: <CardInfo />,
      },
      {
        path: "/History/:id",
        element: <History />,
      },
      {
        path: "/Login",
        element: <SignIn />,
      },
      {
        path: "/Reapply/:id",
        element: <Reapply />,
      },
    ],
  },
]);

export default () => {
  return <RouterProvider router={router} />;
};
