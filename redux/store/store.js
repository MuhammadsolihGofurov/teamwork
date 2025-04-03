import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "../slice/pagination";
import userReducer from "../slice/user";
import settingsReducer from "../slice/settings";
import myOrdersReducer from "../slice/my-orders";

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    user: userReducer,
    settings: settingsReducer,
    myOrders: myOrdersReducer,
  },
});

export default store;
