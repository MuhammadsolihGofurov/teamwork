import React from "react";
import Skeleton from "react-loading-skeleton";

export default function PaymentBoxSkeleton() {
  return (
    <div
      className={`bg-white border border-bg-3 rounded-lg flex flex-col gap-3 pt-5 sm:pt-8 pb-1 w-full`}
    >
      <div className="flex flex-col items-start justify-between px-5 sm:pl-10 sm:pr-7 gap-4">
        {/* money box */}
        <div className="flex justify-between items-start w-full gap-x-1 gap-y-3 xs:flex-row flex-col">
          <div className="flex flex-col pl-4 sm:pl-0">
            <Skeleton width={120} height={14} />
            <Skeleton width={200} height={10} count={1} />
          </div>
          <div className="flex gap-1 w-full sm:w-auto">
            <Skeleton className="w-[120px] sm:w-[200px] h-14 rounded-full" />
            <Skeleton className="w-14 h-14 rounded-full" />
          </div>
        </div>
        {/* coin box */}
        <div className="flex justify-between items-start w-full gap-x-1 gap-y-3 xs:flex-row flex-col">
          <div className="flex flex-col pl-4 sm:pl-0">
            <Skeleton width={120} height={14} />
            <Skeleton width={200} height={10} count={1} />
          </div>
          <div className="flex gap-1 w-full sm:w-auto">
            <Skeleton className="w-[120px] h-14 rounded-full" />
            <Skeleton className="w-14 h-14 rounded-full" />
          </div>
        </div>
      </div>
      <div className="px-1">
        <Skeleton height={48} />
      </div>
    </div>
  );
}
