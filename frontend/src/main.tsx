import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <LoginProvider>
        <App />
      </LoginProvider>
    </Router>
  </React.StrictMode>
);
