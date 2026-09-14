import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./store/AuthContext";
import { BookProvider } from "./store/BookContext";
import { ToastProvider } from "./store/ToastContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BookProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </BookProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
