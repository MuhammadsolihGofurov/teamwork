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

export default function UpdateAchievResumeModal({ page = "profile" }) {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();
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

    setValue("title", old_data?.title);
    setValue("description", old_data?.description);
    setValue("speciality_id", old_data?.speciality_id);
    setValue("date_achieved", {
      startDate: old_data?.date_achieved,
      endDate: old_data?.date_achieved,
    });
  }, [modal?.props?.data, setValue]);

  if (!modal.isOpen) return null;

  const submitFn = async (data) => {
    setReqLoading(true);
    try {
      const { title, description, speciality_id, date_achieved } = data;

      const payload = {
        title,
        description,
        speciality_id,
        date_achieved: date_achieved?.startDate,
      };

      await authAxios.post(
        `/user-achievements/update?id=${modal?.props?.data?.id}`,
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
          errors={errors?.title}
          type={"text"}
          register={register}
          name={"title"}
          title={intl.formatMessage({ id: "Sarlavha" })}
          placeholder={intl.formatMessage({ id: "Yutuq nomi" })}
          id={`title`}
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
          id={`speciality_id`}
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
          id={`date_achieved`}
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
            id={`description`}
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
