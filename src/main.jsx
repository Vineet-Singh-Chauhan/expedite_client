import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkspaceProvider } from "./context/WorkspaceProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <WorkspaceProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </WorkspaceProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
