import { Input, Select } from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import { ButtonSpinner } from "@/components/custom/loading";
import { EduFormSkeleton } from "@/components/Skeleton/profile/resume";
import { authAxios } from "@/utils/axios";
import { getYear } from "@/utils/funcs";
import { ResumeUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function EduResumeForm({
  isMobile,
  page = "profile",
  type = "create",
}) {
  const router = useRouter();
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const [imageSet, setImageSet] = useState(null);
  // Profile rasmi
  const [image, setImage] = useState(null);
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
        degree: `${degree}`,
        begin_edu_year: getYear(begin_edu_year.startDate),
        end_edu_year: getYear(end_edu_year.startDate),
      };

      await authAxios.post("/resume-edu/create", payload);

      toast.success(
        intl.formatMessage({
          id: "Muvaffaqiyatli, Ta'lim ma'lumotlaringiz qo'shildi!",
        })
      );

      reset();

      setTimeout(() => {
        router.push(`/${ResumeUrl}`);
      }, 1500);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  if (loading) {
    return <EduFormSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white grid  grid-cols-1 md:grid-cols-2 items-start gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3`}
    >
      <Select
        errors={errors?.country_id}
        type={"text"}
        register={register}
        name={"country_id"}
        title={intl.formatMessage({ id: "Mamlakat" })}
        placeholder={""}
        id={`country_id${isMobile ? "1" : ""}`}
        required
        state={"country"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
        control={control}
      />
      <Input
        errors={errors?.universty_name}
        type={"text"}
        register={register}
        name={"universty_name"}
        title={intl.formatMessage({ id: "Universitet nomi" })}
        placeholder={intl.formatMessage({ id: "Toshkent davlat universiteti" })}
        id={`universty_name${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
      />
      <Input
        errors={errors?.field_of_study}
        type={"text"}
        register={register}
        name={"field_of_study"}
        title={intl.formatMessage({ id: "Ta'lim yo'nalishi" })}
        placeholder={intl.formatMessage({ id: "Moliya" })}
        id={`field_of_study${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
      />
      <Select
        errors={errors?.degree}
        type={"text"}
        register={register}
        name={"degree"}
        title={intl.formatMessage({ id: "Ta'lim darajasi" })}
        placeholder={""}
        id={`degree${isMobile ? "1" : ""}`}
        required
        state={"degree"}
        isIcon={true}
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
        control={control}
        withState={"static"}
      />
      <DatePickerUi
        errors={errors?.begin_edu_year}
        type={"date"}
        register={register}
        name={"begin_edu_year"}
        title={intl.formatMessage({ id: "Ta'lim boshlanish yili" })}
        placeholder={""}
        id={`begin_edu_year${isMobile ? "1" : ""}`}
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
