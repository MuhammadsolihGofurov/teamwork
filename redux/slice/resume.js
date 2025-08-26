import fetcher from "@/utils/fetcher";
import { thunkWrapper } from "@/utils/thunk-wrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// === for experts === //
export const getCurrentEduInfo = thunkWrapper(
  "agreement/acceptAgreementByExpert",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/agreement/confirm?id=${id}&confirm=${confirm}`,
      {
        method: "GET",
        headers: { "Accept-Language": locale },
      },
      {},
      true
    );
    return response.data;
  },
  {
    pending: "Ajoyib, biroz kuting...",
    success: "Muvaffaqiyatli",
    error: "Qandaydir xatolik yuz berdi, birozdan so'ng qayta urining",
  }
);

const resumeSlice = createSlice({
  name: "resume",
  initialState: {
    current_edu: null,
  },
  reducers: {
    setChangedData: (state, action) => {
      state.accept_data = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentEduInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentEduInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.current_edu = action.payload;
      })
      .addCase(getCurrentEduInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setChangedData } = resumeSlice.actions;

export default resumeSlice.reducer;
