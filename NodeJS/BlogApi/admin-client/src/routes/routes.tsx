import type { RouteObject } from "react-router";
import { protectedLoader } from "../lib/protectedLoader";
import App from "../App"
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Dashboard /> }
    ]
  },
  {
    path: "/auth",
    children: [
      { path: "login", element: <Login /> }
    ]
  }
]

export default routes;