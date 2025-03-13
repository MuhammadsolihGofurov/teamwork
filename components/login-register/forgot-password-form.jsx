import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Title } from "../custom/typograph";
import { Password, PhoneInput } from "../custom/form";
import { useIntl } from "react-intl";
import { NextLink } from "../Utils";
import { WithFacebook, WithGoogle } from "./details";
import { ButtonSpinner } from "../custom/loading";
import { unmaskPhone } from "@/utils/funcs";
import axios from "@/utils/axios";
import { ForgotPassword, LoginUrl, RegisterUrl } from "@/utils/router";
import { Breadcrumbs, PersonImages } from "../custom";
import { toast } from "react-toastify";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const intl = useIntl();
  const [code, setCode] = useState("998");
  const [reqLoading, setReqLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
    },
  });

  const submitFn = async (data) => {
    const { username } = data;
    try {
      setReqLoading(true);
      let phone_number = `${code}${unmaskPhone(username)}`;

      const payload = {
        phone_number,
      };

      const response = await axios.post("/auth/reset-password", payload);

      toast.success(
        intl.formatMessage({ id: "forgot-password-send-code-success-message" }),
        {
          theme: "colored",
        }
      );
    } catch (e) {
      console.error(e);
      toast.error(e?.response?.data?.message, { theme: "colored" });
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
            name: intl.formatMessage({ id: "forgot-password-bread" }),
            url: LoginUrl,
          },
        ]}
        isReturn
      />
      <div className="flex flex-col sm:w-auto w-full gap-1 items-start">
        <PhoneInput
          type={"text"}
          register={register}
          name={"username"}
          placeholder={"___ __ ___ __ __"}
          id="username"
          required
          setCode={setCode}
          validation={{
            required: "Telefon raqam majburiy",
            pattern: {
              value: /^\d{2} \d{3}-\d{2}-\d{2}$/,
              message: "Noto‘g‘ri telefon raqam",
            },
          }}
        />
        <div className="text-primary font-normal sm:ml-28 pt-5 flex flex-col w-full sm:w-3/6 gap-5">
          <p>{intl.formatMessage({ id: "forgot-password-p-1" })}</p>
          <p>{intl.formatMessage({ id: "forgot-password-p-2" })}</p>
        </div>
      </div>
      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row lg:w-auto w-full sm:pl-24">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
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
