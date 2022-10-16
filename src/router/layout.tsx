import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";

const loginUserList = ["/", "post", "board", "logout"];
const list = ["/", "signup", "login", "board"];

const Layout = () => {
  const [at, setAt] = useState<string | null>("");
  const loggedInUserRoute = at ? loginUserList : list;
  let location = useLocation();

  useEffect(() => {
    setAt(localStorage.getItem("at"));
  }, [location]);

  return (
    <ul>
      {loggedInUserRoute.map((path) => {
        return (
          <li key={`LAYOUT_${path}`}>
            <Link to={path}>{path === "/" ? "home" : path}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export { Layout };
