import React from "react";
import Skeleton from "react-loading-skeleton";

export default function InfoTopSkeleton() {
  return (
    <div className="bg-white border border-bg-3 rounded-lg flex flex-col gap-5 pt-5 sm:pt-8 pb-1">
      <div className="flex flex-col gap-1 px-5 sm:px-10">
        <Skeleton className="w-[200px] sm:w-[320px]" />
        <Skeleton className="w-[120px] sm:w-[240px]" />
      </div>
      <div className="flex w-full gap-5 px-5 sm:px-10">
        <Skeleton className="w-[100px] h-[20px] sm:h-[60px] small:w-[140px] md:w-[200px] lg:w-[260px] 2xl:w-[300px]" />
        <Skeleton className="w-[100px] h-[20px] sm:h-[60px] small:w-[140px] md:w-[200px] lg:w-[260px] 2xl:w-[300px]" />
      </div>
      <div className="px-1">
        <Skeleton className="w-full flex-1 h-[20px] sm:h-[60px]" />
      </div>
    </div>
  );
}
