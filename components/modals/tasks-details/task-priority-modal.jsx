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

export default function TaskPriorityModal() {
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
    defaultValues: {},
  });

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
      await authAxios.post(`/task/paid-services?id=${task_id}`, {
        prioritize: true,
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
              <rect x="10" width="40" height="40" rx="20" fill="#98BE00" />
              <path
                d="M19.9998 31.6654V18.332M19.9998 18.332L14.9998 23.332M19.9998 18.332L24.9998 23.332M14.9998 38.332H16.6665M23.3332 38.332H24.9998M31.6665 38.332H33.3332M6.6665 38.332H8.33317"
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
                id: "Tepaga ko'tarish",
              })}
            </h1>
            <p className="text-sm text-primary text-opacity-70 font-normal">
              {intl.formatMessage({
                id: "Topshiriqni bir marta ro'yxatni eng tepasiga olib chiqish uchun",
              })}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-md border border-dashed border-bg-3 flex justify-between sm:flex-row flex-col gap-5 min-h-[200px] sm:min-h-[120px]">
          <div className="flex flex-col gap-2 w-full sm:w-3/5">
            <div className="flex justify-between items-center gap-5">
              <p className="text-sm text-primary text-opacity-70">
                {intl.formatMessage({
                  id: "“Yuqoriga ko'tarish” narxi:",
                })}
              </p>
              <p className="text-sm text-primary font-semibold whitespace-nowrap">
                {thousandSeperate(tasks_details_sums?.cost_of_priority)}{" "}
                {intl.formatMessage({ id: "so'm" })}{" "}
              </p>
            </div>
          </div>
          <div className="w-[1px] border border-dashed border-bg-3"></div>
          <div className="flex flex-col gap-3 w-full sm:w-2/5">
            <div className="flex flex-col sm:items-start items-end">
              <p className="text-sm text-primary text-opacity-70 font-semibold">
                {intl.formatMessage({ id: "Jami to'lov" })}:
              </p>
              <p className="text-sm text-primary text-opacity-70 font-semibold">
                {thousandSeperate(tasks_details_sums?.cost_of_priority)}{" "}
                {intl.formatMessage({ id: "so'm" })}
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
        </div>
      </form>
    </div>
  );
}
