import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import Layout from './layout.jsx';
import { useAuth } from '../hooks/index.jsx';
import { authContext, socketContext } from '../contexts/index.jsx';
import LoginPage from '../pages/loginPage.jsx';
import ChatPage from '../pages/chatPage.jsx';
import NotFoundPage from '../pages/notFoundPage.jsx';
import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const currentUserState = Boolean(userId);
  const [loggedIn, setLoggedIn] = useState(currentUserState);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : <Navigate to="/login" />
  );
};

const App = (socket = io()) => {
  const dispatch = useDispatch();
  socket.on('newMessage', (msg) => {
    dispatch(messagesActions.addMessage(msg));
  });

  socket.on('newChannel', (msg) => {
    dispatch(channelsActions.addChannel(msg));
  });

  socket.on('removeChannel', ({ id }) => {
    dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (msg) => {
    const { id, name } = msg;
    const newObj = {
      id,
      changes: {
        name,
      },
    };
    dispatch(channelsActions.renameChannel(newObj));
  });

  return (
    <AuthProvider>
      <socketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={(
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            )} />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </socketContext.Provider>
    </AuthProvider>
  );
};
export default App;
