import React, { useState } from "react";
import { NextLink, Rates } from "../Utils";
import { useIntl } from "react-intl";
import { DislikeBtn, LikeBtn, ProfileRate } from "./details";
import { formatDateForCard, thousandSeperate } from "@/utils/funcs";
import Image from "next/image";

export default function IndexExpertCard({ data }) {
  const intl = useIntl();
  const url = `experts/${data?.user_id}`;

  return (
    <div
      className={`group overflow-hidden flex flex-col items-start gap-5 p-5 rounded-lg border border-bg-3 bg-white transition-colors duration-200 hover:border-main min-h-[185px] text-primary relative z-0 group`}
    >
      <div className="absolute sm:hidden flex top-3 right-3">
        <LikeBtn
          is_favorite={data?.is_favourite}
          id={data?.id}
          type="experts"
        />
      </div>
      <div className="flex flex-row items-start gap-3 small:gap-5 w-full">
        <NextLink
          url={url}
          className="flex flex-col items-center justify-center gap-1"
        >
          <ProfileRate
            path={data?.photo?.path}
            full_name={data?.full_name}
            rate={data?.rate}
          />
        </NextLink>
        <div className="flex flex-col justify-between gap-3 w-full flex-1">
          <div className="flex flex-wrap w-full items-start gap-y-2 sm:gap-y-3">
            <NextLink
              url={url}
              role="heading"
              className="w-full sm:w-2/4 text-lg sm:text-xl font-semibold sm:pr-0 pr-5 leading-5 sm:leading-6"
            >
              <span className="group-hover:bg-selection transition-colors duration-200">
                {data?.full_name}
              </span>
            </NextLink>
            <div className="hidden sm:flex flex-row justify-end gap-2 w-2/4 text-sm text-primary text-opacity-40 font-medium">
              <p>
                {data?.experience}{" "}
                {intl.formatMessage({
                  id:
                    data?.experience < 4
                      ? "Yillik tajriba 1-2-3"
                      : "Yillik tajriba",
                })}
              </p>
              <p>{data?.level_of_expert} </p>
              <LikeBtn
                is_favorite={data?.is_favourite}
                id={data?.id}
                type="experts"
              />
            </div>

            {data?.specialitySets?.length > 0 ? (
              <div className="flex flex-wrap items-center sm:gap-y-1 gap-x-3 sm:gap-3 w-full text-[15px] font-medium">
                {data?.specialitySets?.map((item) => {
                  return <p key={item?.name}>{item?.name}</p>;
                })}
              </div>
            ) : (
              <></>
            )}

            <div className="sm:hidden flex flex-row gap-2 w-full text-sm text-primary text-opacity-40 font-medium">
              <p>
                {data?.experience}{" "}
                {intl.formatMessage({
                  id:
                    data?.experience < 4
                      ? "Yillik tajriba 1-2-3"
                      : "Yillik tajriba",
                })}
              </p>
              <p>{data?.level_of_expert}</p>
            </div>
          </div>

          {/* portfolio */}
          {data?.portfolio ? (
            <div className="sm:flex hidden flex-col gap-2 w-full">
              <p className="text-sm font-normal">
                {intl.formatMessage({ id: "So'ngi bajarilgan ishlar" })}
              </p>
              <div className="flex w-full gap-2">
                <div className="w-[90px] h-[60px] rounded-md overflow-hidden">
                  <img
                    src="/images/left-banner.png"
                    alt="Teamwork platform banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[90px] h-[60px] rounded-md overflow-hidden">
                  <img
                    src="/images/left-banner.png"
                    alt="Teamwork platform banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[90px] h-[60px] rounded-md overflow-hidden">
                  <img
                    src="/images/left-banner.png"
                    alt="Teamwork platform banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-[90px] h-[60px] rounded-md overflow-hidden">
                  <img
                    src="/images/left-banner.png"
                    alt="Teamwork platform banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* hourly salary */}
          <div className="sm:flex hidden items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.33325 2.5V5.16667C9.33325 5.34348 9.40349 5.51305 9.52851 5.63807C9.65354 5.7631 9.82311 5.83333 9.99992 5.83333H12.6666M9.33325 2.5H4.66659C4.31296 2.5 3.97382 2.64048 3.72378 2.89052C3.47373 3.14057 3.33325 3.47971 3.33325 3.83333V13.1667C3.33325 13.5203 3.47373 13.8594 3.72378 14.1095C3.97382 14.3595 4.31296 14.5 4.66659 14.5H11.3333C11.6869 14.5 12.026 14.3595 12.2761 14.1095C12.5261 13.8594 12.6666 13.5203 12.6666 13.1667V5.83333M9.33325 2.5L12.6666 5.83333"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {intl.formatMessage({ id: "Loyhalar" })}{" "}
                {data?.taskSummary?.success_count}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00006 10.5001L10.0001 6.50008M6.66673 6.83341C6.66673 7.01751 6.51749 7.16675 6.33339 7.16675C6.1493 7.16675 6.00006 7.01751 6.00006 6.83341C6.00006 6.64932 6.1493 6.50008 6.33339 6.50008C6.51749 6.50008 6.66673 6.64932 6.66673 6.83341ZM10.0001 10.1667C10.0001 10.3508 9.85082 10.5001 9.66673 10.5001C9.48263 10.5001 9.33339 10.3508 9.33339 10.1667C9.33339 9.98265 9.48263 9.83341 9.66673 9.83341C9.85082 9.83341 10.0001 9.98265 10.0001 10.1667ZM3.3334 5.30006C3.3334 4.91108 3.48792 4.53803 3.76297 4.26297C4.03803 3.98792 4.41108 3.8334 4.80006 3.8334H5.46673C5.854 3.83318 6.22546 3.6798 6.50006 3.40673L6.96673 2.94006C7.10303 2.803 7.26508 2.69422 7.44356 2.62C7.62204 2.54578 7.81343 2.50757 8.00673 2.50757C8.20003 2.50757 8.39142 2.54578 8.5699 2.62C8.74838 2.69422 8.91043 2.803 9.04673 2.94006L9.5134 3.40673C9.788 3.6798 10.1595 3.83318 10.5467 3.8334H11.2134C11.6024 3.8334 11.9754 3.98792 12.2505 4.26297C12.5255 4.53803 12.6801 4.91108 12.6801 5.30006V5.96673C12.6803 6.354 12.8337 6.72546 13.1067 7.00006L13.5734 7.46673C13.7105 7.60303 13.8192 7.76508 13.8935 7.94356C13.9677 8.12204 14.0059 8.31343 14.0059 8.50673C14.0059 8.70003 13.9677 8.89142 13.8935 9.0699C13.8192 9.24838 13.7105 9.41043 13.5734 9.54673L13.1067 10.0134C12.8337 10.288 12.6803 10.6595 12.6801 11.0467V11.7134C12.6801 12.1024 12.5255 12.4754 12.2505 12.7505C11.9754 13.0255 11.6024 13.1801 11.2134 13.1801H10.5467C10.1595 13.1803 9.788 13.3337 9.5134 13.6067L9.04673 14.0734C8.91043 14.2105 8.74838 14.3192 8.5699 14.3935C8.39142 14.4677 8.20003 14.5059 8.00673 14.5059C7.81343 14.5059 7.62204 14.4677 7.44356 14.3935C7.26508 14.3192 7.10303 14.2105 6.96673 14.0734L6.50006 13.6067C6.22546 13.3337 5.854 13.1803 5.46673 13.1801H4.80006C4.41108 13.1801 4.03803 13.0255 3.76297 12.7505C3.48792 12.4754 3.3334 12.1024 3.3334 11.7134V11.0467C3.33318 10.6595 3.1798 10.288 2.90673 10.0134L2.44006 9.54673C2.303 9.41043 2.19422 9.24838 2.12 9.0699C2.04578 8.89142 2.00757 8.70003 2.00757 8.50673C2.00757 8.31343 2.04578 8.12204 2.12 7.94356C2.19422 7.76508 2.303 7.60303 2.44006 7.46673L2.90673 7.00006C3.1798 6.72546 3.33318 6.354 3.3334 5.96673V5.30006Z"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                {intl.formatMessage({ id: "O’rtacha ish narxi" })}
                {": "}
                {data?.hourly_salary > 0
                  ? thousandSeperate(data?.hourly_salary)
                  : 0}{" "}
                {intl.formatMessage({ id: "sum/soat" })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* portfolio mobile */}
      {data?.portfolio ? (
        <NextLink url={url} className="sm:hidden flex flex-col gap-2 w-full">
          <p className="text-sm font-normal">
            {intl.formatMessage({ id: "So'ngi bajarilgan ishlar" })}
          </p>
          <div className="grid grid-cols-3 w-full gap-1">
            <div className="w-full h-[60px] rounded-md overflow-hidden">
              <img
                src="/images/left-banner.png"
                alt="Teamwork platform banner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[60px] rounded-md overflow-hidden">
              <img
                src="/images/left-banner.png"
                alt="Teamwork platform banner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[60px] rounded-md overflow-hidden">
              <img
                src="/images/left-banner.png"
                alt="Teamwork platform banner"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full h-[60px] rounded-md overflow-hidden">
              <img
                src="/images/left-banner.png"
                alt="Teamwork platform banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </NextLink>
      ) : (
        <></>
      )}

      {/* hourly salary mobile */}
      <NextLink
        url={url}
        className="sm:hidden flex flex-wrap items-center gap-x-4 gap-y-2 w-full text-sm"
      >
        <div className="flex items-center gap-1">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.33325 2.5V5.16667C9.33325 5.34348 9.40349 5.51305 9.52851 5.63807C9.65354 5.7631 9.82311 5.83333 9.99992 5.83333H12.6666M9.33325 2.5H4.66659C4.31296 2.5 3.97382 2.64048 3.72378 2.89052C3.47373 3.14057 3.33325 3.47971 3.33325 3.83333V13.1667C3.33325 13.5203 3.47373 13.8594 3.72378 14.1095C3.97382 14.3595 4.31296 14.5 4.66659 14.5H11.3333C11.6869 14.5 12.026 14.3595 12.2761 14.1095C12.5261 13.8594 12.6666 13.5203 12.6666 13.1667V5.83333M9.33325 2.5L12.6666 5.83333"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex-1 leading-4">
            {intl.formatMessage({ id: "Loyhalar" })}{" "}
            {data?.taskSummary?.success_count}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.00006 10.5001L10.0001 6.50008M6.66673 6.83341C6.66673 7.01751 6.51749 7.16675 6.33339 7.16675C6.1493 7.16675 6.00006 7.01751 6.00006 6.83341C6.00006 6.64932 6.1493 6.50008 6.33339 6.50008C6.51749 6.50008 6.66673 6.64932 6.66673 6.83341ZM10.0001 10.1667C10.0001 10.3508 9.85082 10.5001 9.66673 10.5001C9.48263 10.5001 9.33339 10.3508 9.33339 10.1667C9.33339 9.98265 9.48263 9.83341 9.66673 9.83341C9.85082 9.83341 10.0001 9.98265 10.0001 10.1667ZM3.3334 5.30006C3.3334 4.91108 3.48792 4.53803 3.76297 4.26297C4.03803 3.98792 4.41108 3.8334 4.80006 3.8334H5.46673C5.854 3.83318 6.22546 3.6798 6.50006 3.40673L6.96673 2.94006C7.10303 2.803 7.26508 2.69422 7.44356 2.62C7.62204 2.54578 7.81343 2.50757 8.00673 2.50757C8.20003 2.50757 8.39142 2.54578 8.5699 2.62C8.74838 2.69422 8.91043 2.803 9.04673 2.94006L9.5134 3.40673C9.788 3.6798 10.1595 3.83318 10.5467 3.8334H11.2134C11.6024 3.8334 11.9754 3.98792 12.2505 4.26297C12.5255 4.53803 12.6801 4.91108 12.6801 5.30006V5.96673C12.6803 6.354 12.8337 6.72546 13.1067 7.00006L13.5734 7.46673C13.7105 7.60303 13.8192 7.76508 13.8935 7.94356C13.9677 8.12204 14.0059 8.31343 14.0059 8.50673C14.0059 8.70003 13.9677 8.89142 13.8935 9.0699C13.8192 9.24838 13.7105 9.41043 13.5734 9.54673L13.1067 10.0134C12.8337 10.288 12.6803 10.6595 12.6801 11.0467V11.7134C12.6801 12.1024 12.5255 12.4754 12.2505 12.7505C11.9754 13.0255 11.6024 13.1801 11.2134 13.1801H10.5467C10.1595 13.1803 9.788 13.3337 9.5134 13.6067L9.04673 14.0734C8.91043 14.2105 8.74838 14.3192 8.5699 14.3935C8.39142 14.4677 8.20003 14.5059 8.00673 14.5059C7.81343 14.5059 7.62204 14.4677 7.44356 14.3935C7.26508 14.3192 7.10303 14.2105 6.96673 14.0734L6.50006 13.6067C6.22546 13.3337 5.854 13.1803 5.46673 13.1801H4.80006C4.41108 13.1801 4.03803 13.0255 3.76297 12.7505C3.48792 12.4754 3.3334 12.1024 3.3334 11.7134V11.0467C3.33318 10.6595 3.1798 10.288 2.90673 10.0134L2.44006 9.54673C2.303 9.41043 2.19422 9.24838 2.12 9.0699C2.04578 8.89142 2.00757 8.70003 2.00757 8.50673C2.00757 8.31343 2.04578 8.12204 2.12 7.94356C2.19422 7.76508 2.303 7.60303 2.44006 7.46673L2.90673 7.00006C3.1798 6.72546 3.33318 6.354 3.3334 5.96673V5.30006Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex-1 leading-4">
            {intl.formatMessage({ id: "O’rtacha ish narxi" })}
            {": "}
            {data?.hourly_salary > 0
              ? thousandSeperate(data?.hourly_salary)
              : 0}{" "}
            {intl.formatMessage({ id: "sum/soat" })}
          </span>
        </div>
      </NextLink>
    </div>
  );
}
