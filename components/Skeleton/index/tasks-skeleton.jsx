import React from "react";
import Skeleton from "react-loading-skeleton";

export default function TasksSkeleton() {
  return (
    <div
      className={`flex group flex-col gap-3 py-4 px-5 rounded-lg border border-bg-3 bg-white transition-colors duration-200 hover:border-main`}
    >
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-3">
          <Skeleton width={24} height={24} />
          <Skeleton width={100} height={10} />
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton width={24} height={24} />
          <Skeleton width={24} height={24} />
        </div>
      </div>
      <Skeleton count={2} style={{ width: "90%" }} />

      <div className="flex flex-wrap gap-3">
        <Skeleton width={50} height={14} />
        <Skeleton width={70} height={14} />
        <Skeleton width={30} height={14} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Skeleton width={50} height={14} />
          <Skeleton width={50} height={14} />
          <Skeleton width={50} height={14} />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton width={50} height={14} />
        </div>
      </div>
    </div>
  );
}
