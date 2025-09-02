import { useModal } from "@/context/modal-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authAxios } from "@/utils/axios";
import { setAgreementStatus, setChangedData } from "@/redux/slice/stages";
import { ButtonSpinner } from "@/components/custom/loading";
import { Counter, Switcher } from "@/components/custom/form";
import { fetchTasksDetailsSums } from "@/redux/slice/user";
import { thousandSeperate } from "@/utils/funcs";
import { useRouter } from "next/router";

export default function TaskPintoTop() {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const { tasks_details_sums } = useSelector((state) => state.user);
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();
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
      pin_duration: 0,
    },
  });

  const pin_duration = watch("pin_duration");

  useEffect(() => {
    if (modal.isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [modal.isOpen]);

  if (!modal.isOpen) return null;

  const task_id = router.query.task_id;

  const submitFn = async (data) => {
    setReqLoading(true);
    try {
      const { pin_duration } = data;

      if (pin_duration <= 0) {
        toast.error(
          intl.formatMessage({ id: "Iltimos, kerakli vaqt muddatni kiriting!" })
        );
        return false;
      }

      await authAxios.post(`/task/paid-services?id=${task_id}`, {
        pin_duration,
        pin: true,
      });

      toast.success(
        intl.formatMessage({ id: "So'rov muvaffaqiyatli yuborildi!" })
      );
      reset();

      closeModal();
    } catch (e) {
      setReqLoading(false);
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  const costSums = () => {
    return thousandSeperate(tasks_details_sums?.cost_of_pin * pin_duration);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full inset-0 min-h-screen overflow-y-auto bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 py-10 modal ${
        visible ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
      onClick={closeModal}
    >
      <form
        className={`bg-white rounded-3xl px-5 sm:px-10 pt-10 pb-7 flex flex-col gap-7 border border-bg-2 w-11/12 sm:w-[600px] relative transform transition-all duration-300 ${
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

        <div className="pt-5 flex flex-row items-start gap-3">
          <div>
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" width="40" height="40" rx="20" fill="#FFB673" />
              <path
                d="M25 17.5013L18.3333 24.168L11.6667 26.668L9.16667 29.168L20.8333 40.8346L23.3333 38.3346L25.8333 31.668L32.5 25.0013M15 35.0013L7.5 42.5013M24.1667 16.668L33.3333 25.8346"
                stroke="#222222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 flex-col gap-1">
            <h1 className="text-lg text-primary font-semibold">
              {intl.formatMessage({
                id: "Ro’yxatning yuqorisiga “Qatirish qo’yish”",
              })}
            </h1>
            <p className="text-sm text-primary text-opacity-70 font-normal">
              {intl.formatMessage({
                id: "Kerakli muddatni belgilab, zarur mablag’ni amalga oshiring",
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 ">
          <Counter
            name="pin_duration"
            control={control}
            min={0}
            max={100}
            step={1}
          />
          <p className="text-sm text-primary text-opacity-80 text-center">
            {intl.formatMessage({
              id: "Belgilash muddati quyidagi kabi belgilanmoqda",
            })}
          </p>
          <p></p>
        </div>

        <div className="p-3 rounded-md border border-dashed border-bg-3 flex justify-between sm:flex-row flex-col gap-5 min-h-[200px] sm:min-h-[120px]">
          <div className="flex flex-col gap-2 w-full sm:w-3/5">
            {pin_duration >= 1 && (
              <div className="flex justify-between items-center gap-5">
                <p className="text-sm text-primary text-opacity-70">
                  {intl.formatMessage({
                    id: "“Qatirib qo'yish” narxi:",
                  })}
                </p>
                <p className="text-sm text-primary font-semibold whitespace-nowrap">
                  {thousandSeperate(tasks_details_sums?.cost_of_pin)}{" "}
                  {intl.formatMessage({ id: "so'm" })}{" "}
                </p>
              </div>
            )}
            {pin_duration >= 1 && (
              <div className="flex justify-between items-center gap-5">
                <p className="text-sm text-primary text-opacity-70">
                  {intl.formatMessage({
                    id: "“Qatirib qo'yish”",
                  })}
                  {" x "} {pin_duration}
                </p>
                <p className="text-sm text-primary font-semibold whitespace-nowrap">
                  {costSums()} {intl.formatMessage({ id: "so'm" })}{" "}
                </p>
              </div>
            )}
          </div>
          <div className="w-[1px] border border-dashed border-bg-3"></div>
          {pin_duration >= 1 && (
            <div className="flex flex-col gap-3 w-full sm:w-2/5">
              <div className="flex flex-col sm:items-start items-end">
                <p className="text-sm text-primary text-opacity-70 font-semibold">
                  {intl.formatMessage({ id: "Jami to'lov" })}:
                </p>
                <p className="text-sm text-primary text-opacity-70 font-semibold">
                  {costSums()} {intl.formatMessage({ id: "so'm" })}
                </p>
              </div>
              <button
                type="submit"
                className="px-5 py-2 w-full bg-main font-medium text-white rounded-lg flex items-center justify-center hover:bg-white border-2 border-main hover:text-main transition-colors duration-200"
                disabled={reqLoading || !isValid}
              >
                {reqLoading ? (
                  <ButtonSpinner />
                ) : (
                  intl.formatMessage({ id: "To'lash" })
                )}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
