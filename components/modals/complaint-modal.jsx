import { useModal } from "@/context/modal-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { Checkbox, Input, Select, Textarea } from "../custom/form";
import { useDispatch, useSelector } from "react-redux";
import { send_amount } from "@/utils/funcs";
import { authAxios } from "@/utils/axios";
import { ButtonSpinner } from "../custom/loading";
import { setAgreementStatus, setChangedData } from "@/redux/slice/stages";

export default function ComplaintModal() {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const { user_info } = useSelector((state) => state.user);
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
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
      reason_id: "",
      comment: "",
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
      const { reason_id, comment } = data;

      const response = await authAxios.post(
        `/agreement/cancel-request?id=${modal?.props?.agreement?.id}`,
        {
          reason_id,
          comment,
        }
      );

      toast.success(
        intl.formatMessage({ id: "So'rov muvaffaqiyatli yuborildi!" })
      );
      reset();
      dispatch(
        setAgreementStatus({
          agreement: modal?.props?.agreement,
          offer: modal?.props?.offer,
        })
      );
      dispatch(setChangedData(response?.data))
      closeModal();
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
          {intl.formatMessage({ id: "Shikoyat yuborish" })}
        </h1>

        <div className="flex flex-col w-full">
          <p className="text-sm text-primary">
            {intl.formatMessage({
              id: "Shikoyat sababi",
            })}
          </p>
          <Select
            errors={errors?.reason_id}
            type={"text"}
            register={register}
            name={"reason_id"}
            page="profile"
            title={""}
            placeholder={intl.formatMessage({ id: "Sababni tanlang" })}
            id="reason_id"
            required
            state={"reason_lists"}
            isIcon={false}
            control={control}
            isAuth={true}
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <p className="text-sm text-primary">
            {intl.formatMessage({
              id: "Shikoyatingizni batafsil yozib qoldiring",
            })}
          </p>
          <Textarea
            errors={errors?.comment}
            type={"text"}
            register={register}
            name={"comment"}
            title={""}
            placeholder={intl.formatMessage({ id: "Kiriting" })}
            id={`comment`}
            required
            page="with-bg"
            validation={{
              required: intl.formatMessage({
                id: "Shikoyatni kiriting bu muhim.",
              }),
            }}
            watch={watch}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center">
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
