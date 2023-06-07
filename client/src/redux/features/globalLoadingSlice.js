import { createSlice } from "@reduxjs/toolkit";

export const globalLoadingSlice = createSlice({
  name: "authModal",
  initialState: {
    globalLoaing: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoaing = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;

export default globalLoadingSlice.reducer;
