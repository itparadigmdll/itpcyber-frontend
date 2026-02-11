import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter, Route, Routes } from "react-router";
import Index from "./pages";
import Rankings from "./pages/rankings";
import Achievements from "./pages/achievement";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/achievement" element={<Achievements />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
