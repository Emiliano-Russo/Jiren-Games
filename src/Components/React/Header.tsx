import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Sass/Header.scss";

export function Header() {
  const [showAdminRoute, setShowAdminRoute] = useState(false);

  useEffect(() => {
    const result = localStorage.getItem("ShowAdminRoute");
    if (result != null) {
      const showAdmin = JSON.parse(result);
      if (showAdmin) setShowAdminRoute(true);
    }
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  function escFunction(event: any) {
    if (event.keyCode === 123) {
      console.log("F12 Pressed");
      setShowAdminRoute((prev) => {
        localStorage.setItem("ShowAdminRoute", JSON.stringify(!prev));
        return !prev;
      });
      //Do whatever when esc is pressed
    }
  }

  return (
    <div className="header">
      <h1>Jiren Games</h1>
      <div id="links">
        <NavLink to="/" className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}>
          Store
        </NavLink>
        <NavLink to="/download" className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}>
          Downloads
        </NavLink>
        <NavLink to="/library" className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}>
          Library
        </NavLink>
        {showAdminRoute ? (
          <NavLink to="/admin" className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}>
            Admin
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
