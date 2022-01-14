import React from "react";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Tags from "./routes/tags";
import Admin from "./routes/admin";
import Front from "./routes/front";
const rootElement = document.getElementById("root");

/**
 * Function that sets up Router
 */
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Front />} />
        <Route path="tags" element={<Tags />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
