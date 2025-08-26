import { Input, Select } from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import { ButtonSpinner } from "@/components/custom/loading";
import { authAxios } from "@/utils/axios";
import { getYear } from "@/utils/funcs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function SkillsResumeForm({ isMobile, page = "profile" }) {
  const router = useRouter();
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();

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
      country_id: "",
      universty_name: "",
      field_of_study: "",
      degree: "",
      begin_edu_year: "",
      end_edu_year: "",
    },
  });

  //   useEffect(() => {
  //     const user = user_info?.expert;

  //     setValue("necessary_information", user?.necessary_information);
  //   }, [user_info, setValue]);

  const submitFn = async (data) => {
    const {
      country_id,
      universty_name,
      field_of_study,
      degree,
      begin_edu_year,
      end_edu_year,
    } = data;

    try {
      setReqLoading(true);

      const payload = {
        country_id,
        universty_name,
        field_of_study,
        degree,
        begin_edu_year: getYear(begin_edu_year.startDate),
        end_edu_year: getYear(end_edu_year.startDate),
      };

      const response = await authAxios.post("/resume-edu/create", payload);

      toast.success(
        intl.formatMessage({
          id: "Muvaffaqiyatli, Ta'lim ma'lumotlaringiz qo'shildi!",
        })
      );
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  if (loading) {
    return <></>;
  }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white grid  grid-cols-1 md:grid-cols-2 items-start gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3`}
    >
      <Input
        errors={errors?.title}
        type={"text"}
        register={register}
        name={"title"}
        title={intl.formatMessage({ id: "Sarlavha" })}
        placeholder={intl.formatMessage({ id: "Ko'nikma nomi" })}
        id={`title${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
      />
      <Select
        errors={errors?.speciality_id}
        type={"text"}
        register={register}
        name={`speciality_id`}
        title={intl.formatMessage({ id: "Speciality" })}
        placeholder={""}
        id={`speciality_id${isMobile ? "1" : ""}`}
        // required
        state={"speciality"}
        isIcon={true}
        page={page}
        // validation={{
        //   required: intl.formatMessage({ id: "RequiredSpeciality" }),
        // }}
        control={control}
        isCollect={true}
      />
      <DatePickerUi
        errors={errors?.date_achieved}
        type={"date"}
        register={register}
        name={"date_achieved"}
        title={intl.formatMessage({ id: "Erishilgan sana" })}
        placeholder={""}
        id={`date_achieved${isMobile ? "1" : ""}`}
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
        id={`end_edu_year${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
        control={control}
      />
      <div className="flex sm:flex-row col-span-1 lg:col-span-2 w-full pt-6">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main w-full rounded-lg flex items-center justify-center text-center transition-opacity duration-300 ${
            !isValid
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading || !isValid}
        >
          {reqLoading ? (
            <ButtonSpinner />
          ) : (
            intl.formatMessage({ id: "Qo'shish" })
          )}
        </button>
      </div>
    </form>
  );
}
