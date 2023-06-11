import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavourites: [202250],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
      }

      state.user = action.payload;
    },
    setListFavourites: (state, action) => {
      state.listFavourites = action.payload;
    },
    removeFavourites: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavourites = [...state.listFavourites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavourite: (state, action) => {
      state.listFavourites = [action.payload, ...state.listFavourites];
    },
  },
});

export const { setUser, setListFavourites, removeFavourites, addFavourite } =
  userSlice.actions;

export default userSlice.reducer;
