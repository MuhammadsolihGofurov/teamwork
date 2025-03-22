import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "user",
  initialState: {
    country_id: 0,
    region_id: 0,
    district_id: 0,
  },
  reducers: {
    setCountryId: (state, action) => {
      state.country_id = action.payload;
    },
    setRegionId: (state, action) => {
      state.region_id = action.payload;
    },
    setDistrictId: (state, action) => {
      state.district_id = action.payload;
    },
  },
});

export const { setCountryId, setRegionId, setDistrictId } =
  settingsSlice.actions;

export default settingsSlice.reducer;
