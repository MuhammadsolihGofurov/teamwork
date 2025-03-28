import React from "react";
import { NextLink } from "../Utils";
import { useIntl } from "react-intl";
import { DislikeBtn, LikeBtn } from "./details";
import { formatDateForCard, thousandSeperate } from "@/utils/funcs";
import Image from "next/image";

export default function IndexExpertCard({ data }) {
  const intl = useIntl();
  const url = `experts/views/${data?.id}`;

  return (
    <div
      className={`group overflow-hidden flex flex-row items-start gap-5 p-5 rounded-lg border border-bg-3 bg-white transition-colors duration-200 hover:border-main min-h-[235px] text-primary`}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="w-[90px] h-[90px]">
          <Image
            src={data?.photo ?? "/images/defaultAvatar.png"}
            title={data?.full_name}
            alt=""
            width={0}
            height={0}
            className="w-full h-full object-cover"
            layout="responsive"
          />
        </div>
        <p className="text-sm">{data?.rate}</p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const filledStars = Math.floor(data?.rate || 0);
            const isFilled = index < filledStars;
            return (
              <svg
                key={index}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99992 8.87498L2.91392 10.4975L3.50342 7.06098L1.00342 4.62748L4.45342 4.12748L5.99642 1.00098L7.53942 4.12748L10.9894 4.62748L8.48942 7.06098L9.07892 10.4975L5.99992 8.87498Z"
                  fill={isFilled ? "#98BE00" : "#DDDDDD"}
                  stroke={isFilled ? "#98BE00" : "#DDDDDD"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            );
          })}
        </div>
      </div>
    </div>
  );
}
