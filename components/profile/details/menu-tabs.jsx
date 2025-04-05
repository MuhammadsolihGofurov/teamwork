import { MenuTabsSkeleton } from "@/components/Skeleton/profile";
import { NextLink } from "@/components/Utils";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function MenuTabs({
  data,
  page,
  tabsMenuCounts,
  tabsMenuQuery,
}) {
  const { user_info, loading } = useSelector((state) => state.user);
  const intl = useIntl();
  const router = useRouter();

  // data => id, name,url, role, additional_url
  const filteredRoles = data?.filter(
    (item) => item?.role == "all" || item?.role == user_info?.type?.value
  );

  if (loading) {
    return <MenuTabsSkeleton />;
  }

  return (
    <div
      className={`p-1 rounded-lg bg-white border border-bg-3 sm:flex hidden overflow-x-auto w-full scroll__none`}
    >
      {filteredRoles?.map((item, index) => {
        const isCorrect =
          `/${item?.url}` == router.pathname ||
          `/${item?.additional_url}` == router.pathname;
        return (
          <NextLink
            url={`${item?.url}${tabsMenuQuery}`}
            key={item?.name}
            className={`flex py-3 px-5 rounded-lg font-semibold hover:text-main transition-colors duration-200 text-nowrap ${
              isCorrect
                ? "bg-main bg-opacity-10 text-main"
                : "bg-white text-primary"
            }`}
          >
            {intl.formatMessage({ id: item?.name })}{" "}
            {tabsMenuCounts
              ? tabsMenuCounts?.[index] !== "none"
                ? `(${tabsMenuCounts?.[index]})`
                : ""
              : ""}
          </NextLink>
        );
      })}
    </div>
  );
}
