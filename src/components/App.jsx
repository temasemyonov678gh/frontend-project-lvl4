import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout.jsx';
import useAuth from '../hooks/index.jsx';
import AuthContext from '../contexts/index.jsx';

import LoginPage from '../pages/loginPage.jsx';
import ChatPage from '../pages/chatPage.jsx';
import NotFoundPage from '../pages/notFoundPage.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" replace />
  );
};

const App = () => {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<ChatPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
export default App;
