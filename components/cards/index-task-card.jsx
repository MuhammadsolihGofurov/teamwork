import React from "react";
import { NextLink } from "../Utils";
import { useIntl } from "react-intl";
import { DislikeBtn, LikeBtn } from "./details";
import { formatDateForCard, thousandSeperate } from "@/utils/funcs";

export default function IndexTaskCard({ data }) {
  const intl = useIntl();
  const url = `tasks/${data?.id}`;

  return (
    <div
      className={`flex group overflow-hidden flex-col gap-3 py-4 px-5 rounded-lg border border-bg-3 bg-white transition-colors duration-200 hover:border-main`}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-3">
          {/* pin */}
          {data?.pinned_until ? (
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.625 4.5L12.4583 8.5L16.2917 10L17.7292 11.5L11.0208 18.5L9.58333 17L8.14583 13L4.3125 9"
                fill="#222222"
              />
              <path
                d="M8.625 4.5L12.4583 8.5L16.2917 10L17.7292 11.5L11.0208 18.5L9.58333 17L8.14583 13L4.3125 9M14.375 15L18.6875 19.5M9.10417 4L3.83333 9.5"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <></>
          )}
          {/* tezkor */}
          {data?.is_marked_as_immediate ? (
            <div className="flex items-center gap-2 bg-orange py-[6px] px-3 rounded-md text-sm text-white font-normal">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.66682 9.33341C3.97298 9.72513 3.41193 10.3151 3.0556 11.0278C2.69926 11.7405 2.56389 12.5433 2.66682 13.3334C3.45693 13.4364 4.25978 13.301 4.97244 12.9446C5.6851 12.5883 6.27511 12.0273 6.66682 11.3334M2.66683 8.66675C3.85556 8.80802 4.96219 9.3451 5.80867 10.1916C6.65514 11.038 7.19222 12.1447 7.3335 13.3334C7.92278 12.9937 8.41569 12.5093 8.76565 11.926C9.1156 11.3428 9.31105 10.6799 9.3335 10.0001C10.4529 9.60629 11.4304 8.88941 12.1424 7.94009C12.8544 6.99077 13.2689 5.85164 13.3335 4.66675C13.3335 4.13631 13.1228 3.62761 12.7477 3.25253C12.3726 2.87746 11.8639 2.66675 11.3335 2.66675C10.1486 2.73135 9.00948 3.14586 8.06016 3.85785C7.11083 4.56984 6.39395 5.54734 6.00016 6.66675C5.32034 6.6892 4.65747 6.88464 4.07421 7.2346C3.49094 7.58455 3.00656 8.07747 2.66683 8.66675ZM10.6668 6.00008C10.6668 6.36827 10.3684 6.66675 10.0002 6.66675C9.63197 6.66675 9.3335 6.36827 9.3335 6.00008C9.3335 5.63189 9.63197 5.33341 10.0002 5.33341C10.3684 5.33341 10.6668 5.63189 10.6668 6.00008Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {intl.formatMessage({ id: "Tezkor" })}
            </div>
          ) : (
            <></>
          )}
          <p className="font-medium text-sm text-date">
            {formatDateForCard(data?.created_at)}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <DislikeBtn />
          <LikeBtn />
        </div>
      </div>
      <NextLink url={url} className={`flex flex-col gap-3`}>
        <h2 className="text-lg sm:text-xl font-medium leading-6 sm:leading-7 w-full sm:w-11/12">
          <span className="group-hover:bg-selection transition-colors duration-200">
            {data?.title}
          </span>
        </h2>

        <div className="flex flex-wrap gap-3">
          <p className="text-primary font-medium text-[15px]">
            #{data?.speciality?.name}
          </p>
          {data?.speciality?.parent ? (
            <p className="text-primary font-medium text-[15px]">
              #{data?.speciality?.parent?.name}
            </p>
          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <div className="flex items-center gap-1 text-sm text-primary font-normal">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 14V12.6667C2 11.9594 2.28095 11.2811 2.78105 10.781C3.28115 10.281 3.95942 10 4.66667 10H7.33333C8.04058 10 8.71885 10.281 9.21895 10.781C9.71905 11.2811 10 11.9594 10 12.6667V14M10.6667 2.08667C11.2403 2.23354 11.7487 2.56714 12.1118 3.03488C12.4748 3.50262 12.6719 4.07789 12.6719 4.67C12.6719 5.26212 12.4748 5.83739 12.1118 6.30513C11.7487 6.77287 11.2403 7.10647 10.6667 7.25334M14 14V12.6667C13.9966 12.0781 13.7986 11.5072 13.4368 11.043C13.0751 10.5787 12.5699 10.2471 12 10.1M8.66667 4.66667C8.66667 6.13943 7.47276 7.33333 6 7.33333C4.52724 7.33333 3.33333 6.13943 3.33333 4.66667C3.33333 3.19391 4.52724 2 6 2C7.47276 2 8.66667 3.19391 8.66667 4.66667Z"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{data?.count_of_offer ?? 0}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-primary font-normal">
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
              <span>
                {data?.inability_to_dead_line
                  ? intl.formatMessage({ id: "Kelishilgan holda" })
                  : formatDateForCard(data?.dead_line)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-primary font-normal">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99982 10.0001L9.99982 6.00008M6.66648 6.33341C6.66648 6.51751 6.51725 6.66675 6.33315 6.66675C6.14906 6.66675 5.99982 6.51751 5.99982 6.33341C5.99982 6.14932 6.14906 6.00008 6.33315 6.00008C6.51725 6.00008 6.66648 6.14932 6.66648 6.33341ZM9.99982 9.66675C9.99982 9.85084 9.85058 10.0001 9.66648 10.0001C9.48239 10.0001 9.33315 9.85084 9.33315 9.66675C9.33315 9.48265 9.48239 9.33341 9.66648 9.33341C9.85058 9.33341 9.99982 9.48265 9.99982 9.66675ZM3.33315 4.80006C3.33315 4.41108 3.48768 4.03803 3.76273 3.76297C4.03778 3.48792 4.41083 3.3334 4.79982 3.3334H5.46649C5.85375 3.33318 6.22521 3.1798 6.49982 2.90673L6.96649 2.44006C7.10278 2.303 7.26483 2.19422 7.44331 2.12C7.62179 2.04578 7.81319 2.00757 8.00649 2.00757C8.19979 2.00757 8.39118 2.04578 8.56966 2.12C8.74814 2.19422 8.91019 2.303 9.04649 2.44006L9.51315 2.90673C9.78776 3.1798 10.1592 3.33318 10.5465 3.3334H11.2132C11.6021 3.3334 11.9752 3.48792 12.2502 3.76297C12.5253 4.03803 12.6798 4.41108 12.6798 4.80006V5.46673C12.68 5.854 12.8334 6.22546 13.1065 6.50006L13.5732 6.96673C13.7102 7.10303 13.819 7.26508 13.8932 7.44356C13.9674 7.62204 14.0056 7.81343 14.0056 8.00673C14.0056 8.20003 13.9674 8.39142 13.8932 8.5699C13.819 8.74838 13.7102 8.91043 13.5732 9.04673L13.1065 9.5134C12.8334 9.788 12.68 10.1595 12.6798 10.5467V11.2134C12.6798 11.6024 12.5253 11.9754 12.2502 12.2505C11.9752 12.5255 11.6021 12.6801 11.2132 12.6801H10.5465C10.1592 12.6803 9.78776 12.8337 9.51315 13.1067L9.04649 13.5734C8.91019 13.7105 8.74814 13.8192 8.56966 13.8935C8.39118 13.9677 8.19979 14.0059 8.00649 14.0059C7.81319 14.0059 7.62179 13.9677 7.44331 13.8935C7.26483 13.8192 7.10278 13.7105 6.96649 13.5734L6.49982 13.1067C6.22521 12.8337 5.85375 12.6803 5.46649 12.6801H4.79982C4.41083 12.6801 4.03778 12.5255 3.76273 12.2505C3.48768 11.9754 3.33315 11.6024 3.33315 11.2134V10.5467C3.33293 10.1595 3.17955 9.788 2.90649 9.5134L2.43982 9.04673C2.30275 8.91043 2.19398 8.74838 2.11976 8.5699C2.04553 8.39142 2.00732 8.20003 2.00732 8.00673C2.00732 7.81343 2.04553 7.62204 2.11976 7.44356C2.19398 7.26508 2.30275 7.10303 2.43982 6.96673L2.90649 6.50006C3.17955 6.22546 3.33293 5.854 3.33315 5.46673V4.80006Z"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>
                {data?.inability_to_price ? (
                  intl.formatMessage({ id: "Kelishilgan holda" })
                ) : (
                  <>
                    {thousandSeperate(data?.budget)}
                    <span>
                      {" " +
                        intl.formatMessage({
                          id: "so'm",
                        })}
                    </span>
                  </>
                )}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-primary font-normal">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99984 11.6667C10.9203 11.6667 11.6665 10.9206 11.6665 10.0001C11.6665 9.07961 10.9203 8.33341 9.99984 8.33341C9.07936 8.33341 8.33317 9.07961 8.33317 10.0001C8.33317 10.9206 9.07936 11.6667 9.99984 11.6667Z"
                stroke="#121212"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3332 10.0001C16.1107 13.8892 13.3332 15.8334 9.99984 15.8334C6.6665 15.8334 3.889 13.8892 1.6665 10.0001C3.889 6.11091 6.6665 4.16675 9.99984 4.16675C13.3332 4.16675 16.1107 6.11091 18.3332 10.0001Z"
                stroke="#121212"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>{data?.count_of_view}</span>
          </div>
        </div>
      </NextLink>
    </div>
  );
}
