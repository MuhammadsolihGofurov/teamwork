import { configureStore } from "@reduxjs/toolkit";
import paginationReducer from "../slice/pagination";
import userReducer from "../slice/user";
import settingsReducer from "../slice/settings";
import myOrdersReducer from "../slice/my-orders";
import myOrdersDetailsReducer from "../slice/my-orders-details";


const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    user: userReducer,
    settings: settingsReducer,
    myOrders: myOrdersReducer,
    myOrdersDetails: myOrdersDetailsReducer,
  },
});

export default store;
