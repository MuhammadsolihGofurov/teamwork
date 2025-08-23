import { Button } from "@/components/custom/button";
import { NextLink } from "@/components/Utils";
import {
  confirmPaymentByCustomer,
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
  const { can_create_agreement, can_edit_agreement, confirm_payment } =
    useSelector((state) => state.stages);
  const { user_info } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

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
            })
          );
        }}
      >
        {intl.formatMessage({ id: "To'lovni kafolatlash" })}
      </CurrentButton>
    );
  }

  return <div>CustomerBtns</div>;
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

