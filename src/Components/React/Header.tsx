import React from "react";
import { NavLink } from "react-router-dom";
import "../Sass/Header.scss";

export function Header() {
  return (
    <div className="header">
      <h1>Jiren Entertainment</h1>
      <div id="links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "activeLink link" : "idleLink link"
          }
        >
          Store
        </NavLink>
        <NavLink
          to="/download"
          className={({ isActive }) =>
            isActive ? "activeLink link" : "idleLink link"
          }
        >
          Download
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) =>
            isActive ? "activeLink link" : "idleLink link"
          }
        >
          Library
        </NavLink>
      </div>
    </div>
  );
}
