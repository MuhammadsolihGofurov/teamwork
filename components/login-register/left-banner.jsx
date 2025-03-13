import Image from "next/image";
import React from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function LeftBanner({ data }) {
  return (
    <div className="hidden lg:block lg:w-2/5">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        modules={[Pagination, Autoplay]}
        className="left__banner"
      >
        {data?.map((item, index) => {
          return (
            <SwiperSlide key={index + item?.title}>
              <div className="w-full overflow-hidden h-[660px] full__image rounded-xl">
                <Image
                  src={item?.image}
                  alt={item?.title}
                  title={item?.title}
                  width={0}
                  height={0}
                  layout="responsive"
                  quality={100}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
