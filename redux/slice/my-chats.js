import { authAxios } from "@/utils/axios";
import {
  ARCHIVED,
  EXPERT,
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
  async ({ locale, type }) => {
    const url = type == EXPERT ? `offer,creator` : `offer,partner.expert`;

    const response = await fetcher(
      `/chat/my-chats?expand=${url}`,
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

export const fetchChatSolo = createAsyncThunk(
  "orders/fetchChatSolo",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/chat/by-id?id=${id}&expand=messages`,
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
    solo_chat: null,
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
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // fetch solo chat
      .addCase(fetchChatSolo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatSolo.fulfilled, (state, action) => {
        state.loading = false;
        state.solo_chat = action.payload;
      })
      .addCase(fetchChatSolo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMyChats } = myChatsSlice.actions;

export default myChatsSlice.reducer;
