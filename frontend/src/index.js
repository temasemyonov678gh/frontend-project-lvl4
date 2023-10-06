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
import Alert from "react-bootstrap/Alert";

const rollbarConfig = {
  enabled: process.env.REACT_APP_NODE_ENV === "production",
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: "production",
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: "0.0.1",
        guess_uncaught_frames: true,
      },
    },
  },
};

const CustomError = () => (
  <div className="error-section">
    <Alert className="alert" key="danger" variant="danger">
      <Alert.Heading className="alert-header">
        Упс!.. Что-то пошло не так.
      </Alert.Heading>
      <p className="alert-body">
        Извините, возникла ошибка на нашем сайте. Мы работаем над устранением
        проблемы и приносим свои извинения за неудобства. Пожалуйста, повторите
        попытку позже. Если ошибка продолжает возникать, пожалуйста, сообщите
        нам о ней, чтобы мы могли быстро исправить ситуацию. Спасибо за ваше
        терпение и понимание!
      </p>
    </Alert>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary level={LEVEL_WARN} fallbackUI={CustomError}>
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
