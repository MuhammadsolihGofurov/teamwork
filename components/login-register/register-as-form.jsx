import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { NextLink } from "../Utils";
import { WithFacebook, WithGoogle } from "./details";
import { ButtonSpinner } from "../custom/loading";
import { LoginUrl } from "@/utils/router";
import { Breadcrumbs } from "../custom";
import { toast } from "react-toastify";
import { CUSTOMER, EXPERT, REGISTERASUSERTYPE } from "@/utils/data";
import { useDispatch } from "react-redux";
import { setProfilePercentage } from "@/redux/slice/user";

export default function RegisterAsForm() {
  const router = useRouter();
  const intl = useIntl();
  const [registerAs, setRegisterAs] = useState(0);
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfilePercentage(90));
  }, []);

  const registerUsersTypes = [
    {
      id: 1,
      icon: "/images/expert-img.png",
      title: intl.formatMessage({ id: "registerAsExpert" }),
      description: intl.formatMessage({ id: "registerAsExpertDescription" }),
      code: EXPERT,
    },
    {
      id: 2,
      icon: "/images/customer-img.png",
      title: intl.formatMessage({ id: "registerAsCustomer" }),
      description: intl.formatMessage({ id: "registerAsCustomerDescription" }),
      code: CUSTOMER,
    },
  ];

  //   20 - expert
  //   15 - ish beruvchi

  const handleChangeRoute = () => {
    try {
      setReqLoading(true);
      localStorage.setItem(REGISTERASUSERTYPE, registerAs);
      toast.success(intl.formatMessage({ id: "register-as-form-success" }));

      setTimeout(() => {
        router.push("/auth/register/info");
      }, 1000);

      setReqLoading(false);
    } catch (e) {
      toast.error(e?.message);
    } finally {
      setReqLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-9 w-full items-center lg:items-start text-start">
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
      <div className="grid sm:flex grid-cols-2 flex-row gap-4">
        {registerUsersTypes?.map((item, index) => {
          const isCurrect = registerAs == item?.code;
          return (
            <div
              key={item?.title + index}
              className={`w-auto sm:w-[250px] h-auto sm:h-[260px] transition-all duration-150 rounded-xl bg-white p-6 sm:p-7 flex flex-col items-start border-2 cursor-pointer ${
                isCurrect ? "border-main " : "border-transparent"
              }`}
              onClick={() => setRegisterAs(item?.code)}
            >
              <div
                className={`w-[72px] h-[72px] rounded-full border  border-opacity-10 flex items-center justify-center ${
                  isCurrect ? "bg-main border-transparent" : "bg-white border-primary"
                } transition-all duration-150`}
              >
                <img
                  src={item?.icon}
                  alt={item?.title}
                  title={item?.title}
                  loading="lazy"
                  role="img"
                />
              </div>
              <h2
                className={`pt-4 pb-2 ${
                  isCurrect ? "text-main" : "text-primary"
                } font-bold text-sm small:text-base transition-all duration-150`}
              >
                {item?.title}
              </h2>
              <p className="text-sm font-normal sm:block hidden">
                {item?.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-5 sm:gap-1 flex-col-reverse sm:flex-row sm:w-auto w-full">
        <div className="flex w-full gap-1 sm:gap-0 justify-center">
          <WithGoogle anyClass={"z-[2]"} />
          <WithFacebook anyClass={"sm:-ml-4 z-[1]"} />
        </div>
        <button
          type="submit"
          className={`py-4 font-semibold  bg-main min-w-[250px] rounded-full flex items-center justify-center text-center transition-opacity duration-300 ${
            registerAs == 0
              ? "bg-opacity-10 text-main cursor-not-allowed"
              : "text-white"
          }`}
          disabled={reqLoading}
          onClick={() => handleChangeRoute()}
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
        <NextLink url={LoginUrl} className="font-semibold text-main underline">
          {intl.formatMessage({ id: "Kirish" })}
        </NextLink>
      </div>
    </div>
  );
}
