import { NextLink } from "@/components/Utils";
import { Button } from "@/components/custom/button";
import { LoginUrl, RegisterUrl } from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";

export default function RightBtns() {
  const intl = useIntl();

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
