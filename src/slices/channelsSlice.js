import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import fetchData from '../utils/fetchData.js';

const channelsAdapter = createEntityAdapter();
const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        const { channels } = action.payload;
        channelsAdapter.addMany(state, channels);
      });
  },
});
export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
