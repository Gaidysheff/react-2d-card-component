import "./index.css";

import App from "./App.tsx";
import { StrictMode } from "react";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <TooltipProvider>
    <StrictMode>
      <App />
    </StrictMode>
    ,
  </TooltipProvider>,
);
