import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const thunkWrapper = (typePrefix, asyncCallback, messages) =>
  createAsyncThunk(typePrefix, async (args, thunkAPI) => {
    const { intl } = args; // intl ni thunk chaqirayotganda yuborasiz

    try {
      // pending
      toast.loading(intl.formatMessage({ id: messages.pending }), {
        toastId: typePrefix,
      });

      const response = await asyncCallback(args, thunkAPI);

      // success
      toast.update(typePrefix, {
        render: intl.formatMessage({ id: messages.success }),
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      return response;
    } catch (error) {
      // error
      toast.update(typePrefix, {
        render:
          error?.response?.data?.message ||
          intl.formatMessage({ id: messages.error }),
        type: "error",
        isLoading: false,
        autoClose: 4000,
      });

      return thunkAPI.rejectWithValue(error);
    }

});
