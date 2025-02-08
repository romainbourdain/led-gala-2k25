import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LEDWallApp } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LEDWallApp />
  </StrictMode>
);
