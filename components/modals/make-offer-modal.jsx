import { setToggleMakeOfferModal } from "@/redux/slice/settings";
import { authAxios } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Input, Textarea } from "../custom/form";
import { thousandSeperate } from "@/utils/funcs";
import { toast } from "react-toastify";
import { ButtonSpinner } from "../custom/loading";

export default function MakeOfferModal() {
  const intl = useIntl();
  const router = useRouter();
  const { makeOfferModal, task_id } = useSelector((state) => state.settings);
  const [reqLoading, setReqLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
    setError,
    clearErrors,
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
      count_of_days: "",
      price: "",
    },
  });
  const dispatch = useDispatch();

  const handleToggleModal = () => {
    dispatch(setToggleMakeOfferModal());
  };

  const [commission, setCommission] = useState(0);
  const price = watch("price");

  useEffect(() => {
    const calculatedCommission = (price * 10) / 100;
    setCommission(calculatedCommission);
  }, [price]);

  const submitFn = async (data) => {
    const { count_of_days, price, text } = data;

    try {
      setReqLoading(true);

      const payload = {
        task_id,
        count_of_days: Number(count_of_days),
        price,
        text,
      };

      const response = await authAxios.post(
        `/offer/send?task_id=${task_id}`,
        payload
      );

      toast.success(intl.formatMessage({ id: "success-send-offer" }));

      handleToggleModal();
      reset();
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full inset-0 min-h-screen overflow-y-auto flex items-center justify-center transition-opacity duration-150 bg-primary bg-opacity-10 py-5 px-3 ${
        makeOfferModal
          ? "z-[1001] visible opacity-100"
          : "z-[-3] invisible opacity-0"
      }`}
      onClick={() => handleToggleModal()}
    >
      <form
        onSubmit={handleSubmit(submitFn)}
        className={`bg-white modal__body rounded-[32px] w-full sm:w-[600px] px-5 sm:px-6 py-7 xs:py-10 grid grid-cols-1 xs:grid-cols-2 gap-y-5 gap-x-1 transition-transform duration-200 ${
          makeOfferModal
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible scale-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="col-span-1 sm:col-span-2">
          <Textarea
            errors={errors?.text}
            type={"text"}
            register={register}
            name={"text"}
            title={intl.formatMessage({ id: "Kuchli taklifingiz" })}
            placeholder={intl.formatMessage({
              id: "O’z taklifingizni kiriting",
            })}
            id={`text`}
            required
            page={"with-border"}
            validation={{
              required: intl.formatMessage({ id: "RequiredOffer" }),
            }}
            watch={watch}
          />
        </div>
        <Input
          errors={errors?.count_of_days}
          type={"number"}
          register={register}
          name={"count_of_days"}
          title={intl.formatMessage({ id: "Muddati" })}
          placeholder={intl.formatMessage({ id: "Kun kiriting" })}
          id={`count_of_days`}
          required
          page={"with-border"}
          icon={`/images/deadline-icon.svg`}
          validation={{
            required: intl.formatMessage({ id: "RequiredOfferCount" }),
          }}
        />
        <Input
          errors={errors?.price}
          type={"number"}
          register={register}
          name={"price"}
          title={intl.formatMessage({ id: "Narxi" })}
          placeholder={"00.00"}
          id={`price`}
          required
          page={"with-border"}
          icon={`/images/price-icon.svg`}
          validation={{
            required: intl.formatMessage({ id: "RequiredOfferPrice" }),
          }}
        />
        <div className="col-span-1 sm:col-span-2 flex flex-col gap-3 py-2">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 14L15 8M10 8.5C10 8.77614 9.77614 9 9.5 9C9.22386 9 9 8.77614 9 8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5ZM15 13.5C15 13.7761 14.7761 14 14.5 14C14.2239 14 14 13.7761 14 13.5C14 13.2239 14.2239 13 14.5 13C14.7761 13 15 13.2239 15 13.5ZM5 21L5 5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3L17 3C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21L16 19L14 21L12 19L10 21L8 19L5 21Z"
                stroke="#121212"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-primary">
              {intl.formatMessage({ id: "10% komissiya hisoblandi" })}:
              <b>{thousandSeperate(commission)} uzs</b>
            </span>
          </div>
          <div className="flex items-start gap-2 w-full sm:w-3/4">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mt-1"
            >
              <g clipPath="url(#clip0_1_23503)">
                <path
                  d="M9.77612 0.285156L1.42969 2.80484V9.10403C1.42969 13.1986 4.81365 17.6498 9.77612 20.2852C14.7386 17.6499 18.1226 13.1986 18.1226 9.10403V2.80484L9.77612 0.285156ZM9.77612 18.8451C5.51217 16.3824 2.68953 12.5317 2.68953 9.10403V3.74059L9.77612 1.60136V18.8451Z"
                  fill="#98BE00"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_23503">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span className="text-main flex-1">
              {intl.formatMessage({ id: "comissionFee" })}
            </span>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-2 flex flex-col-reverse xs:flex-row gap-1">
          <button
            type="button"
            className="max-h-[54px] min-h-[54px] text-center bg-bg-2 rounded-xl text-primary hover:bg-bg-3 transition-colors duration-150   font-medium flex-1"
            role="button"
            onClick={() => handleToggleModal()}
          >
            {intl.formatMessage({ id: "Bekor qilish" })}
          </button>
          <button
            type="submit"
            className={`max-h-[54px] flex items-center justify-center min-h-[54px] text-center bg-some_btn rounded-xl  transition-colors duration-150  font-medium  flex-1 ${
              !isValid
                ? "bg-opacity-10 cursor-not-allowed text-primary"
                : "text-primary hover:bg-main hover:text-white"
            }`}
            role="button"
            disabled={reqLoading || !isValid}
          >
            {reqLoading ? (
              <ButtonSpinner />
            ) : (
              intl.formatMessage({ id: "Taklif yuborish" })
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
