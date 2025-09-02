import { useModal } from "@/context/modal-provider";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authAxios } from "@/utils/axios";
import { setAgreementStatus, setChangedData } from "@/redux/slice/stages";
import { ButtonSpinner } from "@/components/custom/loading";
import { Switcher } from "@/components/custom/form";
import { fetchTasksDetailsSums } from "@/redux/slice/user";
import { thousandSeperate } from "@/utils/funcs";
import { useRouter } from "next/router";

export default function TaskFastAndColor() {
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
      mark_as_immediate: false,
      seperate_by_color: false,
    },
  });

  const mark_as_immediate = watch("mark_as_immediate");
  const seperate_by_color = watch("seperate_by_color");

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
      const { mark_as_immediate, seperate_by_color } = data;

      await authAxios.post(
        `/task/paid-services?id=${task_id}`,
        {
          mark_as_immediate,
          seperate_by_color,
        }
      );

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
    return `${
      (mark_as_immediate && tasks_details_sums?.cost_of_marking_as_immediate) +
      (seperate_by_color && tasks_details_sums?.cost_of_color_seperation)
    }`;
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
              <rect x="10" width="40" height="40" rx="20" fill="#FFDB59" />
              <path
                d="M11.6668 33.3346C9.9322 34.3139 8.52957 35.7889 7.63874 37.5706C6.74791 39.3523 6.40948 41.3594 6.66682 43.3346C8.64208 43.592 10.6492 43.2535 12.4309 42.3627C14.2125 41.4719 15.6875 40.0693 16.6668 38.3346M6.66683 31.668C9.63865 32.0211 12.4052 33.3639 14.5214 35.48C16.6376 37.5962 17.9803 40.3628 18.3335 43.3346C19.8067 42.4853 21.039 41.2743 21.9139 39.8162C22.7888 38.358 23.2774 36.7009 23.3335 35.0013C26.132 34.0168 28.5758 32.2246 30.3557 29.8513C32.1357 27.478 33.172 24.6302 33.3335 21.668C33.3335 20.3419 32.8067 19.0701 31.869 18.1324C30.9313 17.1948 29.6596 16.668 28.3335 16.668C25.3713 16.8295 22.5234 17.8657 20.1501 19.6457C17.7768 21.4257 15.9846 23.8695 15.0002 26.668C13.3006 26.7241 11.6434 27.2127 10.1853 28.0876C8.72711 28.9625 7.51615 30.1948 6.66683 31.668ZM26.6668 25.0013C26.6668 25.9218 25.9206 26.668 25.0002 26.668C24.0797 26.668 23.3335 25.9218 23.3335 25.0013C23.3335 24.0808 24.0797 23.3346 25.0002 23.3346C25.9206 23.3346 26.6668 24.0808 26.6668 25.0013Z"
                stroke="#222222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 flex-col gap-1">
            <h1 className="text-lg text-primary font-semibold">
              {intl.formatMessage({ id: "Buyurtmani ajratish" })}
            </h1>
            <p className="text-sm text-primary text-opacity-70 font-normal">
              {intl.formatMessage({
                id: "Buyurtmangizni tezkor va ajralib turishi uchun ushbu ma'lumotlarni to'ldiring!",
              })}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-3">
          <Switcher
            name="mark_as_immediate"
            control={control}
            label={`${intl.formatMessage({
              id: "“Tezkor” deb belgilash",
            })}, ${thousandSeperate(
              tasks_details_sums?.cost_of_marking_as_immediate
            )} ${intl.formatMessage({ id: "so'm" })}`}
            description={`${intl.formatMessage({
              id: "Tezkor deb belgilash orqali siz buyurtmangiz uchun mutaxassisni tezkor muddatda topishingiz mumkin",
            })}`}
          />
          <Switcher
            name="seperate_by_color"
            control={control}
            label={`${intl.formatMessage({
              id: "Rang bilan ajratish",
            })}, ${thousandSeperate(
              tasks_details_sums?.cost_of_color_seperation
            )} ${intl.formatMessage({ id: "so'm" })}`}
            description={`${intl.formatMessage({
              id: "Buyurtmangiz <Buyurtmalar> bo'limida rang bilan ajratilgan holda ko'rinadi!",
            })}`}
          />
        </div>

        <div className="p-3 rounded-md border border-dashed border-bg-3 flex justify-between sm:flex-row flex-col gap-5 min-h-[200px] sm:min-h-[120px]">
          <div className="flex flex-col gap-2 w-full sm:w-3/5">
            {mark_as_immediate && (
              <div className="flex justify-between items-center gap-5">
                <p className="text-sm text-primary text-opacity-70">
                  {intl.formatMessage({
                    id: "Tezkor deb belgilash Xizmat narxi:",
                  })}
                </p>
                <p className="text-sm text-primary font-semibold whitespace-nowrap">
                  {thousandSeperate(
                    tasks_details_sums?.cost_of_marking_as_immediate
                  )}{" "}
                  {intl.formatMessage({ id: "so'm" })}{" "}
                </p>
              </div>
            )}
            {seperate_by_color && (
              <div className="flex justify-between items-center gap-5">
                <p className="text-sm text-primary text-opacity-70">
                  {intl.formatMessage({
                    id: "Rang bilan ajratish Xizmat narxi:",
                  })}
                </p>
                <p className="text-sm text-primary font-semibold whitespace-nowrap">
                  {thousandSeperate(
                    tasks_details_sums?.cost_of_marking_as_immediate
                  )}{" "}
                  {intl.formatMessage({ id: "so'm" })}{" "}
                </p>
              </div>
            )}
          </div>
          <div className="w-[1px] border border-dashed border-bg-3"></div>
          {(mark_as_immediate || seperate_by_color) && (
            <div className="flex flex-col gap-3 w-full sm:w-2/5">
              <div className="flex flex-col sm:items-start items-end">
                <p className="text-sm text-primary text-opacity-70 font-semibold">
                  {intl.formatMessage({ id: "Jami to'lov" })}:
                </p>
                <p className="text-sm text-primary text-opacity-70 font-semibold">
                  {costSums()}{" "}
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
          )}
        </div>
      </form>
    </div>
  );
}
