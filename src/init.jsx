import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';

import App from './components/App.jsx';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

const initApp = () => {
  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(messagesActions.addMessage(msg));
  });

  socket.on('newChannel', (msg) => {
    store.dispatch(channelsActions.addChannel(msg));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
  });

  socket.on('renameChannel', (msg) => {
    const { id, name } = msg;
    const newObj = {
      id,
      changes: {
        name,
      },
    };
    store.dispatch(channelsActions.renameChannel(newObj));
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <App socket={socket}/>
      </BrowserRouter>
    </Provider>
  );
}

export default initApp;