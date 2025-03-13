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

export default function RegisterAsForm() {
  const router = useRouter();
  const intl = useIntl();
  const [registerAs, setRegisterAs] = useState(0);
  const [reqLoading, setReqLoading] = useState(false);

//   20 - expert
//   15 - employer


  const handleClick = () => {

  }

  return (
    <div
      className="flex flex-col gap-9 w-full items-center lg:items-start text-start"
    >
      <Breadcrumbs
        data={[
          {
            id: 1,
            name: intl.formatMessage({ id: "register-as-bread" }),
            url: "",
          },
        ]}
        isReturn
      />

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full">
        <div className="flex w-full gap-1 sm:gap-0 justify-center">
          <WithGoogle anyClass={"z-[2]"} />
          <WithFacebook anyClass={"sm:-ml-4 z-[1]"} />
        </div>
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
            registerAs
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading}
          onClick={() => handleClick()}
        >
          {reqLoading ? (
            <ButtonSpinner />
          ) : (
            intl.formatMessage({ id: "Ro'yhatdan o'tish" })
          )}
        </button>
      </div>
      <div className="flex flex-col gap-0 w-full sm:text-start text-center">
        <h5 className="text-primary font-medium">
          {intl.formatMessage({
            id: "Akkauntingiz mavjudmi?",
          })}
        </h5>
        <NextLink
          url={LoginUrl}
          className="font-semibold text-main underline"
        >
          {intl.formatMessage({ id: "Kirish" })}
        </NextLink>
      </div>
    </div>
  );
}
