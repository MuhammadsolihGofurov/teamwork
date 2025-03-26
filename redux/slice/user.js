import axios, { authAxios } from "@/utils/axios";
import { REGISTERAUTHKEY } from "@/utils/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const registerAuthKey = localStorage.getItem(REGISTERAUTHKEY);
      if (!registerAuthKey) return rejectWithValue(404);

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

const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePercentage: 90,
    user_info: null,
    loading: false,
    error: null,
    is_auth: false,
    current_user_type: 0,
  },
  reducers: {
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
    setErrorNull: (state) => {
      state.error = null;
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
      });
  },
});

export const { setProfilePercentage, setErrorNull } = userSlice.actions;

export default userSlice.reducer;
