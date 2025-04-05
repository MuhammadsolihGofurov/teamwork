import { formatDateForCard, thousandSeperate } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";
import { NextLink } from "../Utils";
import { MyOrdersViewIdUrl } from "@/utils/router";
import { MyOrderButtons } from "./details";
import { IN_PROGRESS, VERGE_OF_AGREEMENT } from "@/utils/data";

// === type ===
// published => offers, experts, stops, deletes knopkalari bilan
// on_process => experts, docs, chats knopkalari bilan
// on_agreement => docs
// un_published => edits, deletes, publish knopkalari bilan
// archive => knopkalarsiz

export default function MyOrderCard({ data, card_type = "archive" }) {
  const intl = useIntl();
  const url = `${MyOrdersViewIdUrl}?task_id=${data?.id}`;

  return (
    <div className="px-3 py-5 small:p-5 sm:p-8 rounded-lg bg-white border border-bg-3 flex flex-col gap-4">
      <div className="card_header flex items-start sm:items-center justify-between pb-1">
        <div className="flex items-center gap-x-6 gap-y-1 flex-wrap flex-1">
          <p className="text-xs xs:text-sm font-semibold text-primary">
            {formatDateForCard(data?.created_at)}
          </p>
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.6665 6.33366C6.03469 6.33366 6.33317 6.03518 6.33317 5.66699C6.33317 5.2988 6.03469 5.00033 5.6665 5.00033C5.29831 5.00033 4.99984 5.2988 4.99984 5.66699C4.99984 6.03518 5.29831 6.33366 5.6665 6.33366Z"
                stroke="#FF9533"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.6665 4.66699V7.23966C2.6665 7.59766 2.8085 7.94099 3.06184 8.19433L8.4725 13.605C8.59787 13.7304 8.7467 13.8298 8.9105 13.8977C9.0743 13.9655 9.24987 14.0005 9.42717 14.0005C9.60447 14.0005 9.78004 13.9655 9.94384 13.8977C10.1076 13.8298 10.2565 13.7304 10.3818 13.605L13.6045 10.3823C13.7299 10.257 13.8293 10.1081 13.8972 9.94433C13.9651 9.78053 14 9.60496 14 9.42766C14 9.25036 13.9651 9.07479 13.8972 8.91099C13.8293 8.74719 13.7299 8.59835 13.6045 8.47299L8.19317 3.06233C7.94013 2.80932 7.597 2.66713 7.23917 2.66699H4.6665C4.13607 2.66699 3.62736 2.87771 3.25229 3.25278C2.87722 3.62785 2.6665 4.13656 2.6665 4.66699Z"
                stroke="#FF9533"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-orange font-semibold text-xs xs:text-sm flex-1">
              {data?.inability_to_price ? (
                intl.formatMessage({ id: "Kelishilgan holda" })
              ) : (
                <>
                  {thousandSeperate(data?.budget)}{" "}
                  {intl.formatMessage({ id: "so'm" })}
                </>
              )}
            </span>
          </div>
        </div>
        <div className="flex items-end sm:items-center sm:flex-row flex-col gap-x-3 gap-y-1">
          <div className="flex items-center gap-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.6665 2V4.66667M5.33317 2V4.66667M2.6665 7.33333H13.3332M7.33317 10H7.99984V12M3.99984 3.33333H11.9998C12.7362 3.33333 13.3332 3.93029 13.3332 4.66667V12.6667C13.3332 13.403 12.7362 14 11.9998 14H3.99984C3.26346 14 2.6665 13.403 2.6665 12.6667V4.66667C2.6665 3.93029 3.26346 3.33333 3.99984 3.33333Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs xs:text-sm font-semibold text-primary flex-1">
              <span className="small:inline hidden">
                {intl.formatMessage({ id: "Muddati" })}:
              </span>
              {data?.inability_to_dead_line ? (
                intl.formatMessage({ id: "Kelishilgan holda" })
              ) : (
                <>{formatDateForCard(data?.dead_line)}</>
              )}
            </span>
          </div>
          {card_type === IN_PROGRESS ? (
            <div className="w-[30px] h-[30px] rounded-full bg-bg-2 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.7">
                  <path
                    d="M10 5.83333V10L12.5 12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                    stroke="#222222"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          ) : (
            <></>
          )}
          {card_type === VERGE_OF_AGREEMENT ? (
            <div className="w-[30px] h-[30px] rounded-full bg-main flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83366 10.0007L10.0003 14.1673L18.3337 5.83398M1.66699 10.0007L5.83366 14.1673M10.0003 10.0007L14.167 5.83398"
                  stroke="white"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <NextLink
        url={url}
        className="text-lg sm:text-xl font-medium leading-6 sm:leading-7 w-full sm:w-11/12 group"
      >
        <span className="bg-bg-2 group-hover:bg-main transition-colors duration-200 text-primary">
          {data?.title}
        </span>
      </NextLink>
      <div className="flex flex-row items-center gap-4">
        <p className="text-primary text-sm font-normal">№{data?.id}</p>
        <div className="flex items-center gap-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.99967 9.33301C8.73605 9.33301 9.33301 8.73605 9.33301 7.99967C9.33301 7.26329 8.73605 6.66634 7.99967 6.66634C7.26329 6.66634 6.66634 7.26329 6.66634 7.99967C6.66634 8.73605 7.26329 9.33301 7.99967 9.33301Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14.6663 7.99967C12.8883 11.111 10.6663 12.6663 7.99967 12.6663C5.33301 12.6663 3.11101 11.111 1.33301 7.99967C3.11101 4.88834 5.33301 3.33301 7.99967 3.33301C10.6663 3.33301 12.8883 4.88834 14.6663 7.99967Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-primary text-sm font-normal">
            {data?.count_of_view}
          </span>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:flex-col gap-4">
        <MyOrderButtons
          id={data?.id}
          count_of_candidate={data?.count_of_candidate}
          count_of_offer={data?.count_of_offer}
          card_type={card_type}
        />
        <div className="flex w-full items-center justify-start bg-bg-2 h-[2px]"></div>
      </div>
    </div>
  );
}
