import { authAxios } from "@/utils/axios";
import {
  ACCEPTED_ORDER_BY_EMPLOYER,
  CANCELED_ORDER_BY_EXPERT,
  CONFIRMED_ORDER_BY_EXPERT,
  VERGE_OF_AGREEMENT_TASK,
} from "@/utils/data";
import fetcher from "@/utils/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// my all vacancies
export const fetchMyPayments = createAsyncThunk(
  "payment/fetchMyPayments",
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

const myPayment = createSlice({
  name: "myPayment",
  initialState: {
    my_payments: [],
  },
  reducers: {
    setData: (state, action) => {
      state.my_offers = "";
    },
  },
  extraReducers: (builder) => {
    builder

      // Order offers
      .addCase(fetchMyPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPayments.fulfilled, (state, action) => {
        state.loading = false;

        // my tasks on process...
        state.my_payments = action.payload?.items;
      })
      .addCase(fetchMyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setData } = myPayment.actions;

export default myPayment.reducer;
