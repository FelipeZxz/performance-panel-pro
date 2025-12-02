import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// === REGISTRO DO SERVICE WORKER PARA PWA ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker registrado com sucesso"))
      .catch((err) => console.log("Erro ao registrar Service Worker:", err));
  });
}
