import {
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { fetchData } from "./dataSlice";

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannel: null,
  defaultChannel: null,
});

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
      state.currentChannel = payload.id;
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload;
    },
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
      state.currentChannel = state.defaultChannel;
    },
    renameChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const { channels, currentChannelId } = action.payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannel = currentChannelId;
      state.defaultChannel = currentChannelId;
    });
  },
});

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
export default channelsSlice.reducer;
