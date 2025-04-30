import React from "react";
import { LeftInfoProfilePicture } from ".";
import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { NextLink } from "@/components/Utils";

export default function MessageHeader({ user_data = {} }) {
  const intl = useIntl();
  return (
    <>
      <HeaderInfo user_data={user_data} />
      <HeaderTaskInfo user_data={user_data}/>
    </>
  );
}

export const HeaderInfo = ({ user_data }) => {
  const intl = useIntl();

  if (user_data?.loading) {
    return (
      <div className="py-5 px-6 rounded-lg bg-white flex items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <Skeleton width={40} height={40} circle />
          <div className="flex flex-col w-full flex-1">
            <Skeleton height={20} className="w-[200px] md:w-[320px]" />
            <Skeleton height={14} width={100} />
          </div>
        </div>
        <Skeleton width={24} height={24} />
      </div>
    );
  }

  return (
    <div className="py-5 px-6 rounded-lg bg-white flex items-center justify-between">
      <div className="flex flex-row items-center gap-3">
        <LeftInfoProfilePicture
          path={user_data?.photo_url}
          full_name={user_data?.full_name}
          is_online={user_data?.is_online}
          type="large"
        />
        <div className="flex flex-col flex-1">
          <h2 className="text-primary font-medium text-base">
            {user_data?.full_name}
          </h2>
          <p className="text-sm text-main font-normal">
            <span>{intl.formatMessage({ id: "Holati" })}:</span>{" "}
            <span>
              {intl.formatMessage({
                id: user_data?.is_online ? "online" : "online emas",
              })}
            </span>
          </p>
        </div>
      </div>
      <button type="button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H11M4 12H11M4 18H13M15 9L18 6M18 6L21 9M18 6V18"
            stroke="#364749"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export const HeaderTaskInfo = ({ user_data }) => {
  return (
    <NextLink
      url={`tasks/${user_data?.task_id}`}
      className="bg-main bg-opacity-5 py-3 px-5 flex items-center gap-3"
    >
      <p className="text-sm font-semibold text-main">#{user_data?.task_id}</p>
      <p className="text-sm text-primary font-medium line-clamp-1">{user_data?.text}</p>
    </NextLink>
  );
};
