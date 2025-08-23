import { Button } from "@/components/custom/button";
import { NextLink } from "@/components/Utils";
import { useModal } from "@/context/modal-provider";
import {
  acceptJobByCustomer,
  confirmPaymentByCustomer,
  reviewJobByCustomer,
} from "@/redux/slice/stages";
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
import { toast } from "react-toastify";

export default function CustomerBtns({ stage, task_id, agreement, offer }) {
  const {
    can_create_agreement,
    can_edit_agreement,
    confirm_payment,
    accept_job,
    can_evaluate_expert,
  } = useSelector((state) => state.stages);
  const { user_info } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const { showModal } = useModal();

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

  if (confirm_payment) {
    return (
      <CurrentButton
        clickedFunction={() => {
          if (user_info?.balance < agreement?.agreement_price) {
            toast.error(
              intl.formatMessage({
                id: "Balansda yetarli mablag' mavjud emas",
              })
            );

            return;
          }
          dispatch(
            confirmPaymentByCustomer({
              locale: router.locale,
              id: agreement?.id,
              intl,
            })
          );
        }}
      >
        {intl.formatMessage({ id: "To'lovni kafolatlash" })}
      </CurrentButton>
    );
  }

  if (accept_job) {
    return (
      <>
        <CurrentButton
          clickedFunction={() => {
            dispatch(
              acceptJobByCustomer({
                locale: router.locale,
                id: agreement?.id,
                intl,
              })
            );
          }}
        >
          {intl.formatMessage({ id: "Qabul qilish" })}
        </CurrentButton>
        <CurrentButton
          color="info"
          clickedFunction={() => {
            dispatch(
              reviewJobByCustomer({
                locale: router.locale,
                id: agreement?.id,
                intl,
              })
            );
          }}
        >
          {intl.formatMessage({ id: "Qayta ishlash" })}
        </CurrentButton>
        <CurrentButton
          color="red"
          clickedFunction={() => {
            showModal("complaint", { agreement, offer });
          }}
        >
          {intl.formatMessage({ id: "Shikoyat yo'llash" })}
        </CurrentButton>
      </>
    );
  }

  if (can_evaluate_expert) {
    return (
      <CurrentButton
        color="info"
        clickedFunction={() => {
          showModal("comment", { agreement, offer, forWho: "expert" });
        }}
      >
        {intl.formatMessage({ id: "Sharh qoldirish" })}
      </CurrentButton>
    );
  }

  return null;
}

export const CurrentButton = ({
  color = "main",
  children,
  clickedFunction = () => {},
}) => {
  let coloredClass = "";

  switch (color) {
    case "main":
      coloredClass = "bg-main border-main hover:border-main hover:text-main";
      break;
    case "red":
      coloredClass =
        "bg-some_red border-some_red hover:border-some_red hover:text-some_red";
      break;
    case "info":
      coloredClass = "bg-blue border-blue hover:border-blue hover:text-blue";
      break;
  }

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
