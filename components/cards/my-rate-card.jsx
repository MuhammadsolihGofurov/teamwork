import Image from "next/image";
import React from "react";
import { Rates } from "../Utils";
import { formatDateForCard } from "@/utils/funcs";

export default function MyRateCard({ data = {} }) {
  return (
    <div className="flex items-start gap-2 sm:p-5">
      <div className="w-14 h-14 rounded-full bg-main flex items-center justify-center">
        <Image
          src="/images/rate.png"
          title="rate"
          alt="rate"
          width={24}
          height={24}
          loading="lazy"
          // layout="responsive"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <Rates current_rate={data?.rate} isBig />
        <h3
          role="heading"
          className="w-full sm:w-3/4 text-base sm:text-lg font-semibold sm:pr-0 pr-5 leading-5 sm:leading-6"
        >
          <span className="bg-main transition-colors text-primary duration-200">
            {data?.title}
          </span>
        </h3>
        <p className="text-primary sm:text-base text-sm">{data?.message}</p>
        <p className="text-primary text-sm text-opacity-60">
          {formatDateForCard(data?.created_at)}
        </p>
      </div>
    </div>
  );
}
