import { createSlice } from "@reduxjs/toolkit";

const stagesSlice = createSlice({
  name: "stages",
  initialState: {
    currentPage: 1,
    can_create_agreement: false,
    can_edit_agreement: false,
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
      const agreement_status = action?.payload?.status?.value;

      state.can_create_agreement = !action?.payload;
      state.can_edit_agreement = action?.payload?.canEdit;
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
});

export const { setAgreementStatus } = stagesSlice.actions;

export default stagesSlice.reducer;
