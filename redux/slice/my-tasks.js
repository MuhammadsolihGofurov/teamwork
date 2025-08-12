import { authAxios } from "@/utils/axios";
import {
  ACCEPTED_ORDER_BY_EMPLOYER,
  CANCELED_ORDER_BY_EXPERT,
  CONFIRMED_ORDER_BY_EXPERT,
  VERGE_OF_AGREEMENT_TASK,
} from "@/utils/data";
import fetcher from "@/utils/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// order details
export const fetchMyTasks = createAsyncThunk(
  "orders/fetchMyTasks",
  async ({ locale }) => {
    const response = await fetcher(
      `/agreement/list?expand=employer,task,chatId`,
      {
        headers: {
          "Accept-Language": locale,
        },
      },
      {},
      true
    );
    return response.data;
  }
);

// my offers
export const fetchMyOffers = createAsyncThunk(
  "orders/fetchMyOffers",
  async ({ locale }) => {
    const response = await fetcher(
      `/offer/my-offers?expand=task,task.speciality,agreement,chatId`,
      {
        headers: {
          "Accept-Language": locale,
        },
      },
      {},
      true
    );
    return response.data;
  }
);

// my offers solo
export const fetchMyOfferSolo = createAsyncThunk(
  "orders/fetchMyOfferSolo",
  async ({ locale, offer_id }) => {
    const response = await fetcher(
      `/offer/by-id?id=${offer_id}&expand=task`,
      {
        headers: {
          "Accept-Language": locale,
        },
      },
      {},
      true
    );
    return response.data;
  }
);

const myTasks = createSlice({
  name: "myTasks",
  initialState: {
    my_tasks: [],
    my_tasks_canceled: [],
    my_tasks_finished: [],
    my_offers: [],
    my_tasks_on_agreement: [],
    my_offer_details: null,
  },
  reducers: {
    setMyOrders: (state, action) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Order offers
      .addCase(fetchMyTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyTasks.fulfilled, (state, action) => {
        state.loading = false;

        // my tasks on process...
        state.my_tasks = action.payload?.items;

        // my tasks canceled...
        state.my_tasks_canceled = action.payload?.items.filter(
          (item) => item?.status?.value === CANCELED_ORDER_BY_EXPERT
        );

        // my tasks finished
        state.my_tasks_finished = action.payload?.items?.filter(
          (item) => item?.status?.value === ACCEPTED_ORDER_BY_EMPLOYER
        );

        // my tasks on agreement
        state.my_tasks_on_agreement = action.payload?.items?.filter(
          (item) => item?.status?.value === VERGE_OF_AGREEMENT_TASK
        );
      })
      .addCase(fetchMyTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMyOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.my_offers = action.payload?.items;
      })
      .addCase(fetchMyOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //fetch my offer solo
      .addCase(fetchMyOfferSolo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOfferSolo.fulfilled, (state, action) => {
        state.loading = false;
        state.my_offer_details = action.payload;
      })
      .addCase(fetchMyOfferSolo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMyOrders } = myTasks.actions;

export default myTasks.reducer;
