import React from "react";
import Skeleton from "react-loading-skeleton";

export default function MyOrderCardSkeleton() {
  return (
    <div className="px-3 py-5 small:p-5 sm:p-8 rounded-lg bg-white border border-bg-3 flex flex-col gap-4">
      <div className="card_header flex items-start sm:items-center justify-between pb-1">
        <div className="flex items-center gap-x-6 gap-y-1 flex-wrap flex-1">
          <Skeleton width={120} height={14} />
          <Skeleton width={120} height={14} />
        </div>
        <div className="flex items-end sm:items-center sm:flex-row flex-col gap-x-3 gap-y-1">
          <Skeleton width={120} height={14} />
          <Skeleton width={30} height={30} circle />
        </div>
      </div>
      <Skeleton count={2} height={14} />
      <div className="flex flex-row items-center gap-4">
        <Skeleton width={100} height={14} />
        <Skeleton width={100} height={14} />
      </div>
      <div className="flex flex-col-reverse sm:flex-col gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full">
          <Skeleton className="rounded-full sm:h-14 h-10"/>
          <Skeleton className="rounded-full sm:h-14 h-10"/>
          <Skeleton className="rounded-full sm:h-14 h-10"/>
          <Skeleton className="rounded-full sm:h-14 h-10"/>
        </div>
        <div className="flex w-full items-center justify-start bg-bg-2 h-[2px]"></div>
      </div>
    </div>
  );
}
