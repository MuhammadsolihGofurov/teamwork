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
import DatePickerUi from "../custom/form/details/date-picker";
import { getYear } from "date-fns";

export default function UpdateEduResumeModal({ page = "profile" }) {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    control,
    setValue,
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

  useEffect(() => {
    const old_data = modal?.props?.data;

    setValue("country_id", old_data?.country_id);
    setValue("universty_name", old_data?.universty_name);
    setValue("fields_of_study", old_data?.field_of_study);
    setValue("degree", old_data?.degree);
    setValue("begin_edu_year", {
      startDate: `${old_data?.begin_edu_year + "." + "01" + "." + "01"}`,
      endDate: `${old_data?.begin_edu_year + "." + "01" + "." + "01"}`,
    });
    setValue("end_edu_year", {
      startDate: `${old_data?.end_edu_year + "." + "01" + "." + "01"}`,
      endDate: `${old_data?.end_edu_year + "." + "01" + "." + "01"}`,
    });
  }, [modal?.props?.data, setValue]);

  if (!modal.isOpen) return null;

  const submitFn = async (data) => {
    setReqLoading(true);
    try {
      const {
        country_id,
        universty_name,
        fields_of_study,
        degree,
        begin_edu_year,
        end_edu_year,
      } = data;

      const payload = {
        country_id,
        universty_name,
        fields_of_study,
        degree,
        begin_edu_year: getYear(begin_edu_year.startDate),
        end_edu_year: getYear(end_edu_year.startDate),
      };

      await authAxios.post(
        `/resume-edu/update?id=${modal?.props?.data?.id}`,
        payload
      );

      toast.success(
        intl.formatMessage({ id: "Ma'lumotlar muvaffaqiyatli yangilandi!" })
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
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 py-10 modal ${
        visible ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
      onClick={closeModal}
    >
      <form
        className={`bg-white rounded-3xl px-5 sm:px-10 pt-10 pb-7 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-bg-2 w-11/12 xs:w-[600px] relative transform transition-all duration-300 ${
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

        <div className="col-span-1 sm:col-span-2">
          <h1 className="text-primary text-lg sm:text-xl font-semibold">
            {intl.formatMessage({ id: "Ma'lumotlarni yangilash" })}
          </h1>
        </div>

        <Select
          errors={errors?.country_id}
          type={"text"}
          register={register}
          name={"country_id"}
          title={intl.formatMessage({ id: "Mamlakat" })}
          placeholder={""}
          id={`country_id`}
          required
          state={"country"}
          isIcon={true}
          page={page}
          validation={{
            required: intl.formatMessage({ id: "RequiredCountry" }),
          }}
          control={control}
        />
        <Input
          errors={errors?.universty_name}
          type={"text"}
          register={register}
          name={"universty_name"}
          title={intl.formatMessage({ id: "Universitet nomi" })}
          placeholder={intl.formatMessage({
            id: "Toshkent davlat universiteti",
          })}
          id={`universty_name`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
        />
        <Input
          errors={errors?.fields_of_study}
          type={"text"}
          register={register}
          name={"fields_of_study"}
          title={intl.formatMessage({ id: "Ta'lim yo'nalishi" })}
          placeholder={intl.formatMessage({ id: "Moliya" })}
          id={`fields_of_study`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
        />
        <Input
          errors={errors?.degree}
          type={"text"}
          register={register}
          name={"degree"}
          title={intl.formatMessage({ id: "Ta'lim darajasi" })}
          placeholder={intl.formatMessage({ id: "1-kurs" })}
          id={`degree`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
        />
        <DatePickerUi
          errors={errors?.begin_edu_year}
          type={"date"}
          register={register}
          name={"begin_edu_year"}
          title={intl.formatMessage({ id: "Ta'lim boshlanish yili" })}
          placeholder={""}
          id={`begin_edu_year`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          control={control}
        />
        <DatePickerUi
          errors={errors?.end_edu_year}
          type={"date"}
          register={register}
          name={"end_edu_year"}
          title={intl.formatMessage({ id: "Ta'lim tugash yili" })}
          placeholder={""}
          id={`end_edu_year`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          control={control}
        />

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
