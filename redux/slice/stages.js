import fetcher from "@/utils/fetcher";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// === for experts === //
export const acceptAgreementByExpert = createAsyncThunk(
  "agreement/acceptAgreementByExpert",
  async ({ locale, id, confirm = 1 }) => {
    try {
      const response = await fetcher(
        `/agreement/confirm?id=${id}&confirm=${confirm}`,
        {
          method: "POST",
          headers: {
            "Accept-Language": locale,
          },
          // body: JSON.stringify({ task_id: id }),
        },
        {},
        true
      );
      let success_message = locale == "ru" ? "Успешный" : "Muvaffaqiyatli";

      toast.success(success_message);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Xatolik yuz berdi, qayta urinib ko‘ring."
      );
      return null;
    }
  }
);

export const startJobByExpert = createAsyncThunk(
  "agreement/startJobByExpert",
  async ({ locale, id }) => {
    try {
      const response = await fetcher(
        `/agreement/start-job?id=${id}`,
        {
          method: "POST",
          headers: {
            "Accept-Language": locale,
          },
          // body: JSON.stringify({ task_id: id }),
        },
        {},
        true
      );
      let success_message = locale == "ru" ? "Успешный" : "Muvaffaqiyatli";

      toast.success(success_message);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Xatolik yuz berdi, qayta urinib ko‘ring."
      );
      return error;
    }
  }
);

// === for customers === //
export const confirmPaymentByCustomer = createAsyncThunk(
  "agreement/confirmPaymentByCustomer",
  async ({ locale, id }) => {
    try {
      const response = await fetcher(
        `/agreement/confirm-payment?id=${id}`,
        {
          method: "POST",
          headers: {
            "Accept-Language": locale,
          },
          // body: JSON.stringify({ task_id: id }),
        },
        {},
        true
      );
      let success_message = locale == "ru" ? "Успешный" : "Muvaffaqiyatli";

      toast.success(success_message);
      return response.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Xatolik yuz berdi, qayta urinib ko‘ring."
      );
      return error;
    }
  }
);

const stagesSlice = createSlice({
  name: "stages",
  initialState: {
    currentPage: 1,
    can_create_agreement: false,
    can_edit_agreement: false,
    can_edit_offer: false,
    send_to_expert: false,
    confirm_agreement: false,
    confirm_payment: false,
    start_job: false,
    submit_job: false,
    accept_job: false,
    can_evaluate_employer: false,
    can_evaluate_expert: false,
  },
  reducers: {
    setAgreementStatus: (state, action) => {
      const agreement_status = action?.payload?.agreement?.status?.value;
      const offer = action?.payload?.offer;

      // console.error(action);
      state.can_create_agreement = !action?.payload;
      state.can_edit_agreement = action?.payload?.canEdit;
      state.can_edit_offer = offer?.canEdit;
      state.send_to_expert = agreement_status == "NEW_ORDER";
      state.confirm_agreement =
        agreement_status == "EMPLOYER_SENT_ORDER_TO_EXPERT";
      state.confirm_payment = agreement_status == "CONFIRMED_ORDER_BY_EXPERT";
      state.start_job = agreement_status == "EMPLOYER_GUARANTEED_THE_PAYMENT";
      state.submit_job =
        agreement_status == "ORDER_IN_PROGRESS" ||
        agreement_status == "RETURNED_ORDER_BY_EMPLOYER";
      state.accept_job = agreement_status == "WAITING_EMPLOYER_ACCEPT_ORDER";
      state.can_evaluate_expert = action?.payload?.canEvaluateExpert;
      state.can_evaluate_employer = action?.payload?.canEvaluateEmployer;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(acceptAgreementByExpert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptAgreementByExpert.fulfilled, (state, action) => {
        state.loading = false;
        state.accept_data = action.payload;
      })
      .addCase(acceptAgreementByExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(confirmPaymentByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPaymentByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.accept_data = action.payload;
      })
      .addCase(confirmPaymentByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(startJobByExpert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startJobByExpert.fulfilled, (state, action) => {
        state.loading = false;
        state.accept_data = action.payload;
      })
      .addCase(startJobByExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAgreementStatus } = stagesSlice.actions;

export default stagesSlice.reducer;
