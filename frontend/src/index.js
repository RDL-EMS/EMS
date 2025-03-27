import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // ✅ Ensure Router is used only once
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode> {/* ✅ Helps detect potential issues in development */}
    <Router> {/* ✅ Keep Router only here, not in App.js */}
      <App />
    </Router>
  </React.StrictMode>
);
