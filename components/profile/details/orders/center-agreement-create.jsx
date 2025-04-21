import React from "react";
import { ProfileRate } from "@/components/cards/details";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AgreementCreateForm } from "./details";

export default function CenterAgreementCreate({ type = "", data, method }) {
  const isMobile = useIsMobile();

  const owner = data?.owner?.expert;

  return (
    <div
      className={`${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col items-center bg-white sm:border border-bg-3 rounded-lg gap-5`}
    >
      <ProfileRate
        type={type}
        full_name={owner?.full_name}
        user_type={owner?.level_of_expert}
      />
      <AgreementCreateForm oldData={data?.task} method={method}/>
    </div>
  );
}
