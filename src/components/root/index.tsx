import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "../../router/layout";

export default function Root() {
  return (
    <>
      <div id="sidebar">
        <h1>HOME</h1>
        <nav>
          <Layout />
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
