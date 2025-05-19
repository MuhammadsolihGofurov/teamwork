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
import { ForgotPassword, MyOrdersUrl, MyTasksUrl, ProfileUrl, RegisterUrl } from "@/utils/router";
import { PersonImages } from "../custom";
import { toast } from "react-toastify";
import { PRIVATEAUTHKEY, REGISTERAUTHKEY } from "@/utils/data";

export default function LoginForm() {
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
      password: "",
    },
  });

  const submitFn = async (data) => {
    const { username, password } = data;
    try {
      setReqLoading(true);
      let phone_number = `${code}${unmaskPhone(username)}`;

      const payload = {
        phone_number,
        password,
      };
      const response = await axios.post("/auth/login", payload);

      // localhost auth_key
      console.error(response);
      localStorage.setItem(PRIVATEAUTHKEY, response?.data?.data?.auth_key);

      toast.success(intl.formatMessage({ id: "login-success-message" }));

      if(response?.data?.data?.incomplete_user){
        setTimeout(() => {
          router.push(`/${ProfileUrl}`);
        }, 500);
      }else{
        setTimeout(() => {
          router.push(`/${MyOrdersUrl}`);
        }, 500);
      }

    } catch (e) {
      // console.error(e);
      toast.error(e?.response?.data?.message);
    } finally {
      setReqLoading(false);
    }
  };

  const images = [
    { id: 1, img: "/images/person.jpg", title: "Images 1" },
    { id: 2, img: "/images/person.jpg", title: "Images 2" },
    { id: 3, img: "/images/person.jpg", title: "Images 3" },
    { id: 4, img: "/images/person.jpg", title: "Images 4" },
    { id: 5, img: "/images/person.jpg", title: "Images 5" },
  ];

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      role="form"
      autoComplete="off"
      className="flex flex-col gap-9 w-full items-center lg:items-start text-start"
    >
      <Title width="full">{intl.formatMessage({ id: "Tizimga kirish" })}</Title>
      <div className="flex flex-col sm:w-auto w-full gap-1 items-start">
        <PhoneInput
          errors={errors?.username}
          type={"text"}
          register={register}
          name={"username"}
          placeholder={"___ __ ___ __ __"}
          id="username"
          required
          setCode={setCode}
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
          placeholder={intl.formatMessage({ id: "passwordInput" })}
          id="password"
          required
          validation={{
            required: intl.formatMessage({ id: "RequiredPassword" }),
            minLength: {
              value: 6,
              message: intl.formatMessage({ id: "password6RequiredTypes" }),
            },
          }}
        />
        <NextLink
          url={ForgotPassword}
          className="text-main font-medium sm:ml-28 pt-3"
        >
          {intl.formatMessage({ id: "Parolingizni unutdingizmi?" })}
        </NextLink>
      </div>
      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full">
        <div className="flex w-full gap-1 sm:gap-0 justify-center">
          <WithGoogle anyClass={"z-[2]"} />
          <WithFacebook anyClass={"sm:-ml-4 z-[1]"} />
        </div>
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main w-full sm:min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
            !isValid
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading || !isValid}
        >
          {reqLoading ? (
            <ButtonSpinner />
          ) : (
            intl.formatMessage({ id: "Kirish" })
          )}
        </button>
      </div>
      <div className="flex flex-col gap-0 w-full sm:text-start items-start text-center">
        <h5 className="text-primary font-medium">
          {intl.formatMessage({
            id: "Akkauntingiz yo'q bo'lsa xoziroq yarating",
          })}
        </h5>
        <NextLink
          url={RegisterUrl}
          className="font-semibold text-main underline"
        >
          {intl.formatMessage({ id: "Ro'yxatdan o'ting" })}
        </NextLink>
      </div>
      <div className="flex flex-col items-start w-full gap-1">
        <h6 className="font-normal text-primary">
          {intl.formatMessage({ id: "Ro'yxatdan o'tgan foydalanuvchilar" })}
        </h6>
        <PersonImages
          type="small"
          images={images}
          length={4}
          counter={"+12 984"}
        />
      </div>
    </form>
  );
}
