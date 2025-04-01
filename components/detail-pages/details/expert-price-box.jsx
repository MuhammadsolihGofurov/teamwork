import { thousandSeperate } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";
import GetWorkBtn from "./get-work-btn";

export default function ExpertPriceBox({
  hourly_salary,
  total_count,
  id,
  full_name,
  user_id,
}) {
  const intl = useIntl();

  return (
    <div className="bg-main bg-opacity-5 rounded-lg px-4 py-8 sm:p-8 flex items-start justify-between gap-3">
      <div className="flex flex-row gap-2 sm:w-auto w-full">
        <div className="sm:block hidden">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.6667 12.6668C19.9303 12.6668 19.3334 12.0699 19.3334 11.3335C19.3334 10.5971 19.9303 10.0002 20.6667 10.0002C21.4031 10.0002 22 10.5971 22 11.3335C22 12.0699 21.4031 12.6668 20.6667 12.6668Z"
              stroke="#FF7A00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M26.6667 9.3335V14.4788C26.6667 15.1948 26.3827 15.8815 25.876 16.3882L15.0547 27.2095C14.804 27.4603 14.5063 27.6592 14.1787 27.7949C13.8511 27.9306 13.5 28.0005 13.1454 28.0005C12.7908 28.0005 12.4396 27.9306 12.112 27.7949C11.7844 27.6592 11.4867 27.4603 11.236 27.2095L4.79069 20.7642C4.53993 20.5134 4.34101 20.2158 4.2053 19.8882C4.06958 19.5606 3.99973 19.2094 3.99973 18.8548C3.99973 18.5002 4.06958 18.1491 4.2053 17.8215C4.34101 17.4939 4.53993 17.1962 4.79069 16.9455L15.6134 6.12416C16.1194 5.61816 16.8057 5.33377 17.5214 5.3335H22.6667C23.7276 5.3335 24.745 5.75492 25.4951 6.50507C26.2453 7.25521 26.6667 8.27263 26.6667 9.3335Z"
              stroke="#FF7A00"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-1 sm:gap-0 text-primary">
          <div className="flex items-center gap-1">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="sm:hidden inline"
            >
              <path
                d="M20.666 12.6663C19.9296 12.6663 19.3327 12.0694 19.3327 11.333C19.3327 10.5966 19.9296 9.99967 20.666 9.99967C21.4024 9.99967 21.9993 10.5966 21.9993 11.333C21.9993 12.0694 21.4024 12.6663 20.666 12.6663Z"
                stroke="#FF7A00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.666 9.33301V14.4783C26.666 15.1943 26.382 15.881 25.8753 16.3877L15.054 27.209C14.8033 27.4598 14.5056 27.6587 14.178 27.7944C13.8504 27.9301 13.4993 28 13.1447 28C12.7901 28 12.4389 27.9301 12.1113 27.7944C11.7837 27.6587 11.4861 27.4598 11.2353 27.209L4.79002 20.7637C4.53926 20.5129 4.34034 20.2153 4.20462 19.8877C4.06891 19.5601 3.99906 19.2089 3.99906 18.8543C3.99906 18.4997 4.06891 18.1486 4.20462 17.821C4.34034 17.4934 4.53926 17.1957 4.79002 16.945L15.6127 6.12367C16.1188 5.61767 16.805 5.33328 17.5207 5.33301H22.666C23.7269 5.33301 24.7443 5.75444 25.4944 6.50458C26.2446 7.25473 26.666 8.27214 26.666 9.33301Z"
                stroke="#FF7A00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-normal">
              {hourly_salary ? thousandSeperate(hourly_salary) : 0}{" "}
              {intl.formatMessage({ id: "so'm" })}
            </h2>
          </div>
          <p className="text-sm font-normal">
            {intl.formatMessage({ id: "1 soatlik ish haqi (tahminiy)" })}
          </p>
          <p className="pt-2 pb-3 text-sm text-main font-medium">
            {intl.formatMessage({
              id: "To’lov platforma orqali kafolatga olingan.",
            })}
          </p>
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0027 0L1.65625 2.51968V8.81888C1.65625 12.9134 5.04022 17.3647 10.0027 20C14.9652 17.3647 18.3491 12.9134 18.3491 8.81888V2.51968L10.0027 0ZM10.0027 18.56C5.73873 16.0973 2.91609 12.2466 2.91609 8.81888V3.45543L10.0027 1.31621V18.56Z"
                  fill="#00B952"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0027 0L1.65625 2.51968V8.81888C1.65625 12.9134 5.04022 17.3647 10.0027 20C14.9652 17.3647 18.3491 12.9134 18.3491 8.81888V2.51968L10.0027 0ZM10.0027 18.56C5.73873 16.0973 2.91609 12.2466 2.91609 8.81888V3.45543L10.0027 1.31621V18.56Z"
                  fill="#00B952"
                />
              </svg>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0027 0L1.65625 2.51968V8.81888C1.65625 12.9134 5.04022 17.3647 10.0027 20C14.9652 17.3647 18.3491 12.9134 18.3491 8.81888V2.51968L10.0027 0ZM10.0027 18.56C5.73873 16.0973 2.91609 12.2466 2.91609 8.81888V3.45543L10.0027 1.31621V18.56Z"
                  fill="#00B952"
                />
              </svg>
            </div>
            <p className="text-[15px]">
              {intl.formatMessage({ id: "Ishtirok etilgan buyurtmalar" })}:{" "}
              {total_count}
            </p>
          </div>
        </div>
      </div>
      <div className="sm:flex hidden">
        <GetWorkBtn id={id} full_name={full_name} user_id={user_id} />
      </div>
    </div>
  );
}
