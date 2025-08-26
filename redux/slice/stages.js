import fetcher from "@/utils/fetcher";
import { thunkWrapper } from "@/utils/thunk-wrapper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// === for experts === //
export const acceptAgreementByExpert = thunkWrapper(
  "agreement/acceptAgreementByExpert",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/agreement/confirm?id=${id}&confirm=${confirm}`,
      {
        method: "POST",
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

export const startJobByExpert = thunkWrapper(
  "agreement/startJobByExpert",
  async ({ locale, id, intl }) => {
    const response = await fetcher(
      `/agreement/start-job?id=${id}`,
      {
        method: "POST",
        headers: { "Accept-Language": locale },
      },
      {},
      true
    );
    return response.data;
  },
  {
    pending: "Ajoyib, biroz kuting...",
    success: "Ishni boshlashingiz mumkin",
    error: "Qandaydir xatolik yuz berdi, birozdan so'ng qayta urining",
  }
);

export const submitJobByExpert = thunkWrapper(
  "agreement/submitJobByExpert",
  async ({ locale, id, intl }) => {
    const response = await fetcher(
      `/agreement/submit-job?id=${id}`,
      {
        method: "POST",
        headers: { "Accept-Language": locale },
      },
      {},
      true
    );
    return response.data;
  },
  {
    pending: "Ajoyib, biroz kuting...",
    success:
      "Ish muvaffaqiyatli topshirildi. Iltimos, Buyurtmachini javobini kuting.",
    error: "Qandaydir xatolik yuz berdi, birozdan so'ng qayta urining",
  }
);

// === for customers === //
export const confirmPaymentByCustomer = thunkWrapper(
  "agreement/confirmPaymentByCustomer",
  async ({ locale, id }) => {
    const response = await fetcher(
      `/agreement/confirm-payment?id=${id}`,
      {
        method: "POST",
        headers: { "Accept-Language": locale },
      },
      {},
      true
    );
    return response.data;
  },
  {
    pending: "Ajoyib, biroz kuting...",
    success: "To'lov muvaffaqiyatli kafolatlandi.",
    error: "Qandaydir xatolik yuz berdi, birozdan so'ng qayta urining",
  }
);

export const acceptJobByCustomer = thunkWrapper(
  "agreement/acceptJobByCustomer",
  async ({ locale, id, intl }) => {
    const response = await fetcher(
      `/agreement/accept-job?id=${id}`,
      {
        method: "POST",
        headers: { "Accept-Language": locale },
      },
      {},
      true
    );
    return response.data;
  },
  {
    pending: "Ajoyib, biroz kuting...",
    success: "Ish qabul qilindi. Mutahassis uchun izoh qoldirishingiz mumkin.",
    error: "Qandaydir xatolik yuz berdi, birozdan so'ng qayta urining",
  }
);

export const reviewJobByCustomer = thunkWrapper(
  "agreement/reviewJobByCustomer",
  async ({ locale, id, intl }) => {
    const response = await fetcher(
      `/agreement/review-job?id=${id}`,
      {
        method: "POST",
        headers: { "Accept-Language": locale },
      },
      {},
      true
    );
    return response.data;
  },
  {
    pending: "Ajoyib, biroz kuting...",
    success: "Ish qayta ko'rish uchun mutahassisga jo'natildi.",
    error: "Qandaydir xatolik yuz berdi, birozdan so'ng qayta urining",
  }
);

const stagesSlice = createSlice({
  name: "stages",
  initialState: {
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
      state.can_create_agreement = !action?.payload?.agreement;
      state.can_edit_agreement = action?.payload?.agreement?.canEdit;
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

      state.can_evaluate_expert = action?.payload?.agreement?.canEvaluateExpert;
      state.can_evaluate_employer =
        action?.payload?.agreement?.canEvaluateEmployer;
    },
    setChangedData: (state, action) => {
      state.accept_data = action?.payload;
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
      })

      .addCase(submitJobByExpert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitJobByExpert.fulfilled, (state, action) => {
        state.loading = false;
        state.accept_data = action.payload;
      })
      .addCase(submitJobByExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(acceptJobByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptJobByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.accept_data = action.payload;
      })
      .addCase(acceptJobByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(reviewJobByCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reviewJobByCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.accept_data = action.payload;
      })
      .addCase(reviewJobByCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setAgreementStatus, setChangedData } = stagesSlice.actions;

export default stagesSlice.reducer;
