import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { File, Input, Password, PhoneInput } from "../custom/form";
import { useIntl } from "react-intl";
import { ButtonSpinner } from "../custom/loading";
import { unmaskPhone } from "@/utils/funcs";
import axios from "@/utils/axios";
import { Breadcrumbs } from "../custom";
import { toast } from "react-toastify";
import {
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "@/redux/slice/user";

export default function RegisterInfo({ page }) {
  const router = useRouter();
  const intl = useIntl();
  const [code, setCode] = useState("998");
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      full_name: "",
      phone_number: "",
      password: "",
      repeat_password: "",
    },
  });

  useEffect(() => {
    dispatch(setProfilePercentage(75));
  }, []);

  const password = watch("password");
  const repeatPassword = watch("repeat_password");

  useEffect(() => {
    if (repeatPassword && password !== repeatPassword) {
      setError("repeat_password", {
        type: "manual",
        message: intl.formatMessage({ id: "isNotEqualsPassword" }),
      });
    } else {
      clearErrors("repeat_password");
    }
  }, [password, repeatPassword, setError, clearErrors]);

  const submitFn = async (data) => {
    const { phone_number, password, repeat_password, full_name } = data;
    try {
      setReqLoading(true);
      let phone = `${code}${unmaskPhone(phone_number)}`;
      const type = Number(localStorage.getItem(REGISTERASUSERTYPE));

      const payload = {
        phone_number: phone,
        password,
        repeat_password,
        full_name,
        type,
      };
      const response = await axios.post("/auth/register", payload);

      // localstoragega kelgan malumotlarni saqlash kerak.
      localStorage.setItem(REGISTERAUTHKEY, response?.data?.data.auth_key);
      localStorage.setItem(REGISTERPHONENUMBER, phone);

      toast.success(
        intl.formatMessage({ id: "register-info-success-message" })
      );

      setTimeout(() => {
        router.push("/auth/register/sms-code");
      }, 500);
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

        <Input
          errors={errors?.full_name}
          type={"text"}
          register={register}
          name={"full_name"}
          title={intl.formatMessage({ id: "FIO" })}
          placeholder={intl.formatMessage({ id: "Passportga ko’ra" })}
          id="full_name"
          required
          page={page}
          setCode={setCode}
          validation={{
            required: intl.formatMessage({ id: "RequiredName" }),
          }}
        />

        <PhoneInput
          errors={errors?.phone_number}
          type={"text"}
          register={register}
          name={"phone_number"}
          placeholder={"___ __ ___ __ __"}
          id="phone_number"
          required
          title={intl.formatMessage({ id: "Telefon raqami" })}
          setCode={setCode}
          page={"info"}
          validation={{
            required: intl.formatMessage({ id: "requiredPhone" }),
            pattern: {
              value: /^\d{2} \d{3}-\d{2}-\d{2}$/,
              message: intl.formatMessage({ id: "isNotEqualsPhone" }),
            },
          }}
        />

        <Password
          errors={errors?.password}
          type={"password"}
          register={register}
          name={"password"}
          placeholder={intl.formatMessage({ id: "passwordPlaceholder" })}
          title={intl.formatMessage({ id: "passwordInput" })}
          id="password"
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "RequiredPassword" }),
            minLength: {
              value: 6,
              message: intl.formatMessage({ id: "password6RequiredTypes" }),
            },
          }}
        />

        <Password
          errors={errors?.repeat_password}
          type={"password"}
          register={register}
          name={"repeat_password"}
          placeholder={intl.formatMessage({
            id: "Parolingizni qayta kiriting",
          })}
          title={intl.formatMessage({ id: "Parolni qayta kiriting" })}
          id="repeat_password"
          required
          page={page}
          validation={{
            required: intl.formatMessage({ id: "RequiredPassword" }),
            minLength: {
              value: 6,
              message: intl.formatMessage({ id: "password6RequiredTypes" }),
            },
            validate: (value) =>
              value === password ||
              intl.formatMessage({ id: "isNotEqualsPassword" }),
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
