import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  File,
  Input,
  Password,
  PhoneInput,
  Radio,
  Select,
} from "../custom/form";
import { useIntl } from "react-intl";
import { ButtonSpinner } from "../custom/loading";
import { formatDate, unmaskPhone } from "@/utils/funcs";
import axios from "@/utils/axios";
import { Breadcrumbs } from "../custom";
import { toast } from "react-toastify";
import { REGISTERASUSERTYPE, REGISTERPHONENUMBER } from "@/utils/data";
import DatePickerUi from "../custom/form/details/date-picker";

export default function RegisterAsDetails({ page }) {
  const router = useRouter();
  const intl = useIntl();
  const [code, setCode] = useState("998");
  const [reqLoading, setReqLoading] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      date_of_birth: "",
      gender: "",
      country: "",
    },
  });

  const submitFn = async (data) => {
    const { date_of_birth } = data;
    try {
      setReqLoading(true);

      const payload = {};
      // const response = await axios.post("/auth/register", payload);
      const correct_birthday = formatDate(date_of_birth);

      console.error(correct_birthday);

      // localstoragega kelgan malumotlarni saqlash kerak.

      toast.success(
        intl.formatMessage({ id: "register-as-details-success-message" })
      );

      // setTimeout(() => {
      //   router.push("/auth/register/sms-code");
      // }, 500);
    } catch (e) {
      console.error(e);
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
      className="flex flex-col gap-9 w-full items-center lg:items-start text-start"
    >
      <Breadcrumbs
        data={[
          {
            id: 1,
            name: intl.formatMessage({ id: "register-as-bread" }),
            url: "auth/register",
          },
        ]}
        isReturn
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 items-start w-full">
        {/* <div className="col-span-1 sm:col-span-2">
          <File page={page} />
        </div> */}

        <DatePickerUi
          errors={errors?.date_of_birth}
          type={"date"}
          register={register}
          name={"birthday"}
          title={intl.formatMessage({ id: "birthday" })}
          placeholder={""}
          id="birthday"
          required
          page={page}
          validation={{
            required: "FIO majburiy",
          }}
          control={control}
        />

        <Radio
          errors={errors?.date_of_birth}
          type={"radio"}
          register={register}
          name={"gender"}
          title={intl.formatMessage({ id: "gender" })}
          placeholder={""}
          id="gender"
          required
          page={"gender"}
          validation={{
            required: "FIO majburiy",
          }}
        />

        <Select
          errors={errors?.country}
          type={"text"}
          register={register}
          name={"country"}
          title={intl.formatMessage({ id: "Mamlakat" })}
          placeholder={""}
          id="country"
          required
          page={"country"}
          isIcon={true}
          validation={{
            required: "FIO majburiy",
          }}
        />

        <Select
          errors={errors?.country}
          type={"text"}
          register={register}
          name={"region_id"}
          title={intl.formatMessage({ id: "Viloyat" })}
          placeholder={""}
          id="region"
          required
          page={"region"}
          isIcon={true}
          validation={{
            required: "FIO majburiy",
          }}
        />
      </div>

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full pt-6 sm:pt-10">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
            !isValid
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading || !isValid}
        >
          {reqLoading ? <ButtonSpinner /> : intl.formatMessage({ id: "next" })}
        </button>
      </div>
    </form>
  );
}
