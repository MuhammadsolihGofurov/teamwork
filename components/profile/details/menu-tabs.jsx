import { MenuTabsSkeleton } from "@/components/Skeleton/profile";
import { NextLink } from "@/components/Utils";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";

export default function MenuTabs({
  data,
  page,
  tabsMenuCounts,
  tabsMenuQuery = "",
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
      className={`p-1 rounded-lg bg-white border border-bg-3 sm:flex hidden overflow-x-auto w-full scroll__none menu_swiper`}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView="auto"
        freeMode={true}
        grabCursor={true}
        centeredSlides={false}
        initialSlide={0}
        style={{ padding: "0 4px" }}
        className="custom-swiper"
      >
        {filteredRoles?.map((item, index) => {
          const isCorrect =
            `/${item?.url}` == router.pathname ||
            `/${item?.additional_url}` == router.pathname;

          return (
            <SwiperSlide key={item?.name} style={{ width: "auto" }}>
              <NextLink
                url={`${item?.url}${tabsMenuQuery}${
                  item?.query ? item?.query : ""
                }`}
                className={`flex items-center gap-2 py-3 px-5 rounded-lg font-semibold hover:text-main transition-colors duration-200 text-nowrap ${
                  isCorrect
                    ? "bg-main bg-opacity-10 text-main"
                    : "bg-white text-primary"
                }`}
              >
                {item.icon && (
                  <span dangerouslySetInnerHTML={{ __html: item?.icon }} />
                )}
                <span className="flex items-center">
                  {intl.formatMessage({ id: item?.name })}{" "}
                  {tabsMenuCounts
                    ? tabsMenuCounts?.[index] !== "none"
                      ? `(${tabsMenuCounts?.[index]})`
                      : ""
                    : ""}
                </span>
              </NextLink>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
