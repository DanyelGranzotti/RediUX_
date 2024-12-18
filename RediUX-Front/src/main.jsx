import React from "react";
import ReactDOM from "react-dom/client";

import Router from "./routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./AuthContext";

import "./styles/buttons.css";
import "./styles/global.css";
import "./styles/tables.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer autoClose={2000} hideProgressBar pauseOnFocusLoss={false} />
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
