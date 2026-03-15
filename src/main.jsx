import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SynoLingua from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SynoLingua />
  </StrictMode>
);
