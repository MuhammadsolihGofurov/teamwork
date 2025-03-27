import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { ButtonSpinner } from "../custom/loading";
import axios from "@/utils/axios";
import { Breadcrumbs } from "../custom";
import { toast } from "react-toastify";
import {
  EXPERT,
  PASSWORDRESETTOKEN,
  PRIVATEAUTHKEY,
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
} from "@/utils/data";
import { SMSCode } from "./details";
import {
  LoginUrl,
  ProfileUrl,
  RegisterAsDetailsUrl,
  RegisterAsInfoUrl,
} from "@/utils/router";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "@/redux/slice/user";
import { Password } from "../custom/form";

export default function FillNewPasswordForm({ page }) {
  const router = useRouter();
  const intl = useIntl();
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      code: Array(6).fill(""),
      password: "",
      repeat_password: "",
    },
  });

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

  useEffect(() => {
    dispatch(setProfilePercentage(50));
  }, []);

  const submitFn = async (data) => {
    const { code, password, repeat_password } = data;
    try {
      setReqLoading(true);
      const password_reset_token = localStorage.getItem(PASSWORDRESETTOKEN);

      const payload = {
        code: code.join(""),
        password_reset_token,
        password,
        repeat_password,
      };

      const response = await axios.post(
        "/auth/confirm-reset-password",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      //   localStorage.setItem(PRIVATEAUTHKEY, response?.data?.data?.auth_key);
      //   localStorage.setItem(REGISTERAUTHKEY, response?.data?.data?.auth_key);

      toast.success(intl.formatMessage({ id: "success-fill-new-password" }));

      // localhost auth_key
      localStorage.setItem(PRIVATEAUTHKEY, response?.data?.data?.auth_key);

      toast.success(intl.formatMessage({ id: "login-success-message" }));

      localStorage.removeItem(PASSWORDRESETTOKEN);

      setTimeout(() => {
        router.push(`/${ProfileUrl}`);
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
      className="flex flex-col gap-5 w-full items-center lg:items-start text-start"
    >
      <Breadcrumbs
        data={[
          {
            id: 1,
            name: intl.formatMessage({ id: "register-as-bread" }),
            url: RegisterAsInfoUrl,
          },
        ]}
        isReturn
      />

      <div className="flex flex-col gap-5 items-center lg:items-start w-full">
        {/* <div className="col-span-1 sm:col-span-2">
          <File page={page} />
        </div> */}
        <SMSCode
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
          page={page}
        />
      </div>

      <div className="w-full sm:w-[350px] lg:ml-24 flex flex-col gap-5">
        <Password
          errors={errors?.password}
          type={"password"}
          register={register}
          name={"password"}
          placeholder={intl.formatMessage({ id: "Yangi parol" })}
          title={intl.formatMessage({ id: "Yangi parol" })}
          id="password"
          required
          page={"register-info"}
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
            id: "Yangi parolni takrorlash",
          })}
          title={intl.formatMessage({ id: "Yangi parolni takrorlash" })}
          id="repeat_password"
          required
          page={"register-info"}
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

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full pt-6 sm:pt-10 lg:pl-24">
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
