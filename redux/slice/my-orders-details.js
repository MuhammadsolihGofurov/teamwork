import { authAxios } from "@/utils/axios";
import fetcher from "@/utils/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// order details
export const fetchOrderDetails = createAsyncThunk(
  "orders/fetchOrderDetails",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/task/my-task?id=${id}&expand=speciality.parent`,
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

// order's offers
export const fetchOrderOffers = createAsyncThunk(
  "orders/fetchOrderOffers",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/offer/list-by-task-id?task_id=${id}&expand=owner.expert,chatId,specialitySets,parent&per-page=3&size=3`,
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

// order's experts
export const fetchOrderExperts = createAsyncThunk(
  "orders/fetchOrderExperts",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/agreement/list?expand=expert&per-page=3`,
      {
        method: "POST",
        headers: {
          "Accept-Language": locale,
        },
        body: JSON.stringify({ task_id: id }),
      },
      {},
      true
    );
    return response.data;
  }
);

// cancel offers
export const cancelOrdersOffer = createAsyncThunk(
  "orders/cancelOrdersOffer",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAxios.post(`/offer/cancel?id=${id}`);
      dispatch(fetchOrderDetails());
      return response.data;
    } catch (error) {
      toast.error(error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

// sorted offers
export const sortedOrdersOffer = createAsyncThunk(
  "orders/sortedOrdersOffer",
  async ({ id, sorted, locale }) => {
    const response = await fetcher(
      `/offer/sort?id=${id}&sort=${sorted ? 0 : 1}`,
      {},
      {},
      true
    );
    dispatch(fetchOrderOffers({ locale, id }));
    return response.data;
  }
);

// order's offer's details
export const fetchOrderOfferDetails = createAsyncThunk(
  "orders/fetchOrderOfferDetails",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/offer/by-id?id=${id}&expand=task`,
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

// offer/sort?id=3327&sort=1

const myOrdersDetails = createSlice({
  name: "myOrdersDetails",
  initialState: {
    order_details: null,
    order_offers: [],
    order_offers_meta: {},
    order_experts: [],
    order_experts_meta: {},
    loading: false,
    error: null,
    order_offer_solo: null,
  },
  reducers: {
    setMyOrders: (state, action) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order_details = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Order offers
      .addCase(fetchOrderOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.order_offers = action.payload?.items;
        state.order_offers_meta = action.payload?._meta;
      })
      .addCase(fetchOrderOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Order experts
      .addCase(fetchOrderExperts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderExperts.fulfilled, (state, action) => {
        state.loading = false;
        state.order_experts = action.payload?.items;
        state.order_experts_meta = action.payload?._meta;
      })
      .addCase(fetchOrderExperts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // cancel offers
      .addCase(cancelOrdersOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelOrdersOffer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(cancelOrdersOffer.rejected, (state, action) => {
        state.loading = false;
      })

      // sorted offers
      .addCase(sortedOrdersOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(sortedOrdersOffer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sortedOrdersOffer.rejected, (state, action) => {
        state.loading = false;
      })

      // Order's offer's details
      .addCase(fetchOrderOfferDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderOfferDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order_offer_solo = action.payload;
      })
      .addCase(fetchOrderOfferDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMyOrders } = myOrdersDetails.actions;

export default myOrdersDetails.reducer;
