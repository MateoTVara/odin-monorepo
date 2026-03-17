import type { RouteObject } from "react-router";
import { protectedLoader } from "../lib/protectedLoader";
import App from "../App"
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PostEdit from "../pages/PostEdit";
import PostCreate from "../pages/PostCreate";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "posts/new", element: <PostCreate /> },
      { path: "posts/:postId/edit", element: <PostEdit /> }
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