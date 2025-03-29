import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ExpertsSkeleton() {
  return (
    <div className="flex flex-col gap-3 minh-h-[185px] border border-bg-3 bg-white rounded-lg p-5">
      <div className="flex flex-row gap-3">
        <div className="flex flex-col gap-1 justify-center items-center">
          <Skeleton
            className="w-16 small:w-[90px] h-16 small:h-[90px]"
            circle
          />
          <Skeleton width={40} height={14} />
          <div className="flex gap-1">
            <Skeleton width={14} height={14} />
            <Skeleton width={14} height={14} />
            <Skeleton width={14} height={14} />
            <Skeleton width={14} height={14} />
            <Skeleton width={14} height={14} />
          </div>
        </div>
        <div className="flex gap-1 sm:gap-y-3 flex-wrap items-center w-full">
          <div className="flex flex-wrap">
            <div className="w-full sm:w-2/4">
              <Skeleton height={14} count={2} />
            </div>
            <div className="sm:w-2/4 sm:flex hidden justify-end gap-x-3">
              <Skeleton width={40} height={14} />
              <Skeleton width={40} height={14} />
              <Skeleton width={24} height={24} />
            </div>
            <div className="flex flex-wrap justify-start gap-x-3 gap-y-1 w-full">
              <Skeleton width={100} height={14} />
              <Skeleton width={100} height={14} />
              <Skeleton width={100} height={14} />
            </div>
            <div className="sm:hidden flex justify-end gap-x-3">
              <Skeleton width={40} height={14} />
              <Skeleton width={40} height={14} />
            </div>
          </div>
          {/* porfolio */}
          <div className="sm:flex hidden flex-col gap-2 w-full">
            <Skeleton width={120} height={14} />
            <div className="grid grid-cols-3 gap-3">
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
            </div>
          </div>
          {/* hourly_salary */}
          <div className="sm:flex hidden items-center gap-5">
            <div className="flex gap-1 items-center">
              <Skeleton width={20} height={20} circle />
              <Skeleton width={100} height={20} />
            </div>
            <div className="flex gap-1 items-center">
              <Skeleton width={20} height={20} circle />
              <Skeleton width={100} height={20} />
            </div>
          </div>
        </div>
      </div>
      {/* portfolio mobile */}
      <div className="sm:hidden flex flex-col">
        <Skeleton width={100} height={14} />
        <div className="grid grid-cols-3 gap-x-1">
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </div>
      </div>
      <div className="sm:hidden flex flex-col">
        <div className="flex flex-row gap-1">
          <Skeleton width={14} height={14} />
          <Skeleton width={100} height={14} />
        </div>
        <div className="flex flex-row gap-1">
          <Skeleton width={14} height={14} />
          <Skeleton width={100} height={14} />
        </div>
      </div>
    </div>
  );
}
