import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "@/redux/slice/user";
import { FileUploads, Input, Textarea } from "@/components/custom/form";
import { BioInfoUpdateSkeleton } from "@/components/Skeleton/profile/info";
import { ButtonSpinner } from "@/components/custom/loading";
import DatePickerUi from "@/components/custom/form/details/date-picker";

export default function WorkWithForm({ page = "profile", isMobile }) {
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
    formState: { errors, isDirty, isValid },
    control,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      necessary_information: "",
    },
  });

  const submitFn = async (data) => {
    const { necessary_information } = data;
    try {
      setReqLoading(true);

      const payload = {
        necessary_information,
      };

      // console.error(payload);

      const response = await authAxios.post(
        "/user/update-expert-data?expand=specialitySets.parent",
        payload
      );

      toast.success(intl.formatMessage({ id: "success-update-personal-data" }));
      setTimeout(() => {
        dispatch(fetchUserData());
        reset();
      }, 1000);
      setImage(null);
      setImageSet(null);

      //   setTimeout(() => {
      //     router.push("/auth/register/sms-code");
      //   }, 500);
    } catch (e) {
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  // if (loading) {
  //   return <BioInfoUpdateSkeleton />;
  // }

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

        <div className="sm:p-10 sm:pb-8 pb-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Input
            errors={errors?.price}
            type={"number"}
            register={register}
            name={"price"}
            title={intl.formatMessage({ id: "Taklif etilayotgan byudjet" })}
            placeholder={"00.00"}
            id={`price`}
            required
            page={"with-border-bg"}
            validation={{
              required: intl.formatMessage({ id: "RequiredOfferPrice" }),
            }}
          />
          <Input
            errors={errors?.count_of_days}
            type={"number"}
            register={register}
            name={"count_of_days"}
            title={intl.formatMessage({ id: "Muddati" })}
            placeholder={intl.formatMessage({ id: "Kun kiriting" })}
            id={`count_of_days`}
            required
            page={"with-border-bg"}
            icon={`/images/deadline-icon.svg`}
            validation={{
              required: intl.formatMessage({ id: "RequiredOfferCount" }),
            }}
          />
          <DatePickerUi
            errors={errors?.dead_line}
            type={"number"}
            register={register}
            name={"dead_line"}
            title={intl.formatMessage({ id: "Muddati" })}
            placeholder={intl.formatMessage({ id: "Kun kiriting" })}
            id={`dead_line`}
            required
            page={"profile"}
            validation={{
              required: intl.formatMessage({ id: "RequiredOfferCount" }),
            }}
            minDate
            control={control}
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
            intl.formatMessage({ id: "Yangilash" })
          )}
        </button>
      </div>
    </form>
  );
}
