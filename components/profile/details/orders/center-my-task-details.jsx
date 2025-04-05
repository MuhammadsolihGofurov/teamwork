import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { OrderDetailBox } from "./details";

export default function CenterMyTaskDetails({ data, isMobile }) {
  const intl = useIntl();
  const router = useRouter();

  // if(/)

  // by default router.asPath = "orders/views"
  return (
    <div
      className={`${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col items-center bg-white sm:border border-bg-3 rounded-lg sm:p-8`}
    >
      <OrderDetailBox data={data} />
    </div>
  );
}
