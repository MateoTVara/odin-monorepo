import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Level from "../pages/Level";
import Root from "../Root";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "levels/:id", Component: Level },
      { path: "*", Component: NotFound }
    ]
  }
]);

export default router;