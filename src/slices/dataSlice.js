import axios from 'axios';
import {
  createAsyncThunk,
} from '@reduxjs/toolkit';

export default createAsyncThunk(
  'chat/data',
  async () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const response = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${userId.token}`,
      },
    });
    return response.data;
  },
);
