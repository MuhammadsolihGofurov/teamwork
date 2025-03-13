import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePercentage: 99,
  },
  reducers: {
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
  },
});

export const { setProfilePercentage } = userSlice.actions;

export default userSlice.reducer;
