import Image from "next/image";
import React, { useState } from "react";
import { useIntl } from "react-intl";

export default function PictureBox({
  image,
  title,
  is_sure,
  type = "tasks",
  time_since_join,
  is_online,
}) {
  const intl = useIntl();
  const isTasks = type == "tasks";

  return (
    <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-y-5">
      <div className="flex flex-row gap-3 sm:gap-5 sm:w-auto w-full">
        <div className="xs:w-[90px] w-16 h-16 xs:h-[90px] rounded-full overflow-hidden">
          <Image
            src={
              image
                ? image?.startsWith("http")
                  ? image
                  : `${process.env.NEXT_PUBLIC_API_PATH_IMAGE}${image}`
                : "/images/default.png"
            }
            width={90}
            height={90}
            alt=""
            title={title}
            layout="responsive"
            className="w-full h-full object-cover"
          />
        </div>
        <TasksTitle
          title={title}
          is_sure={is_sure}
          is_online={is_online}
          time_since_join={time_since_join}
        />
      </div>
      <div className="flex flex-row flex-wrap sm:flex-col items-center sm:items-end  sm:justify-end gap-1 sm:w-auto w-full">
        <div className="flex items-center gap-1 text-primary text-sm font-semibold">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.0002 6.66683H10.0085M9.16683 10.0002H10.0002V13.3335H10.8335M5.00016 3.3335H15.0002C15.9206 3.3335 16.6668 4.07969 16.6668 5.00016V15.0002C16.6668 15.9206 15.9206 16.6668 15.0002 16.6668H5.00016C4.07969 16.6668 3.3335 15.9206 3.3335 15.0002V5.00016C3.3335 4.07969 4.07969 3.3335 5.00016 3.3335Z"
              stroke="#121212"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="flex-1">
            {intl.formatMessage({ id: "Fors-major holatlarda" })}:
          </span>
        </div>
        <button
          type="button"
          className="text-some_red text-sm font-medium text-start"
        >
          {intl.formatMessage({ id: "Murojaat qoldiring" })}
        </button>
      </div>
    </div>
  );
}

export const TasksTitle = ({ title, is_sure, is_online, time_since_join }) => {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-1 sm:gap-2 text-primary">
      <h3 className="font-semibold text-lg  sm:text-xl leading-5 sm:leading-6">
        {title}
      </h3>
      <div className="flex items-center gap-1 text-[15px] sm:pb-1 font-normal">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.50001 10L9.16668 11.6667L12.5 8.33333M10 2.5C11.9466 4.22215 14.4871 5.11881 17.0834 5C17.4614 6.28585 17.577 7.63456 17.4235 8.96598C17.2699 10.2974 16.8503 11.5844 16.1895 12.7504C15.5288 13.9165 14.6403 14.9378 13.5771 15.7537C12.5138 16.5696 11.2973 17.1635 10 17.5C8.7027 17.1635 7.48626 16.5696 6.42298 15.7537C5.3597 14.9378 4.47128 13.9165 3.81052 12.7504C3.14976 11.5844 2.73014 10.2974 2.57659 8.96598C2.42304 7.63456 2.5387 6.28585 2.91669 5C5.51296 5.11881 8.0535 4.22215 10 2.5Z"
            stroke="#1DA743"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {intl.formatMessage({ id: "Ishonchli buyurtmachi" })}
      </div>
      <p className="text-sm font-normal text-primary text-opacity-45">
        {intl.formatMessage({ id: "Biz bilan birga" })}: {time_since_join}
      </p>
    </div>
  );
};
