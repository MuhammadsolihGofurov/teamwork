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
  MyOrdersViewIdUrl,
  MyOrdersViewOffersUrl,
  TasksUrl,
} from "@/utils/router";
import { setSpecialityCurrent, setSpecialityIds } from "@/redux/slice/settings";
import { METHOD_STATUS_EDIT } from "@/utils/data";

export default function AgreementCreateForm({ oldData = {}, method }) {
  const router = useRouter();
  const intl = useIntl();
  const [reqLoading, setReqLoading] = useState(false);
  const { specialityChildren, specialities } = useSelector(
    (state) => state.settings
  );
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
      //   files: []
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
      formData.append("agreement_price", budget);
      formData.append("dead_line", dead_line?.startDate);
      formData.append("more_info", more_info);
      //   formData.append("count_of_days", count_of_days);
      // formData.append("inability_to_price", inability_to_price ? 1 : 0);
      // formData.append("inability_to_dead_line", inability_to_dead_line ? 1 : 0);
      // formData.append("speciality_parent_id", speciality_parent_id);
      // formData.append("speciality_id", speciality_id);
      // formData.append("expert_type", expert_type);
      // formData.append("is_pro_account", is_pro_account);
      let request_url = `/agreement/create?offer_id=${router.query.offer_id}`;
      let old_files = `offer_files`;

      if (method == METHOD_STATUS_EDIT) {
        request_url = `/agreement/edit?id=${router.query.agreement_id}`;
        old_files = `old_attachments`;
      }

      data.files.forEach((file, index) => {
        if (file.old) {
          // 'old: true' bo'lsa, old_attachments[] ga qo'shish
          formData.append(`${old_files}[${index}]`, file?.attachment_id);
        } else {
          // 'old' bo'lmasa, yangi fayl bo'lib files[] ga qo'shish
          formData.append(`files[${index}]`, file.file || file);
        }
      });

      const response = await authAxios.post(request_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        intl.formatMessage({ id: "success-agreement-create-to-send-expert" })
      );

      reset();
      setTimeout(() => {
        router.push(`/${MyOrdersViewIdUrl}?task_id=${router.query.task_id}`);
      }, 1000);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  useEffect(() => {
    setValue("title", oldData?.title);
    setValue("budget", oldData?.budget);
    setValue("dead_line", {
      startDate: oldData?.dead_line,
      endDate: oldData?.dead_line,
    });
    setValue("more_info", oldData?.more_info);
    setValue("inability_to_price", oldData?.inability_to_price);
    setValue("inability_to_dead_line", oldData?.inability_to_dead_line);

    if (oldData?.attachments) {
      const filesArray = oldData.attachments.map((file, index) => {
        const newFile = new File([file], file.name || `file_${index}`, {
          type: file.type,
        });

        return { ...file, old: true, attachment_id: file?.id };
      });
      setValue("files", filesArray);
    }
  }, [oldData, setValue]);

  // specialities sets.
  // useEffect(() => {
  //   const speciality_current = specialities?.find(
  //     (item) => item?.id == oldData?.speciality?.parent_id
  //   );
  //   dispatch(setSpecialityCurrent(speciality_current));

  //   if (specialities) {
  //     setValue("speciality_parent_id", oldData?.speciality?.parent_id);
  //   }
  //   setValue("speciality_id", oldData?.speciality?.id);
  // }, [setValue, oldData, specialities]);

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className={`bg-white `}
    >
      <div className="grid-cols-1 items-start rounded-lg3">
        <div className="border-b border-t border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 flex flex-col gap-5">
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
            defaultValue={watch("files")}
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
            // withCheckbox
            // isInAbilityName="inability_to_price"
            // required={!isPrice} // isPrice true bo'lsa, requiredni olib tashlash
            // noSelected={isPrice}
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
            // withCheckbox
            // isInAbilityName="inability_to_dead_line"
            // required={!isDeadline} // isDeadline true bo'lsa, requiredni olib tashlash
            // noSelected={isDeadline}
          />
        </div>

        {/* <div
          className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
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
            isCollect={true}
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
        </div> */}

        <div className="flex items-start gap-2 pt-8 px-0 sm:px-10 ">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1"
          >
            <g clipPath="url(#clip0_576_25289)">
              <path
                d="M9.77612 0.285156L1.42969 2.80484V9.10403C1.42969 13.1986 4.81365 17.6498 9.77612 20.2852C14.7386 17.6499 18.1226 13.1986 18.1226 9.10403V2.80484L9.77612 0.285156ZM9.77612 18.8451C5.51217 16.3824 2.68953 12.5317 2.68953 9.10403V3.74059L9.77612 1.60136V18.8451Z"
                fill="#FF9533"
              />
            </g>
            <defs>
              <clipPath id="clip0_576_25289">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span className="flex-1 text-orange flex">
            <span className="sm:w-3/4 flex">
              {intl.formatMessage({
                id: "Komissiya xizmatiga sizning xaq-huquqlaringizni himoya qilish - Arbitraj xizmatlari kiradi. ",
              })}
            </span>
          </span>
        </div>
      </div>
      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row col-span-1 sm:w-auto w-full pt-8 px-0 sm:px-5 pb-5">
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
            intl.formatMessage({ id: "Kelishuv shartlarini yuborish" })
          )}
        </button>
      </div>
    </form>
  );
}
