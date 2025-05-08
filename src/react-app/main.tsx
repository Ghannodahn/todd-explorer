import { createRoot } from "react-dom/client";
import 'tailwindcss/tailwind.css'
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <App />
);
