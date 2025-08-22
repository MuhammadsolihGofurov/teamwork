import React from "react";
import { NextLink } from "../Utils";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import LeftInfoProfilePicture from "../profile/details/chats/left-info-profile-picture";

export default function Breadcrumbs({
  data,
  isReturn = false,
  page = "default",
  indexNum = 0,
  tabsMenu = [],
  isMenuShow = false,
  title,
  tabsMenuCounts,
  tabsMenuQuery,
  user_data = {},
}) {
  const { user_info } = useSelector((state) => state.user);
  const intl = useIntl();
  const router = useRouter();

  if (isReturn) {
    return (
      <div className="flex items-center gap-1 w-full sm:relative sm:top-0 fixed top-[75px] sm:py-0 py-4 sm:bg-transparent bg-white z-[99] sm:border-0 border-b border-black border-opacity-10 sm:px-0 px-5   transition-colors duration-150">
        <NextLink
          url={data[0]?.url}
          className={
            "flex items-center gap-2 text-dark font-normal hover:text-main group"
          }
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16602 10H15.8327M4.16602 10L9.16602 15M4.16602 10L9.16602 5"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-main transition-colors duration-150"
            />
          </svg>

          {data[0]?.name}
        </NextLink>
      </div>
    );
  }

  if (page == "profile") {
    // data => id, name,url, role, additional_url
    const filteredRoles = tabsMenu?.filter(
      (item) => item?.role == "all" || item?.role == user_info?.type?.value
    );

    return (
      <div className="border-b border-b-bg-3 flex flex-col gap-3 items-start sm:hidden pt-2 pb-3 pl-5">
        <NextLink
          url={data?.[indexNum]?.url}
          key={data?.[indexNum]?.name}
          className={
            "flex items-center gap-1 text-primary opacity-100 group hover:opacity-100 hover:text-main transition-all duration-150 text-sm"
          }
        >
          {data?.[indexNum]?.name}
        </NextLink>
        {isMenuShow ? (
          <div className="flex flex-row w-full gap-1 overflow-x-auto scroll__none pr-5">
            {filteredRoles?.map((item, index) => {
              const isCorrect =
                `/${item?.url}` == router.pathname ||
                `/${item?.additional_url}` == router.pathname;
              return (
                <NextLink
                  url={`${item?.url}${tabsMenuQuery ?? ""}`}
                  key={item?.name}
                  className={`flex py-[6px] px-3 text-sm text-nowrap rounded-full font-medium hover:text-main transition-colors duration-200 ${
                    isCorrect
                      ? "bg-main bg-opacity-10 text-main"
                      : "bg-white text-primary"
                  }`}
                >
                  {intl.formatMessage({ id: item?.name })}{" "}
                  {tabsMenuCounts
                    ? tabsMenuCounts?.[index] !== "none"
                      ? `${tabsMenuCounts?.[index]}`
                      : ""
                    : ""}
                </NextLink>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }

  if (page == "chats") {
    return (
      <>
        <div className="border-b border-b-bg-3 flex flex-row justify-between gap-3 items-center sm:hidden pt-2 pb-3 px-5">
          <div className="flex flex-row items-center gap-3">
            <NextLink
              url={data?.[indexNum]?.url}
              key={data?.[indexNum]?.name}
              className={
                "flex items-center gap-1 text-primary opacity-100 group hover:opacity-100 hover:text-main transition-all duration-150 text-sm"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.16602 10H15.8327M4.16602 10L9.16602 15M4.16602 10L9.16602 5"
                  stroke="#222222"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NextLink>
            <LeftInfoProfilePicture
              path={user_data?.photo_url}
              full_name={user_data?.full_name}
              is_online={user_data?.is_online}
              type="large"
            />
            <div className="flex flex-col flex-1">
              <h2 className="text-primary font-medium text-xs sm:text-base">
                {user_data?.full_name}
              </h2>
              <p className="text-xs sm:text-sm text-main font-normal">
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
        <NextLink url={`tasks/${user_data?.task_id}`} className="bg-main bg-opacity-5 sm:hidden py-3 px-5 flex items-center gap-3">
          <p className="text-sm font-semibold text-main">
            #{user_data?.task_id}
          </p>
          <p className="text-sm text-primary line-clamp-1">{user_data?.text}</p>
        </NextLink>
      </>
    );
  }

  return (
    <div className="sm:flex hidden items-center gap-5">
      <NextLink
        url={""}
        className={
          "flex items-center gap-1 text-primary opacity-40 group hover:opacity-100 transition-opacity duration-150"
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 17.5V12.5C7.5 12.058 7.67559 11.634 7.98816 11.3215C8.30072 11.0089 8.72464 10.8333 9.16667 10.8333H10.8333C11.2754 10.8333 11.6993 11.0089 12.0118 11.3215C12.3244 11.634 12.5 12.058 12.5 12.5V17.5M4.16667 10H2.5L10 2.5L17.5 10H15.8333V15.8333C15.8333 16.2754 15.6577 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H5.83333C5.39131 17.5 4.96738 17.3244 4.65482 17.0118C4.34226 16.6993 4.16667 16.2754 4.16667 15.8333V10Z"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:stroke-main transition-colors duration-150"
          />
        </svg>
        <span className="group-hover:text-main transition-colors duration-150">
          {intl.formatMessage({ id: "Bosh sahifa" })}
        </span>
      </NextLink>
      {data?.map((link, index) => {
        return (
          <NextLink
            url={link?.url}
            key={link?.name + index}
            className={`flex items-center gap-1 ${
              link?.is_correct
                ? "text-primary opacity-100"
                : "text-primary opacity-40"
            } group hover:opacity-100 hover:text-main transition-all duration-150`}
          >
            {link?.name}
          </NextLink>
        );
      })}
      {title ? (
        <h1 className="text-primary font-medium text-lg pl-20">{title}</h1>
      ) : (
        <></>
      )}
    </div>
  );
}
