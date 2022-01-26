import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Sass/Header.scss";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { ThemePicker } from "./ThemePicker";

import { useSelector } from "react-redux";

export function Header() {
  const [showAdminRoute, setShowAdminRoute] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const theme = useSelector((state) => state.theme.theme);

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
  }, [theme]);

  function escFunction(event: any) {
    if (event.keyCode === 123) {
      setShowAdminRoute((prev) => {
        localStorage.setItem("ShowAdminRoute", JSON.stringify(!prev));
        return !prev;
      });
    }
  }

  return (
    <div className="header" style={{ backgroundImage: theme.headerBackgroundColor }}>
      <div id="div">
        <Button
          id="hamburger"
          type="link"
          onClick={() => setDrawerVisible(true)}
          icon={<MenuOutlined style={{ color: theme.letterColor }} />}
        />
        <Drawer title="Hello :)" placement="left" onClose={() => setDrawerVisible(false)} visible={drawerVisible}>
          <ThemePicker />
        </Drawer>
        <h1 style={{ color: theme.letterColor }}>Jiren Games</h1>
      </div>
      <div id="links">
        <NavLink
          to="/wish"
          className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}
          style={{ color: theme.letterColor }}
        >
          Wish
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}
          style={{ color: theme.letterColor }}
        >
          Store
        </NavLink>
        <NavLink
          to="/download"
          className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}
          style={{ color: theme.letterColor }}
        >
          Downloads
        </NavLink>
        <NavLink
          to="/library"
          className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}
          style={{ color: theme.letterColor }}
        >
          Library
        </NavLink>
        {showAdminRoute ? (
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? "activeLink link" : "idleLink link")}
            style={{ color: theme.letterColor }}
          >
            Admin
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
