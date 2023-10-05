import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./slices/index.js";
import { ToastContainer } from "react-toastify";
import {
  Provider as RollbarProvider,
  ErrorBoundary,
  LEVEL_WARN,
} from "@rollbar/react";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

const ErrorBoundaryPage = () => <NotFound />;

const rollbarConfig = {
  accessToken: process.env.REACT_APP_apiKey,
  environment: process.env.REACT_APP_NODE_ENV,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={ErrorBoundaryPage}>
        <Provider store={store}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);

reportWebVitals();
