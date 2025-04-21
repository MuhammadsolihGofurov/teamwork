import React, { useState } from "react";
import { NextLink, Rates } from "../Utils";
import Image from "next/image";
import { MyOrderButtons, ProfileRate } from "./details";
import { useIntl } from "react-intl";
import { formatDate, formatDateForCard, thousandSeperate } from "@/utils/funcs";
import {
  MyOrderAgreementEditUrl,
  MyOrderAgreementEditUrlQuery,
  MyOrderAgreementViewUrl,
  MyOrderAgreementViewUrlQuery,
  MyOrdersViewIdUrl,
} from "@/utils/router";
import { ORDER_DETAILS_EXPERTS } from "@/utils/data";

export default function MyOrderExperts({ data = {} }) {
  const expert = data?.expert;
  const intl = useIntl();
  const view_url = `${MyOrderAgreementViewUrl}?task_id=${data?.task_id}&offer_id=${data?.offer_id}&${MyOrderAgreementViewUrlQuery}`;

  return (
    <div className="p-4 sm:p-7 rounded-lg bg-white border border-bg-3 flex sm:flex-row gap-5">
      <div className="hidden sm:flex flex-col gap-1 items-center">
        <ProfileRate
          rate={data?.rate}
          full_name={data?.expert?.full_name}
          path={data?.expert?.photo?.path}
        />
      </div>
      <div className="flex flex-col items-start gap-4 sm:gap-3 w-full flex-1">
        <div className="flex flex-row gap-3">
          <div className="sm:hidden flex flex-col gap-1 items-center">
            <ProfileRate
              rate={data?.rate}
              full_name={data?.expert?.full_name}
              path={data?.expert?.photo?.path}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-y-1 justify-between">
            <h4 className="text-lg leading-5 sm:leading-6 sm:text-xl font-semibold text-primary w-full sm:w-5/6 order-1 sm:order-1">
              {expert?.full_name}
            </h4>
            <div className="flex flex-row gap-3 w-full sm:w-1/6 sm:justify-end order-3 sm:order-2">
              <p className="text-primary text-sm font-semibold text-opacity-60">
                {expert?.level_of_expert}
              </p>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-x-3 sm:gap-y-1 order-2 sm:order-3">
              {expert?.specialitySets?.map((item) => (
                <p className="text-primary font-medium text-[15px]">
                  {item?.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="text-primary text-lg font-medium">
          {data?.status?.label}
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 w-full">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-primary">
              {intl.formatMessage({ id: "Buyurtma raqami" })}:
            </p>
            <div className="p-3 rounded-lg bg-bg-2 flex items-center gap-1 cursor-default">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.3335 5.99935H12.6668M3.3335 9.99935H12.6668M7.3335 2.66602L4.66683 13.3327M11.3335 2.66602L8.66683 13.3327"
                  stroke="#121212"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-primary text-sm leading-4 font-medium flex-1">
                {data?.task_id}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-primary">
              {intl.formatMessage({ id: "Buyurtma qiymati" })}:
            </p>
            <div className="p-3 rounded-lg bg-bg-2 flex items-center gap-1 cursor-default">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.6665 6.33268C6.03469 6.33268 6.33317 6.03421 6.33317 5.66602C6.33317 5.29783 6.03469 4.99935 5.6665 4.99935C5.29831 4.99935 4.99984 5.29783 4.99984 5.66602C4.99984 6.03421 5.29831 6.33268 5.6665 6.33268Z"
                  stroke="#121212"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.6665 4.66602V7.23868C2.6665 7.59668 2.8085 7.94002 3.06184 8.19335L8.4725 13.604C8.59787 13.7294 8.7467 13.8289 8.9105 13.8967C9.0743 13.9646 9.24987 13.9995 9.42717 13.9995C9.60447 13.9995 9.78004 13.9646 9.94384 13.8967C10.1076 13.8289 10.2565 13.7294 10.3818 13.604L13.6045 10.3813C13.7299 10.256 13.8293 10.1072 13.8972 9.94335C13.9651 9.77955 14 9.60398 14 9.42668C14 9.24938 13.9651 9.07382 13.8972 8.91001C13.8293 8.74621 13.7299 8.59738 13.6045 8.47202L8.19317 3.06135C7.94013 2.80835 7.597 2.66615 7.23917 2.66602H4.6665C4.13607 2.66602 3.62736 2.87673 3.25229 3.2518C2.87722 3.62687 2.6665 4.13558 2.6665 4.66602Z"
                  stroke="#121212"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-primary text-sm leading-4 font-medium flex-1">
                {data?.agreement_price
                  ? thousandSeperate(data?.agreement_price)
                  : ""}{" "}
                {intl.formatMessage({ id: "so'm" })}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-sm text-primary">
              {intl.formatMessage({ id: "Yakunlash sanasi" })}:
            </p>
            <div className="p-3 rounded-lg bg-bg-2 flex items-center gap-1 cursor-default">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.6665 2V4.66667M5.33317 2V4.66667M2.6665 7.33333H13.3332M3.99984 3.33333H11.9998C12.7362 3.33333 13.3332 3.93029 13.3332 4.66667V12.6667C13.3332 13.403 12.7362 14 11.9998 14H3.99984C3.26346 14 2.6665 13.403 2.6665 12.6667V4.66667C2.6665 3.93029 3.26346 3.33333 3.99984 3.33333ZM5.33317 10H6.6665V11.3333H5.33317V10Z"
                  stroke="#121212"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="text-primary text-sm leading-4 font-medium flex-1">
                {data?.dead_line ? formatDateForCard(data?.dead_line) : ""}{" "}
              </span>
            </div>
          </div>
        </div>
        <NextLink
          url={view_url}
          className={`flex items-center gap-1 text-main text-sm font-medium py-4 group`}
        >
          <span>{intl.formatMessage({ id: "Kelishuv haqida batafsil" })}</span>
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4.5L10 8.5L6 12.5"
              stroke="#98BE00"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </NextLink>

        <MyOrderButtons
          card_type={ORDER_DETAILS_EXPERTS}
          chat_id={data?.chatId}
          id={data?.id}
          edit_url={`${MyOrderAgreementEditUrl}?task_id=${data?.task_id}&agreement_id=${data?.id}&offer_id=${data?.offer_id}&${MyOrderAgreementEditUrlQuery}`}
          edit_status={data?.canEdit}
        />
      </div>
    </div>
  );
}
