import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import AuthProvider from "./providers/authProvider";
import { useAuth } from "./hooks/index.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./slices/index.js";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales/index.js";
import { io } from "socket.io-client";
import SocketPovider from "./providers/socketProvider";
import { actions as messagesActions } from "./slices/messagesSlice.js";
import { actions as channelsActions } from "./slices/channelsSlice";

const PrivateRoute = ({ children }) => {
  const { authInfo } = useAuth();

  return authInfo ? children : <Navigate to="/login"></Navigate>;
};

const App = () => {
  i18next
    .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
    .init({
      lng: "ru",
      resources, // передаем переводы текстов интерфейса в формате JSON
    });

  const socket = io();
  socket.on("newMessage", (message) => {
    store.dispatch(messagesActions.addMessage(message));
  });
  socket.on("newChannel", (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });
  socket.on("renameChannel", ({ id, name }) => {
    const newObj = {
      id,
      changes: {
        name,
      },
    };
    store.dispatch(channelsActions.renameChannel(newObj));
  });
  socket.on("removeChannel", ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  return (
    <Router>
      <AuthProvider>
        <SocketPovider socket={socket}>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Chat />
                </PrivateRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SocketPovider>
      </AuthProvider>
    </Router>
  );
};

export default App;
