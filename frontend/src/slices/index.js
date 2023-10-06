import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messageReducer from './messagesSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messageReducer,
  },
});
