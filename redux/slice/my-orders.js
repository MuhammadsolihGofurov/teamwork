import { authAxios } from "@/utils/axios";
import {
  ARCHIVED,
  IN_PROGRESS,
  NOT_PUBLISHED,
  PUBLISHED,
  VERGE_OF_AGREEMENT,
} from "@/utils/data";
import fetcher from "@/utils/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

// deleteOrder action
export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAxios.delete(`/task/my-task-delete?id=${id}`);
      dispatch(fetchOrders());
      return response.data;
    } catch (error) {
      toast.error(error?.message);
      return rejectWithValue(error.message);
    }
  }
);

// unpublishOrder action
export const unpublishOrder = createAsyncThunk(
  "orders/unpublishOrder",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAxios.post(`/task/unpublish?id=${id}`);
      dispatch(fetchOrders());
      return response.data;
    } catch (error) {
      toast.error(error?.message);
      return rejectWithValue(error.message);
    }
  }
);

// publishOrder action
export const publishOrder = createAsyncThunk(
  "orders/publishOrder",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAxios.post(`/task/publish?id=${id}`);
      dispatch(fetchOrders());
      return response.data;
    } catch (error) {
      toast.error(error?.message);
      return rejectWithValue(error.message);
    }
  }
);

// archiveOrder action
export const archiveOrder = createAsyncThunk(
  "orders/archiveOrder",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await authAxios.post(`/task/to-archive?id=${id}`);
      dispatch(fetchOrders());
      return response.data;
    } catch (error) {
      toast.error(error?.message);
      return rejectWithValue(error?.message);
    }
  }
);

// fetch saved tasks
export const fetchSavedTasks = createAsyncThunk(
  "orders/fetchSavedTasks",
  async (locale) => {
    const response = await fetcher(
      `/task/published-list?page=1&expand=speciality.parent,owner.employer&per-page=3&is_favourite=1`,
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

// fetch saved experts
export const fetchSavedExperts = createAsyncThunk(
  "orders/fetchSavedExperts",
  async ({ locale, page = 1 }) => {
    const response = await fetcher(
      `/user/expert-list?expand=specialitySets.parent&is_favourite=1&per-page=3&page=${page}`,
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

// fetch saved experts
export const fetchMyRates = createAsyncThunk(
  "orders/fetchMyRates",
  async ({ locale, page = 1, rate }) => {
    const response = await fetcher(
      `/comment/about-me?expand=agreement,commentator,user&per-page=3&page=${page}`,
      {
        method: "POST",
        headers: {
          "Accept-Language": locale,
        },
        body: JSON.stringify({ rate: rate }),
      },
      {},
      true
    );
    return response.data;
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
    saved_experts: [],
    saved_experts_meta: {},
  },
  reducers: {
    setMyOrders: (state, action) => {
      state.myOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch orders
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
      })

      // delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
      })

      //  unpublish order
      .addCase(unpublishOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(unpublishOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unpublishOrder.rejected, (state, action) => {
        state.loading = false;
      })

      // publish order
      .addCase(publishOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(publishOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(publishOrder.rejected, (state, action) => {
        state.loading = false;
      })

      // archive order
      .addCase(archiveOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(archiveOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(archiveOrder.rejected, (state, action) => {
        state.loading = false;
      })

      // saved experts order
      .addCase(fetchSavedExperts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedExperts.fulfilled, (state, action) => {
        state.loading = false;
        state.saved_experts = action.payload?.items;
        state.saved_experts_meta = action.payload?._meta;
      })
      .addCase(fetchSavedExperts.rejected, (state, action) => {
        state.loading = false;
      })

      // fetch my rates
      .addCase(fetchMyRates.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRates.fulfilled, (state, action) => {
        state.loading = false;
        state.my_rates = action.payload?.items;
        state.my_rates_meta = action.payload?._meta;
      })
      .addCase(fetchMyRates.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setMyOrders } = myOrdersSlice.actions;

export default myOrdersSlice.reducer;
