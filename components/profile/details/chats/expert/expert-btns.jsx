import { Button } from "@/components/custom/button";
import { NextLink } from "@/components/Utils";
import { useModal } from "@/context/modal-provider";
import { acceptAgreementByExpert, startJobByExpert } from "@/redux/slice/stages";
import {
  MyOrderAgreementCreateUrl,
  MyOrderAgreementCreateUrlQuery,
  MyOrderAgreementEditUrl,
  MyOrderAgreementEditUrlQuery,
} from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

export default function ExpertBtns({ stage, task_id, agreement, offer }) {
  const { confirm_agreement, start_job } = useSelector((state) => state.stages);

  const router = useRouter();
  const dispatch = useDispatch();
  const intl = useIntl();

  if (confirm_agreement) {
    return (
      <>
        <CurrentButton
          color="red"
          clickedFunction={() => {
            dispatch(
              acceptAgreementByExpert({
                locale: router.locale,
                id: agreement?.id,
                confirm: 0,
              })
            );
          }}
        >
          {intl.formatMessage({ id: "Shartlarni bekor qilish" })}
        </CurrentButton>
        <CurrentButton
          clickedFunction={() => {
            dispatch(
              acceptAgreementByExpert({
                locale: router.locale,
                id: agreement?.id,
                confirm: 1,
              })
            );
          }}
        >
          {intl.formatMessage({ id: "Shartlarni qabul qilish" })}
        </CurrentButton>
      </>
    );
  }

  if (start_job) {
    return (
      <>
        <CurrentButton
          clickedFunction={() => {
            dispatch(
              startJobByExpert({
                locale: router.locale,
                id: agreement?.id,
              })
            );
          }}
        >
          {intl.formatMessage({ id: "Ishni boshlash" })}
        </CurrentButton>
      </>
    );
  }

  return <div>Expert Btns</div>;
}

export const CurrentButton = ({
  color = "main",
  children,
  clickedFunction = () => {},
}) => {
  const coloredClass =
    color == "main"
      ? "bg-main border-main hover:border-main hover:text-main"
      : "bg-some_red border-some_red hover:border-some_red hover:text-some_red";

  return (
    <button
      type="button"
      onClick={() => clickedFunction()}
      className={`px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-white border  transition-colors duration-150 ${coloredClass}`}
    >
      {children}
    </button>
  );
};
