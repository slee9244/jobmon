import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { JobProvider } from "./context/JobContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        <UserProvider>
          <JobProvider>
            <App />
          </JobProvider>
        </UserProvider>
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>
);
