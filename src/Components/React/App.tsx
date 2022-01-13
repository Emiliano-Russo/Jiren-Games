import "../Sass/App.scss";
// React
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Downloads } from "../../Screens/React/Downloads";
import { Store } from "../../Screens/React/Store";
import { Library } from "../../Screens/React/Library";

export default function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Store />} />
          <Route path="/download" element={<Downloads />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
