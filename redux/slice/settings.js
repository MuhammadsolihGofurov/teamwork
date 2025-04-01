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
    filterModalConfirm: false,
    makeOfferModal: false,
    task_id: 0,
    menuOffcanvas: false,
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
    setToggleFilterModalConfirm: (state, action) => {
      state.filterModalConfirm = !state.filterModalConfirm;
    },
    setToggleMakeOfferModal: (state, action) => {
      state.makeOfferModal = !state.makeOfferModal;
      state.task_id = action?.payload?.task_id ?? 0;
    },
    setToggleMenuOffcanvas: (state) => {
      state.menuOffcanvas = !state.menuOffcanvas;
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
  setToggleFilterModalConfirm,
  setToggleMakeOfferModal,
  setToggleMenuOffcanvas
} = settingsSlice.actions;

export default settingsSlice.reducer;
