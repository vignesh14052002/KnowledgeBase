import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Graph from "./Graph.js";

import App from "./App";
import SolutionBuilder from "./pages/SolutionBuilder/SolutionBuilder.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/solution-builder" element={<SolutionBuilder />} />
    </Routes>
  </BrowserRouter>
);
