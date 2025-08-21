import { useModal } from "@/context/modal-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { Checkbox, Input } from "../custom/form";
import { useSelector } from "react-redux";
import { send_amount } from "@/utils/funcs";

export default function PaymentModal() {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const [incomeSum, setIncomeSum] = useState(null);
  const { user_info } = useSelector((state) => state.user);
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
      agree: false,
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

  const paymentTypes = [
    {
      id: 1,
      icon: `/images/uzcard.svg`,
      is_current: false,
      link: null,
      type: "uzcard",
    },
    {
      id: 2,
      icon: `/images/payme.svg`,
      is_current: true,
      link: "https://",
      type: "payme",
    },
    {
      id: 3,
      icon: `/images/click.svg`,
      is_current: false,
      link: "https://",
      type: "click",
    },
  ];

  const handleChangePaymentType = (type, is_current) => {
    if (!is_current) {
      toast.error(
        intl.formatMessage({ id: "Tizim bo'yicha ishlar olib borilmoqda..." })
      );
      return;
    }

    setPaymentType(type);
  };

  const submitFn = async (data) => {
    if (!paymentType) {
      toast.error(intl.formatMessage({ id: "To‘lov tizimini tanlang!" }));
      return;
    }

    if (!data.agree) {
      toast.error(intl.formatMessage({ id: "Shartlarga rozilik bildiring!" }));
      return;
    }

    try {
      // const form = document.createElement("form");
      // form.method = "POST";
      // form.action = "https://checkout.paycom.uz";

      // const inputs = [
      //   { name: "merchant", value: "68a46e520523f2f9efc01386" },
      //   { name: "amount", value: send_amount(data?.amount) },
      //   { name: "account[clientID]", value: user_info?.id },
      //   { name: "callback", value: `${window.location.origin}/payment` },
      // ];

      // inputs.forEach(({ name, value }) => {
      //   const input = document.createElement("input");
      //   input.type = "hidden";
      //   input.name = name;
      //   input.value = value;
      //   form.appendChild(input);
      // });

      // // console.error(form)

      // document.body.appendChild(form);
      // form.submit();

      const clientId = user_info?.id; // user id
      const merchantId = "68a46e520523f2f9efc01386"; // sizning merchant id

      // Payme fallback sahifasiga redirect
      window.location.href = `https://payme.uz/fallback/merchant/?id=${merchantId}&userid=${clientId}&amount=${send_amount(data?.amount)}`;

      reset();
    } catch (e) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 py-10 modal ${
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
          {intl.formatMessage({ id: "Hisobni to'ldirish" })}
        </h1>

        <div className="flex flex-col w-full gap-2">
          <p className="text-sm text-primary">
            {intl.formatMessage({
              id: "Hisobingizni qancha miqdorda to’ldirmoqchisiz?",
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
              required: intl.formatMessage({ id: "RequiredOfferPrice" }),
            }}
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <p className="text-sm text-primary">
            {intl.formatMessage({ id: "To‘lov tizimlaridan birini tanlang" })}
          </p>
          <div className="w-full grid grid-cols-3 gap-1">
            {paymentTypes?.map((item) => {
              return (
                <button
                  key={item?.type}
                  className={`bg-[#f3f3f3] rounded-lg h-[67px] flex items-center justify-center border transition-colors duration-200 ${
                    paymentType == item?.type
                      ? "border-main"
                      : "border-[#f3f3f3]"
                  }`}
                  type="button"
                  onClick={() =>
                    handleChangePaymentType(item?.type, item?.is_current)
                  }
                >
                  <img
                    src={item?.icon}
                    alt={item?.type}
                    role="image"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <Checkbox
            control={control}
            name="agree"
            rules={{
              required: intl.formatMessage({
                id: "To’lovni amalga oshirish shartlariga rozilik bildiring!",
              }),
            }}
            label={
              <>
                <a href="#" className="text-blue-600 underline">
                  {intl.formatMessage({
                    id: "To’lovni amalga oshirish shartlari",
                  })}
                </a>{" "}
                {intl.formatMessage({ id: "bilan tanishdim va roziman" })}
              </>
            }
          />

          <button
            type="submit"
            className="px-5 py-2 w-full bg-main font-medium text-white rounded-lg hover:bg-white border-2 border-main hover:text-main transition-colors duration-200"
          >
            {intl.formatMessage({ id: "Davom etish" })}
          </button>
        </div>
      </form>
    </div>
  );
}
