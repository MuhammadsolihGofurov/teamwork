import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from '../slice/pagination';
import userReducer from '../slice/user';

const store = configureStore({
    reducer: {
        pagination: paginationReducer,
        user: userReducer,
    },
});

export default store;