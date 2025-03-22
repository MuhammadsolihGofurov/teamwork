import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "../slice/pagination";
import userReducer from "../slice/user";
import settingsReducer from "../slice/settings";

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    user: userReducer,
    settings: settingsReducer,
  },
});

export default store;
