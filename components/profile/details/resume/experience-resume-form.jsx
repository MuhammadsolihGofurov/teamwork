import { Input, Select, Textarea } from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import { ButtonSpinner } from "@/components/custom/loading";
import { ExperienceFormSkeleton } from "@/components/Skeleton/profile/resume";
import { authAxios } from "@/utils/axios";
import { getMonth, getYear } from "@/utils/funcs";
import { ResumeUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ExperienceResumeForm({ isMobile, page = "profile" }) {
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
      name: "",
      country: "",
      region: "",
      start_time: "",
      end_time: "",
      position: "",
      this_time_worked: "",
      info: "",
    },
  });

  const thisTimeWorked = watch("this_time_worked");
  const isWorked = thisTimeWorked == 1;

  const submitFn = async (data) => {
    const {
      name,
      country,
      region,
      position,
      start_time,
      end_time,
      info,
      this_time_worked,
    } = data;

    try {
      setReqLoading(true);

      const payload = {
        name,
        country,
        region,
        position,
        start_year: getYear(start_time.startDate),
        start_month: getMonth(start_time.startDate),
        end_year: isWorked ? null : getYear(end_time.endDate),
        end_month: isWorked ? null : getMonth(end_time.endDate),
        info,
        this_time_worked: this_time_worked ? 1 : 0,
      };

      await authAxios.post("/resume-works/create", payload);

      toast.success(
        intl.formatMessage({
          id: "Muvaffaqiyatli, Ish tajribangiz qo'shildi!",
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
    return <ExperienceFormSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white grid  grid-cols-1 md:grid-cols-2 items-start gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3`}
    >
      <Input
        errors={errors?.name}
        type={"text"}
        register={register}
        name={"name"}
        title={intl.formatMessage({ id: "Tashkilot nomi" })}
        placeholder={intl.formatMessage({ id: "Teamwork.uz" })}
        id={`name${isMobile ? "1" : ""}`}
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
        id={`position${isMobile ? "1" : ""}`}
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
        id={`country${isMobile ? "1" : ""}`}
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
        id={`region${isMobile ? "1" : ""}`}
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
        errors={errors?.start_time}
        type={"date"}
        register={register}
        name={"start_time"}
        title={intl.formatMessage({ id: "Boshlash yili" })}
        placeholder={""}
        id={`start_time${isMobile ? "1" : ""}`}
        required
        page={page}
        validation={{
          required: intl.formatMessage({ id: "Majburiy" }),
        }}
        control={control}
      />
      <DatePickerUi
        errors={errors?.end_time}
        type={"date"}
        register={register}
        name={"end_time"}
        title={intl.formatMessage({ id: "Tugash yili" })}
        placeholder={""}
        id={`end_time${isMobile ? "1" : ""}`}
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
          id={`info${isMobile ? "1" : ""}`}
          required
          page={"with-bg"}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          watch={watch}
        />
      </div>

      <div className="flex sm:flex-row col-span-1 md:col-span-2 w-full pt-6">
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
