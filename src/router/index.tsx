import { createBrowserRouter, Link } from "react-router-dom";
import { Signup } from "../components/Auth/Signup";
import { ErrorPage } from "./error-page";
import { Post } from "../components/post/Post";
import { Login } from "../components/Auth/Login";
import { Logout } from "../components/Auth/Logout";
import { Layout } from "./layout";
import Root from "../components/root";

const at = localStorage.getItem("at");
const blacklist = ["signup", "login", "post"];
function Router() {
  const loggedInUserRoute = at
    ? routes.filter((route) => !blacklist.includes(route.path))
    : routes;

  return createBrowserRouter(loggedInUserRoute);
}

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "board",
        element: <h1>Board</h1>,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
];
export { Router };
