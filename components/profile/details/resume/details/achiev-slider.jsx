import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { AchievResumeCard } from "@/components/cards";

export default function AchievSlider() {
  const router = useRouter();
  const intl = useIntl();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data: achievs, isValidating } = useSWR(
    ["/user-achievements", router.locale],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      <h4 className="font-semibold text-primary text-lg">
        {intl.formatMessage({ id: "Yutuqlar" })}
      </h4>
      <div className="w-full relative">
        {/* Swiper */}
        {achievs?.data?.length > 0 && achievs ? (
          <Swiper
            spaceBetween={16}
            grabCursor={true}
            centeredSlides={false}
            initialSlide={0}
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
              320: { slidesPerView: 1.4, spaceBetween: 12 },
              640: { slidesPerView: 2.1, spaceBetween: 14 },
              1024: { slidesPerView: 2.6, spaceBetween: 16 },
            }}
          >
            {achievs?.data?.map((edu, index) => (
              <SwiperSlide key={index}>
                <AchievResumeCard data={edu} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-sm text-primary text-opacity-55">
            {intl.formatMessage({ id: "Ma'lumotlar mavjud emas" })}
          </p>
        )}
      </div>
    </div>
  );
}
