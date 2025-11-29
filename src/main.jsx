import { StrictMode } from "react"; //helps you avoid future bugs
import { createRoot } from "react-dom/client";//Start the app inside this HTML element (root).
import { BrowserRouter } from "react-router-dom";//Manage the URLs and change pages without refreshing.”
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
