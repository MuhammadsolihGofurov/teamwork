import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slice/user";
import { FileUploads, Input, Select, Textarea } from "@/components/custom/form";
import { BioInfoUpdateSkeleton } from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";
import DatePickerUi from "@/components/custom/form/details/date-picker";
import {
  ExpertsIndexUrl,
  MyOrdersUnPublishedUrl,
  TasksUrl,
} from "@/utils/router";
import { setSpecialityIds } from "@/redux/slice/settings";

export default function TasksCreateForm({ page = "profile", isMobile }) {
  const router = useRouter();
  const intl = useIntl();
  const [reqLoading, setReqLoading] = useState(false);
  const { specialityChildren } = useSelector((state) => state.settings);
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
      title: "",
      budget: "",
      dead_line: "",
      more_info: "",
      count_of_days: 0,
      inability_to_price: 0,
      inability_to_dead_line: 0,
      speciality_id: "",
      speciality_parent_id: "",
      expert_type: "EXPERT",
      is_pro_account: 0,
    },
  });

  const inabilityToPrice = watch("inability_to_price");
  const inabilityToDeadLine = watch("inability_to_dead_line");
  const isPrice = inabilityToPrice == 1;
  const isDeadline = inabilityToDeadLine == 1;

  const submitFn = async (data) => {
    const {
      title,
      budget,
      dead_line,
      more_info,
      inability_to_price,
      inability_to_dead_line,
      speciality_parent_id,
      speciality_id,
      expert_type,
      is_pro_account,
    } = data;
    try {
      setReqLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("budget", inability_to_price ? "" : budget);
      formData.append(
        "dead_line",
        inability_to_dead_line ? "" : dead_line?.startDate
      );
      formData.append("more_info", more_info);
      //   formData.append("count_of_days", count_of_days);
      formData.append("inability_to_price", inability_to_price ? 1 : 0);
      formData.append("inability_to_dead_line", inability_to_dead_line ? 1 : 0);
      formData.append("speciality_parent_id", speciality_parent_id);
      formData.append("speciality_id", speciality_id);
      formData.append("expert_type", expert_type);
      formData.append("is_pro_account", is_pro_account);

      data.files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });

      //   console.error(formData);

      const response = await authAxios.post("/task/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        intl.formatMessage({ id: "success-task-created-with-unpublished" })
      );

      reset();
      setTimeout(() => {
        router.push(`/${MyOrdersUnPublishedUrl}`);
      }, 1000);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white `}
    >
      <div className="grid-cols-1 items-start rounded-lg sm:border border-bg-3">
        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h4 className="text-xl font-medium text-primary">
              {intl.formatMessage({ id: "Nima qilish kerak?" })}
            </h4>
            <p className="text-primary text-opacity-60 text-base leading-5">
              {intl.formatMessage({ id: "ishga yo'llash body" })}
            </p>
          </div>
          <Textarea
            errors={errors?.title}
            type={"text"}
            register={register}
            name={"title"}
            title={""}
            placeholder={intl.formatMessage({
              id: "Topshiriq sarlavhasini aniq va tushunarli qilib yozishni tavsiya qilamiz!",
            })}
            id={`title`}
            required
            page={""}
            validation={{
              required: intl.formatMessage({ id: "RequiredTaskTitle" }),
              maxLength: {
                value: /^.{1,150}$/,
                message: intl.formatMessage({
                  id: "RequiredTaskTitle",
                }),
              },
            }}
            watch={watch}
            minHeight="min-h-[80px]"
            hint={intl.formatMessage({
              id: "RequiredTaskTitle",
            })}
          />
        </div>

        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 flex flex-col gap-5">
          <Textarea
            errors={errors?.more_info}
            type={"text"}
            register={register}
            name={"more_info"}
            title={intl.formatMessage({ id: "To'liq tavsilotlar" })}
            placeholder={intl.formatMessage({
              id: "Topshiriq haqida barcha ma'lumotlarni to'liq shu yerga joylashtiriing!",
            })}
            id={`more_info`}
            required
            page={""}
            validation={{
              required: intl.formatMessage({ id: "RequiredTaskBody" }),
              maxLength: {
                value: /^.{1,540}$/,
                message: intl.formatMessage({
                  id: "RequiredTaskBody",
                }),
              },
            }}
            watch={watch}
            hint={intl.formatMessage({
              id: "RequiredTaskBody",
            })}
          />
        </div>

        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 flex flex-col gap-5">
          <FileUploads
            control={control}
            title={intl.formatMessage({ id: "Tegishli fayllarni yuklang" })}
          />
        </div>

        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            errors={errors?.budget}
            type={"number"}
            register={register}
            name={"budget"}
            title={intl.formatMessage({ id: "Taklif etilayotgan byudjet" })}
            placeholder={
              isPrice
                ? intl.formatMessage({ id: "Kelishilgan holda" })
                : "00.000"
            }
            id={`budget`}
            page={"with-border-bg"}
            validation={{
              required: isPrice
                ? false // isPrice true bo'lsa requiredni olib tashlash
                : intl.formatMessage({ id: "RequiredOfferPrice" }), // isPrice false bo'lsa required bo'ladi
            }}
            withCheckbox
            isInAbilityName="inability_to_price"
            required={!isPrice} // isPrice true bo'lsa, requiredni olib tashlash
            noSelected={isPrice}
          />
          <DatePickerUi
            errors={errors?.dead_line}
            type={"number"}
            register={register}
            name={"dead_line"}
            title={intl.formatMessage({ id: "Muddati" })}
            placeholder={intl.formatMessage({ id: "Kun kiriting" })}
            id={`dead_line`}
            page={"profile"}
            minDate
            control={control}
            validation={{
              required: isDeadline
                ? false // isDeadline true bo'lsa requiredni olib tashlash
                : intl.formatMessage({ id: "RequiredOfferCount" }), // isDeadline false bo'lsa required bo'ladi
            }}
            withCheckbox
            isInAbilityName="inability_to_dead_line"
            required={!isDeadline} // isDeadline true bo'lsa, requiredni olib tashlash
            noSelected={isDeadline}
          />
        </div>

        <div
          className="sm:p-10 sm:pb-8 pb-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
          id="create-parts"
        >
          <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
            <h4 className="text-xl font-medium text-primary">
              {intl.formatMessage({ id: "Qo’shimcha ma’lumotlar" })}
            </h4>
            <p className="text-primary text-opacity-60 text-base leading-5">
              {intl.formatMessage({ id: "task create body" })}
            </p>
          </div>
          <Select
            errors={errors?.speciality_parent_id}
            type={"text"}
            register={register}
            name={"speciality_parent_id"}
            title={intl.formatMessage({ id: "Speciality" })}
            placeholder={""}
            id="speciality_parent_id"
            required
            state={"speciality"}
            isIcon={true}
            validation={{
              required: intl.formatMessage({ id: "RequiredSpeciality" }),
            }}
            page={"profile"}
            control={control}
          />

          <Select
            errors={errors?.speciality_id}
            type={"text"}
            register={register}
            name={"speciality_id"}
            title={intl.formatMessage({ id: "SpecialityChildren" })}
            placeholder={""}
            id="speciality_id"
            required={true}
            state={"speciality_children"}
            isIcon={true}
            validation={{
              required: intl.formatMessage({
                id: "RequiredSpecialityChildren",
              }),
            }}
            control={control}
            page={"profile"}
            // select_type="multiple_without_api"
            selectedState={specialityChildren}
            setSelectedAction={setSpecialityIds}
          />
        </div>
      </div>
      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row col-span-1 sm:w-auto w-full pt-5">
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
            intl.formatMessage({ id: "Yuborish" })
          )}
        </button>
      </div>
    </form>
  );
}
