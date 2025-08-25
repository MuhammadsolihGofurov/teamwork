import { MenuTabsSkeleton } from "@/components/Skeleton/profile";
import { NextLink } from "@/components/Utils";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import { Navigation } from "swiper";

export default function MenuTabs({
  data,
  page,
  tabsMenuCounts,
  tabsMenuQuery = "",
}) {
  const { user_info, loading } = useSelector((state) => state.user);
  const intl = useIntl();
  const router = useRouter();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // data => id, name,url, role, additional_url
  const filteredRoles = data?.filter(
    (item) => item?.role == "all" || item?.role == user_info?.type?.value
  );

  if (loading) {
    return <MenuTabsSkeleton />;
  }

  return (
    <div
      className={`p-1 rounded-lg bg-white border border-bg-3 sm:flex hidden overflow-x-auto w-full scroll__none menu_swiper relative`}
    >
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white px-2 py-3  rounded-full"
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.25 1.5L0.75 6L5.25 10.5"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white px-2 py-3 rounded-full"
      >
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 1.5L5.25 6L0.75 10.5"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Swiper
        spaceBetween={10}
        // grabCursor={true}
        // centeredSlides={false}
        initialSlide={0}
        style={{ padding: "0 16px" }}
        className="custom-swiper"
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: { slidesPerView: "auto", spaceBetween: 8 },
          800: { slidesPerView: "auto", spaceBetween: 12 },
          1024: { slidesPerView: "auto", spaceBetween: 16 },
          2000: { slidesPerView: "auto", spaceBetween: 16 },
        }}
      >
        {filteredRoles?.map((item, index) => {
          const isCorrect =
            `/${item?.url}` == router.pathname ||
            `/${item?.additional_url}` == router.pathname;

          return (
            <SwiperSlide key={item?.name}>
              <NextLink
                url={`${item?.url}${tabsMenuQuery}${
                  item?.query ? item?.query : ""
                }`}
                className={`flex items-center gap-2 py-3 px-5 rounded-lg font-semibold hover:text-main transition-colors duration-200 text-nowrap text-center justify-center ${
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
