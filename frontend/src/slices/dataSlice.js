import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const userId = JSON.parse(localStorage.getItem('userId'));

export default createAsyncThunk(
  'channels/fetchData',
  async () => {
    const response = await axios.get(routes.dataPath(), {
      headers: {
        Authorization: `Bearer ${userId.token}`,
      },
    });
    return response.data;
  },
);
