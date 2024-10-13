import React from "react";
import ReactDOM from "react-dom/client";

import Router from "./routes";

import { AuthProvider } from "./AuthContext";
import "./styles/buttons.css";
import "./styles/global.css";
import "./styles/tables.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
