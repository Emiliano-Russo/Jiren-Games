import "../Sass/App.scss";
// React
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./Header";
import { Download } from "../../Screens/React/Download";
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
          <Route path="/download" element={<Download />} />
          <Route path="/library" element={<Library />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
