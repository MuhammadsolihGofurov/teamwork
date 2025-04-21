import { MyOrdersViewIdUrl } from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";
import { MyOrderButtons, ProfileRate } from "./details";
import { thousandSeperate } from "@/utils/funcs";
import { ORDER_DETAILS_OFFERS } from "@/utils/data";
import { useRouter } from "next/router";

export default function MyOrderOffersCard({ data }) {
  const expert = data?.owner?.expert;
  const intl = useIntl();
  const view_url = `${MyOrdersViewIdUrl}?task_id=${data?.task_id}`;
  const task_summary = expert?.taskSummary;
  const router = useRouter();

  return (
    <div className="p-7 rounded-lg bg-white border border-bg-3 flex flex-row gap-5">
      <div className="sm:flex hidden flex-col gap-1 items-center">
        <ProfileRate
          rate={expert?.rate}
          full_name={expert?.full_name}
          path={expert?.photo?.path}
        />
      </div>
      <div className="flex flex-col items-start gap-3 w-full flex-1">
        <div className="flex flex-row w-full gap-3">
          <div className="flex sm:hidden flex-col gap-1 items-center">
            <ProfileRate
              rate={expert?.rate}
              full_name={expert?.full_name}
              path={expert?.photo?.path}
            />
          </div>
          <div className="flex flex-row flex-wrap gap-y-1 justify-between">
            <h4 className="text-lg sm:text-xl font-semibold text-primary w-full lg:w-5/6">
              {expert?.full_name}
            </h4>
            <div className="sm:flex hidden flex-row gap-3 w-1/6 justify-end">
              <p className="text-primary text-sm font-semibold text-opacity-60">
                {expert?.level_of_expert}
              </p>
            </div>
            <div className="flex flex-row flex-wrap w-full gap-x-3 sm:gap-y-1">
              {expert?.specialitySets?.map((item) => (
                <p className="text-primary font-medium text-sm sm:text-[15px]" key={item?.name}>
                  {item?.name}
                </p>
              ))}
            </div>
            <div className="flex sm:hidden flex-row gap-3 w-full">
              <p className="text-primary text-sm font-semibold text-opacity-60">
                {expert?.level_of_expert}
              </p>
            </div>
          </div>
        </div>
        {/* <p className="text-primary text-lg font-medium">
          {data?.status?.label}
        </p> */}
        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap">
          <div className="flex items-center gap-1 ">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33301 2.5V5.16667C9.33301 5.34348 9.40325 5.51305 9.52827 5.63807C9.65329 5.7631 9.82286 5.83333 9.99967 5.83333H12.6663M9.33301 2.5H4.66634C4.31272 2.5 3.97358 2.64048 3.72353 2.89052C3.47348 3.14057 3.33301 3.47971 3.33301 3.83333V13.1667C3.33301 13.5203 3.47348 13.8594 3.72353 14.1095C3.97358 14.3595 4.31272 14.5 4.66634 14.5H11.333C11.6866 14.5 12.0258 14.3595 12.2758 14.1095C12.5259 13.8594 12.6663 13.5203 12.6663 13.1667V5.83333M9.33301 2.5L12.6663 5.83333"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-primary text-sm">
              {intl.formatMessage({ id: "Bajargan loyihalari" })}:{" "}
              {task_summary?.success_count}
            </span>
          </div>
          {expert?.hourly_salary ? (
            <div className="flex items-center gap-1 ">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00031 10.5003L10.0003 6.50033M6.66697 6.83366C6.66697 7.01775 6.51773 7.16699 6.33364 7.16699C6.14954 7.16699 6.00031 7.01775 6.00031 6.83366C6.00031 6.64956 6.14954 6.50033 6.33364 6.50033C6.51773 6.50033 6.66697 6.64956 6.66697 6.83366ZM10.0003 10.167C10.0003 10.3511 9.85107 10.5003 9.66697 10.5003C9.48288 10.5003 9.33364 10.3511 9.33364 10.167C9.33364 9.9829 9.48288 9.83366 9.66697 9.83366C9.85107 9.83366 10.0003 9.9829 10.0003 10.167ZM3.33364 5.30031C3.33364 4.91132 3.48816 4.53827 3.76322 4.26322C4.03827 3.98816 4.41132 3.83364 4.80031 3.83364H5.46697C5.85424 3.83342 6.2257 3.68004 6.50031 3.40697L6.96697 2.94031C7.10327 2.80324 7.26532 2.69447 7.4438 2.62025C7.62228 2.54602 7.81368 2.50781 8.00697 2.50781C8.20027 2.50781 8.39167 2.54602 8.57015 2.62025C8.74863 2.69447 8.91068 2.80324 9.04697 2.94031L9.51364 3.40697C9.78825 3.68004 10.1597 3.83342 10.547 3.83364H11.2136C11.6026 3.83364 11.9757 3.98816 12.2507 4.26322C12.5258 4.53827 12.6803 4.91132 12.6803 5.30031V5.96697C12.6805 6.35424 12.8339 6.7257 13.107 7.00031L13.5736 7.46697C13.7107 7.60327 13.8195 7.76532 13.8937 7.9438C13.9679 8.12228 14.0061 8.31368 14.0061 8.50697C14.0061 8.70027 13.9679 8.89166 13.8937 9.07015C13.8195 9.24863 13.7107 9.41068 13.5736 9.54697L13.107 10.0136C12.8339 10.2882 12.6805 10.6597 12.6803 11.047V11.7136C12.6803 12.1026 12.5258 12.4757 12.2507 12.7507C11.9757 13.0258 11.6026 13.1803 11.2136 13.1803H10.547C10.1597 13.1805 9.78825 13.3339 9.51364 13.607L9.04697 14.0736C8.91068 14.2107 8.74863 14.3195 8.57015 14.3937C8.39167 14.4679 8.20027 14.5061 8.00697 14.5061C7.81368 14.5061 7.62228 14.4679 7.4438 14.3937C7.26532 14.3195 7.10327 14.2107 6.96697 14.0736L6.50031 13.607C6.2257 13.3339 5.85424 13.1805 5.46697 13.1803H4.80031C4.41132 13.1803 4.03827 13.0258 3.76322 12.7507C3.48816 12.4757 3.33364 12.1026 3.33364 11.7136V11.047C3.33342 10.6597 3.18004 10.2882 2.90697 10.0136L2.44031 9.54697C2.30324 9.41068 2.19447 9.24863 2.12025 9.07015C2.04602 8.89166 2.00781 8.70027 2.00781 8.50697C2.00781 8.31368 2.04602 8.12228 2.12025 7.9438C2.19447 7.76532 2.30324 7.60327 2.44031 7.46697L2.90697 7.00031C3.18004 6.7257 3.33342 6.35424 3.33364 5.96697V5.30031Z"
                  stroke="#222222"
                  strokewidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-primary text-sm">
                {intl.formatMessage({ id: "1 soat ish xaqi" })}:{" "}
                {thousandSeperate(expert?.hourly_salary)}{" "}
                {intl.formatMessage({ id: "so'm" })}
              </span>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="px-5 py-4 rounded-2xl bg-bg-2 w-full flex flex-col gap-1 relative mt-4">
          <h5>{data?.text}</h5>
          <p className="text-sm text-primary text-opacity-60">
            {intl.formatMessage({ id: "Yakunlash muddati" })}:{" "}
            {data?.count_of_days}, {intl.formatMessage({ id: "Xizmat narxi" })}:{" "}
            {data?.price
              ? `${thousandSeperate(data?.price)} ${intl.formatMessage({
                  id: "so'm",
                })}`
              : ""}
          </p>
          <div className="message__offer_shape w-5 h-5 bg-bg-2 absolute -top-4 "></div>
        </div>

        <MyOrderButtons
          card_type={ORDER_DETAILS_OFFERS}
          chat_id={data?.chatId}
          sorted={data?.sorted}
          id={data?.id}
          task_id={router.query.task_id}
        />
      </div>
    </div>
  );
}
