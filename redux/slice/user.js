import axios, { authAxios } from "@/utils/axios";
import { PRIVATEAUTHKEY } from "@/utils/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const private_auth_key = localStorage.getItem(PRIVATEAUTHKEY);
      if (!private_auth_key) return rejectWithValue(404);

      const response = await authAxios.get(
        "/user/me?expand=expert,employer.legalEntity,employer.physicalPerson"
      );

      return response.data;
    } catch (error) {
      // if (error.response?.status === 401) {
      //   localStorage.removeItem(REGISTERAUTHKEY);
      // }
      return rejectWithValue(error.response?.status);
    }
  }
);

export const fetchTasksDetailsSums = createAsyncThunk(
  "user/fetchTasksDetailsSums",
  async (_, { rejectWithValue }) => {
    try {
      const private_auth_key = localStorage.getItem(PRIVATEAUTHKEY);
      if (!private_auth_key) return rejectWithValue(404);

      const response = await authAxios.get(
        "/settings/paid-services"
      );

      return response.data;
    } catch (error) {
      // if (error.response?.status === 401) {
      //   localStorage.removeItem(REGISTERAUTHKEY);
      // }
      return rejectWithValue(error.response?.status);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePercentage: 90,
    user_info: null,
    loading: false,
    error: null,
    is_auth: false,
    current_user_type: 0,
    tasks_details_sums: null
  },
  reducers: {
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
    setErrorNull: (state) => {
      state.error = null;
    },
    RemvoeUserFullInfo: (state) => {
      state.is_auth = false;
      // state.user_info = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.user_info = action.payload?.data;
        state.is_auth = true;
        state.current_user_type = action.payload?.data?.type?.value;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTasksDetailsSums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksDetailsSums.fulfilled, (state, action) => {
        state.error = null;
        state.loading = false;
        state.tasks_details_sums = action.payload?.data;
      })
      .addCase(fetchTasksDetailsSums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfilePercentage, setErrorNull, RemvoeUserFullInfo } =
  userSlice.actions;

export default userSlice.reducer;
