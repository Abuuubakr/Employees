import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./components/store/store.ts";
import "./i18";
import Skeleton from "react-loading-skeleton";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense
        fallback={
          <div style={{ padding: "2rem" }}>
            <Skeleton height={40} width={`60%`} />
            <Skeleton height={30} count={5} style={{ marginTop: "1rem" }} />
          </div>
        }
      >
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
