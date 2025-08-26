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
import { getMonth, getYear } from "date-fns";
import { useRouter } from "next/router";

export default function UpdateExpResumeModal({ page = "profile" }) {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const router = useRouter();
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

  const thisTimeWorked = watch("this_time_worked");
  const isWorked = thisTimeWorked == 1;

  useEffect(() => {
    const old_data = modal?.props?.data;

    setValue("this_time_worked", old_data?.this_time_worked);
    setValue("info", old_data?.info);
    setValue("country", old_data?.country);
    setValue("name", old_data?.name);
    setValue("position", old_data?.position);
    setValue("region", old_data?.region);
    setValue("start_year", {
      startDate: old_data?.start_year,
      endDate: old_data?.start_year,
    });
    setValue("end_year", {
      startDate: old_data?.end_year,
      endDate: old_data?.end_year,
    });
  }, [modal?.props?.data, setValue]);

  if (!modal.isOpen) return null;

  const submitFn = async (data) => {
    setReqLoading(true);
    try {
      const {
        country,
        name,
        position,
        info,
        region,
        start_year,
        end_year,
        this_time_worked,
      } = data;

      const payload = {
        country,
        name,
        position,
        info,
        region,
        this_time_worked: this_time_worked ? 1 : 0,
        start_year: getYear(start_year.startDate),
        start_month: getMonth(start_year.startDate),
        end_year: isWorked ? null : getYear(end_year.endDate),
        end_month: isWorked ? null : getMonth(end_year.endDate),
      };

      await authAxios.post(
        `/resume-works/update?id=${modal?.props?.data?.id}`,
        payload
      );

      toast.success(
        intl.formatMessage({ id: "Ma'lumotlar muvaffaqiyatli yangilandi!" })
      );
      reset();

      closeModal();
      setTimeout(() => {
        router.reload();
      }, 1500);
    } catch (e) {
      setReqLoading(false);
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0  left-0 w-full inset-0 min-h-screen overflow-y-auto bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 py-10 modal ${
        visible ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
      onClick={closeModal}
    >
      <form
        className={`bg-white rounded-3xl px-5 sm:px-10 pt-10 pb-7 grid grid-cols-1 sm:grid-cols-2 gap-6 border border-bg-2 w-11/12 xs:w-[600px] relative transform transition-all duration-300 my-auto ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        } `}
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

        <Input
          errors={errors?.name}
          type={"text"}
          register={register}
          name={"name"}
          title={intl.formatMessage({ id: "Tashkilot nomi" })}
          placeholder={intl.formatMessage({ id: "Teamwork.uz" })}
          id={`name`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
        />
        <Input
          errors={errors?.position}
          type={"text"}
          register={register}
          name={"position"}
          title={intl.formatMessage({ id: "Lavozim" })}
          placeholder={intl.formatMessage({ id: "Frontend Developer" })}
          id={`position`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
        />
        <Select
          errors={errors?.country}
          type={"text"}
          register={register}
          name={"country"}
          title={intl.formatMessage({ id: "Mamlakat" })}
          placeholder={""}
          id={`country`}
          required
          state={"country"}
          isIcon={true}
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          control={control}
        />
        <Select
          errors={errors?.region}
          type={"text"}
          register={register}
          name={"region"}
          title={intl.formatMessage({ id: "Viloyat" })}
          placeholder={""}
          id={`region`}
          required
          state={"region"}
          isIcon={true}
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          control={control}
          isAuth={true}
        />
        <DatePickerUi
          errors={errors?.start_year}
          type={"date"}
          register={register}
          name={"start_year"}
          title={intl.formatMessage({ id: "Boshlash yili" })}
          placeholder={""}
          id={`start_year`}
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          control={control}
        />
        <DatePickerUi
          errors={errors?.end_year}
          type={"date"}
          register={register}
          name={"end_year"}
          title={intl.formatMessage({ id: "Tugash yili" })}
          placeholder={""}
          id={`end_year`}
          page={page}
          control={control}
          validation={{
            required: isWorked ? false : intl.formatMessage({ id: "Majburiy" }),
          }}
          withCheckbox
          isInAbilityName="this_time_worked"
          required={!isWorked}
          noSelected={isWorked}
          checkBoxName="Hozirda ishlayapman"
        />
        <div className="col-span-1 md:col-span-2 w-full">
          <Textarea
            errors={errors?.info}
            type={"text"}
            register={register}
            name={"info"}
            title={intl.formatMessage({ id: "Tavsifi" })}
            placeholder={intl.formatMessage({ id: "Kiriting" })}
            id={`info`}
            required
            page={"with-bg"}
            validation={{
              required: intl.formatMessage({ id: "Majburiy" }),
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
