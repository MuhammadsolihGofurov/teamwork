import { useModal } from "@/context/modal-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { Checkbox, Input } from "../custom/form";
import { useSelector } from "react-redux";
import { send_amount } from "@/utils/funcs";
import { authAxios } from "@/utils/axios";
import { ButtonSpinner } from "../custom/loading";

export default function MoneyWithdrawModal() {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const { user_info } = useSelector((state) => state.user);
  const [reqLoading, setReqLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      amount: "",
    },
  });

  useEffect(() => {
    if (modal.isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [modal.isOpen]);

  if (!modal.isOpen) return null;

  const submitFn = async (data) => {
    setReqLoading(true);
    try {
      const { amount, card_number } = data;

      await authAxios.post("/money-withdraw-request/send", {
        amount,
        card_number,
      });

      toast.success(
        intl.formatMessage({ id: "So'rov muvaffaqiyatli yuborildi!" })
      );
      reset();
    } catch (e) {
      setReqLoading(false);
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full inset-0 min-h-screen overflow-y-auto bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 py-10 modal ${
        visible ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
      onClick={closeModal}
    >
      <form
        className={`bg-white rounded-3xl px-5 sm:px-10 pt-10 pb-7 flex flex-col gap-7 border border-bg-2 w-11/12 xs:w-[484px] relative transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onSubmit={handleSubmit(submitFn)}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:bg-bg-1 rounded-sm transition-colors duration-150"
          onClick={closeModal}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#364749"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h1 className="text-primary text-lg sm:text-xl font-semibold">
          {intl.formatMessage({ id: "Hisobdan pul yechish" })}
        </h1>

        <div className="flex flex-row w-full gap-2">
          <p className="text-base text-primary">
            {intl.formatMessage({
              id: "Hisobingizdagi mablag’ingiz",
            })}
          </p>
          <p className="text-sm  text-primary font-bold">
            <span className="text-lg">{user_info?.balance}</span>{" "}
            {intl.formatMessage({ id: "so'm" })}
          </p>
        </div>

        <div className="flex flex-col w-full">
          <p className="text-sm text-primary">
            {intl.formatMessage({
              id: "Yechishni istagan mablag’ingiz",
            })}
          </p>
          <Input
            errors={errors?.amount}
            type={"number"}
            register={register}
            name={"amount"}
            title={""}
            placeholder={"00.00"}
            id={`amount`}
            required
            page={"with-border-bg"}
            validation={{
              required: intl.formatMessage({ id: "RequiredAmount" }),
              min: {
                value: 50000,
                message:
                  intl.formatMessage({ id: "MinAmountError" }) ||
                  "Minimal summa 50,000 bo‘lishi kerak",
              },
              max: {
                value: 1000000000,
                message:
                  intl.formatMessage({ id: "MaxAmountError" }) ||
                  "Maksimal summa 1,000,000,000 bo‘lishi kerak",
              },
              validate: (value) =>
                Number(value) >= Number(user_info?.balance) ||
                intl.formatMessage({
                  id: "Kiritilgan summa balansdan kam bo‘lmasligi kerak",
                }),
            }}
          />
        </div>

        <div className="flex flex-col w-full">
          <p className="text-sm text-primary">
            {intl.formatMessage({
              id: "Mablag’ni qayerga o’tkazishni xohlaysiz?",
            })}
          </p>
          <Input
            errors={errors?.card_number}
            type={"number"}
            register={register}
            name={"card_number"}
            title={""}
            placeholder={intl.formatMessage({ id: "Karta raqamini kiriting" })}
            id={`card_number`}
            required
            page={"with-border-bg"}
            validation={{
              required: intl.formatMessage({ id: "Karta raqami majburiy" }),
              pattern: {
                value: /^[0-9]+$/,
                message: intl.formatMessage({
                  id: "Faqat raqam kiritish mumkin",
                }),
              },
              minLength: {
                value: 16,
                message: intl.formatMessage({
                  id: "Hisob raqami 16 ta raqamdan kam bo‘lmasligi kerak",
                }),
              },
              maxLength: {
                value: 16,
                message: intl.formatMessage({
                  id: "Hisob raqami 16 ta raqamdan oshmasligi kerak",
                }),
              },
            }}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <p className="text-sm text-some_red">
            *{" "}
            {intl.formatMessage({
              id: "Amaliyotni tasdiqlash telefon raqamingizga tasdiqlash kodini sms tarzida jo’natamiz",
            })}
          </p>

          <button
            type="submit"
            className="px-5 py-2 w-full bg-main font-medium text-white rounded-lg flex items-center justify-center hover:bg-white border-2 border-main hover:text-main transition-colors duration-200"
            disabled={reqLoading || !isValid}
          >
            {reqLoading ? (
              <ButtonSpinner />
            ) : (
              intl.formatMessage({ id: "Davom etish" })
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
