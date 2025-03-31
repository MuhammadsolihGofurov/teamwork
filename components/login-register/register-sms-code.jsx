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
  PRIVATEAUTHKEY,
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { SMSCode } from "./details";
import {
  ProfileUrl,
  RegisterAsDetailsUrl,
  RegisterAsInfoUrl,
} from "@/utils/router";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "@/redux/slice/user";

export default function RegisterSMSCode({ page }) {
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
    },
  });

  useEffect(() => {
    dispatch(setProfilePercentage(50));
  }, []);

  const submitFn = async (data) => {
    const { code } = data;
    try {
      setReqLoading(true);
      const auth_key = localStorage.getItem(REGISTERAUTHKEY);

      const payload = {
        code: data.code.join(""),
        auth_key,
      };

      const response = await axios.post(
        "/auth/confirm-registration-code",
        payload
      );

      // localstoragega kelgan malumotlarni saqlash kerak.
      localStorage.setItem(PRIVATEAUTHKEY, response?.data?.data?.auth_key);
      localStorage.setItem(REGISTERAUTHKEY, response?.data?.data?.auth_key);

      toast.success(
        intl.formatMessage({ id: "register-send-code-success-message" })
      );

      setTimeout(() => {
        // router.push(`/${ProfileUrl}`);
        if (localStorage.getItem(REGISTERASUSERTYPE == EXPERT)) {
          router.push(`/${RegisterAsDetailsUrl}`);
        } else {
          router.push(`/${ProfileUrl}`);
        }
      }, 500);
    } catch (e) {
      // console.error(e);
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
      className="flex flex-col gap-7 w-full items-center lg:items-start text-start"
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

      <div className="flex flex-col gap-5 items-start w-full">
        {/* <div className="col-span-1 sm:col-span-2">
          <File page={page} />
        </div> */}
        <SMSCode
          register={register}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
      </div>

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full pt-6 sm:pt-10">
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main w-full sm:min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
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
