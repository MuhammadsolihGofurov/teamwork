import axios from "@/utils/axios";
import { REGISTERAUTHKEY } from "@/utils/data";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const registerAuthKey = localStorage.getItem(REGISTERAUTHKEY);
      if (!registerAuthKey) return rejectWithValue("Auth key topilmadi");

      const response = await axios.get(
        "/user/me?expand=expert,employer.legalEntity,employer.physicalPerson",
        {
          headers: { Authorization: `Bearer ${registerAuthKey}` },
        }
      );

      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem(REGISTERAUTHKEY);
      }
      return rejectWithValue(
        error.response?.data?.message || "Xatolik yuz berdi"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    profilePercentage: 90,
    user_info: {},
    loading: false,
    error: null,
    is_auth: false,
  },
  reducers: {
    setProfilePercentage: (state, action) => {
      state.profilePercentage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user_info = action.payload?.data;
        state.is_auth = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfilePercentage } = userSlice.actions;

export default userSlice.reducer;
