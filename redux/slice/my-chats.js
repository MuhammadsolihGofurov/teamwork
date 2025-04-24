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

export const fetchChats = createAsyncThunk(
  "orders/fetchChats",
  async (locale) => {
    const response = await fetcher(
      `/chat/my-chats?expand=offer,partner.expert`,
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

const myChatsSlice = createSlice({
  name: "myChats",
  initialState: {
    chats: [],
  },
  reducers: {
    setMyChats: (state, action) => {
      state.chats = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch orders
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMyChats } = myChatsSlice.actions;

export default myChatsSlice.reducer;
