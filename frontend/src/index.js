import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Ensure Router is used only once
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>  {/* ✅ Router should be here, not in App.js */}
    <App />
  </BrowserRouter>
);
