import React from "react";
import { ProfileRate } from "@/components/cards/details";
import { useIsMobile } from "@/hooks/useIsMobile";
import { OrderDetailBox } from "./details";

export default function CenterAgreementView({ type = "", data, method }) {
  const isMobile = useIsMobile();

  const owner = data?.owner?.expert;

  return (
    <div
      className={`${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col items-center bg-white sm:border border-bg-3 rounded-lg gap-5 sm:p-8`}
    >
      <ProfileRate
        type={type}
        full_name={owner?.full_name}
        user_type={owner?.level_of_expert}
        chat_id={data?.chatId}
      />
      <OrderDetailBox data={data?.task} method={method} />
    </div>
  );
}
