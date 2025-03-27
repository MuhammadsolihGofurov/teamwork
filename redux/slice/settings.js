import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "user",
  initialState: {
    country_id: 0,
    region_id: 0,
    district_id: 0,
    speciality_current: {},
    specialityChildren: [],
    skillLists: [],
    logOutModalConfirm: false,
    specialities: [],
    languagesData: [],
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
    setSpecialityCurrent: (state, action) => {
      state.speciality_current = action.payload;
    },
    setSpecialityIds: (state, action) => {
      state.specialityChildren = action.payload;
    },
    setSkillIds: (state, action) => {
      state.skillLists = action.payload;
    },
    setToggleLogOutModalConfirm: (state) => {
      state.logOutModalConfirm = !state.logOutModalConfirm;
    },
    setSpecialitiesData: (state, action) => {
      state.specialities = action.payload;
    },
    setLanguagesData: (state, action) => {
      state.languagesData = action.payload;
    },
  },
});

export const {
  setCountryId,
  setRegionId,
  setDistrictId,
  setSpecialityCurrent,
  setSpecialityIds,
  setSkillIds,
  setToggleLogOutModalConfirm,
  setSpecialitiesData,
  setLanguagesData,
} = settingsSlice.actions;

export default settingsSlice.reducer;
