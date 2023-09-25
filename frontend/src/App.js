import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import NotFound from './pages/NotFound';
import AuthProvider from './providers/authProvider';
import { useAuth } from './hooks/index.js';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute = ({ children }) => {
  const { authInfo } = useAuth();

  return (
      (authInfo) ? children : <Navigate to="/login"></Navigate>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={(
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          )} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
