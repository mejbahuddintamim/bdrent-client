import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import App from "./App";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="font-poppins">
    <AuthProvider>
      <Toaster />
      <App />
    </AuthProvider>
  </div>
);
