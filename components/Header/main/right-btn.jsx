import { NextLink } from "@/components/Utils";
import { Button } from "@/components/custom/button";
import { LoginUrl, RegisterUrl } from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function RightBtns() {
  const intl = useIntl();
  const { is_auth } = useSelector((state) => state.user);

  if (is_auth) {
    return null;
  }

  return (
    <div className="hidden sm:flex items-center gap-6">
      <NextLink
        url={RegisterUrl}
        title={intl.formatMessage({ id: "register" })}
        className={
          "text-primary font-normal text-base hover:text-main transition-colors duration-200"
        }
      >
        {intl.formatMessage({ id: "register" })}
      </NextLink>
      <NextLink url={LoginUrl}>
        <Button state="greenBtnHome">
          {intl.formatMessage({ id: "login" })}
        </Button>
      </NextLink>
    </div>
  );
}
