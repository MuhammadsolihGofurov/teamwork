import { Input, Select, Textarea } from "@/components/custom/form";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import { ButtonSpinner } from "@/components/custom/loading";
import { AchievFormSkeleton } from "@/components/Skeleton/profile/resume";
import { authAxios } from "@/utils/axios";
import { getYear } from "@/utils/funcs";
import { ResumeUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function AchievResumeForm({ isMobile, page = "profile" }) {
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
      title: "",
      description: "",
      speciality_id: "",
      date_achieved: "",
    },
  });

  //   useEffect(() => {
  //     const user = user_info?.expert;

  //     setValue("necessary_information", user?.necessary_information);
  //   }, [user_info, setValue]);

  const submitFn = async (data) => {
    const { title, description, speciality_id, date_achieved } = data;

    try {
      setReqLoading(true);

      const payload = {
        title,
        description,
        speciality_id,
        date_achieved: date_achieved?.startDate,
      };

      await authAxios.post("/user-achievements/create", payload);

      toast.success(
        intl.formatMessage({
          id: "Muvaffaqiyatli, Yutuqlaringiz qo'shildi!",
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
    return <AchievFormSkeleton />;
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
        placeholder={intl.formatMessage({ id: "Yutuq nomi" })}
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

      <div className="col-span-1 md:col-span-2 w-full">
        <Textarea
          errors={errors?.description}
          type={"description"}
          register={register}
          name={"description"}
          title={intl.formatMessage({ id: "Tavsifi" })}
          placeholder={intl.formatMessage({ id: "Kiriting" })}
          id={`description${isMobile ? "1" : ""}`}
          required
          page={"with-bg"}
          validation={{
            required: intl.formatMessage({ id: "Majburiy" }),
          }}
          watch={watch}
        />
      </div>

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
