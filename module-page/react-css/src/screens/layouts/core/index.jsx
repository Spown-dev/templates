import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Mfe1CoreLayouts = () => {
  return (
    <div>
      <h1>Module Leadboard</h1>

      <nav style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/">Leadboard</NavLink>
        <NavLink to="/awp">Awp</NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Mfe1CoreLayouts;
