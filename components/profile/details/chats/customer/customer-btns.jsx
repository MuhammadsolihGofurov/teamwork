import { Button } from "@/components/custom/button";
import { NextLink } from "@/components/Utils";
import { setAgreementStatus } from "@/redux/slice/stages";
import {
  MyOrderAgreementCreateUrl,
  MyOrderAgreementCreateUrlQuery,
  MyOrderAgreementEditUrl,
  MyOrderAgreementEditUrlQuery,
} from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function CustomerBtns({ stage, task_id, agreement, offer }) {
  const { can_create_agreement, can_edit_agreement } = useSelector(
    (state) => state.stages
  );
  const intl = useIntl();

  if (can_create_agreement) {
    return (
      <NextLink
        url={`${MyOrderAgreementCreateUrl}?task_id=${task_id}&offer_id=${offer?.id}&${MyOrderAgreementCreateUrlQuery}`}
      >
        <CurrentButton>
          {intl.formatMessage({ id: "Taklifni qabul qilish" })}
        </CurrentButton>
      </NextLink>
    );
  }

  if (can_edit_agreement) {
    return (
      <NextLink
        url={`${MyOrderAgreementEditUrl}?task_id=${task_id}&offer_id=${offer?.id}&${MyOrderAgreementEditUrlQuery}`}
      >
        <CurrentButton>
          {intl.formatMessage({ id: "Shartlarni o'zgartirish" })}
        </CurrentButton>
      </NextLink>
    );
  }

  return <div>CustomerBtns</div>;
}

export const CurrentButton = ({ children }) => {
  return (
    <button
      type="button"
      className="bg-main px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-white border border-main hover:border-main transition-colors duration-150 hover:text-main"
    >
      {children}
    </button>
  );
};
