import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import "./index.css";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <a className="skip-to-content" href="#main">
      Skip To Content
    </a>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
