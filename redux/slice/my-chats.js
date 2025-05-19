import { authAxios } from "@/utils/axios";
import {
  ARCHIVED,
  CUSTOMER,
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
    const user_type = await type;
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
      `/chat/by-id?id=${id}&expand=messages,task,offer,creator`,
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

export const fetchMessages = createAsyncThunk(
  "orders/fetchMessages",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/chat/message-list-by-chat-id?chat_id=${id}`,
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

const myChatsSlice = createSlice({
  name: "myChats",
  initialState: {
    chats: [],
    solo_chat: null,
    loading: true,
    messages: [],
    send_message: false,
  },
  reducers: {
    toggleSendMessage: (state, action) => {
      state.send_message = !state.send_message;
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
      })

      // fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleSendMessage } = myChatsSlice.actions;

export default myChatsSlice.reducer;
