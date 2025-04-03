import {
  ARCHIVED,
  IN_PROGRESS,
  NOT_PUBLISHED,
  PUBLISHED,
  VERGE_OF_AGREEMENT,
} from "@/utils/data";
import fetcher from "@/utils/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Asinxron so'rovni yaratamiz
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (locale) => {
    const response = await fetcher(
      `/task/my-tasks?expand=speciality.parent,expert`,
      {
        headers: {
          "Accept-Language": locale,
        },
      },
      {},
      true
    );
    return response.data.items;
  }
);

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: {
    orders: [],
    publishedOrders: [],
    unpublishedOrders: [],
    archivedOrders: [],
    inProgressOrders: [],
    vergeOfAgreementOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setMyOrders: (state, action) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;

        // Ordersni status bo'yicha ajratish
        state.publishedOrders = action.payload.filter(
          (item) => item?.task_status === PUBLISHED
        );
        state.unpublishedOrders = action.payload.filter(
          (item) => item?.task_status === NOT_PUBLISHED
        );
        state.archivedOrders = action.payload.filter(
          (item) => item?.task_status === ARCHIVED
        );
        state.inProgressOrders = action.payload.filter(
          (item) => item?.task_status === IN_PROGRESS
        );
        state.vergeOfAgreementOrders = action.payload.filter(
          (item) => item?.task_status === VERGE_OF_AGREEMENT
        );
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMyOrders } = myOrdersSlice.actions;

export default myOrdersSlice.reducer;
