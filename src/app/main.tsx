import ReactDOM from "react-dom/client";
import "./index.css";

import { App } from "./app";

import("@/shared/api/msw")
  .then(({ worker }) => worker.start())
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
  });
