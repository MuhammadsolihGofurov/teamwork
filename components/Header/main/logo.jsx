import { NextLink } from "@/components/Utils";
import React from "react";
import { useIntl } from "react-intl";

export default function LogoMain() {
  const intl = useIntl();

  return (
    <div className="flex items-center gap-10">
      <NextLink
        url=""
        title="Teamwork"
        className="block w-[125px] sm:w-[150px]"
      >
        <img
          src="/images/logo-old.svg"
          alt="logo"
          title="logo"
          loading="lazy"
        />
      </NextLink>
    </div>
  );
}
