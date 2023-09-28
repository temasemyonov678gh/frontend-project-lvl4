import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import AuthProvider from "./providers/authProvider";
import { useAuth } from "./hooks/index.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./slices/index.js";
import { io } from "socket.io-client";
import SocketPovider from "./providers/socketProvider";
import { actions as messagesActions } from "./slices/messagesSlice.js";

const PrivateRoute = ({ children }) => {
  const { authInfo } = useAuth();

  return authInfo ? children : <Navigate to="/login"></Navigate>;
};

const App = () => {
  const socket = io();
  socket.on("newMessage", (message) => {
    store.dispatch(messagesActions.addMessage(message));
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SocketPovider>
      </AuthProvider>
    </Router>
  );
};

export default App;
