import axios from 'axios';
import {
  createAsyncThunk,
} from '@reduxjs/toolkit';

const fetchData = async () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const response = await axios.get('/api/v1/data', {
    headers: {
      Authorization: `Bearer ${userId.token}`,
    },
  });
  return response.data;
};

export default createAsyncThunk(
  'chat/data',
  async () => fetchData(),
);

export const getCurrentChannelId = async () => {
  const { currentChannelId } = await fetchData();
  return currentChannelId;
};
