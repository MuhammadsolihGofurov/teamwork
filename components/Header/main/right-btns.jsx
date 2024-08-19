import { NextLink } from "@/components/Utils";
import { Socials } from "@/components/custom";
import { Button } from "@/components/custom/button";
import React from "react";
import { useIntl } from "react-intl";

export default function RightBtns() {
  const intl = useIntl();
  return (
    <div className="lg:flex hidden items-center gap-5">
      <NextLink url={"order"}>
        <Button state="tag">{intl.formatMessage({ id: "orderBtn" })}</Button>
      </NextLink>
      <div className="flex items-center gap-1">
        <NextLink
          url={"register"}
          className={`text-primary leading-5 font-normal opacity-70 hover:text-main`}
        >
          {intl.formatMessage({ id: "menuRegister" })}
        </NextLink>
        <span className={`text-primary leading-5 font-normal opacity-70`}>
          |
        </span>
        <NextLink
          url={"login"}
          className={`text-primary leading-5 font-normal opacity-70 hover:text-main`}
        >
          {intl.formatMessage({ id: "menuLogin" })}
        </NextLink>
      </div>
      <Socials />
    </div>
  );
}
