import React from "react";
import Skeleton from "react-loading-skeleton";

export default function RightInfoAllSkeleton() {
  return (
    <div className="w-full 2xl:flex flex-col gap-5 hidden 2xl:w-[23%]">
      <div className="bg-white p-5 border border-bg-3 flex flex-col gap-5 rounded-lg">
        <Skeleton height={16} count={2} />
        <div className="flex flex-col gap-3">
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
        </div>
      </div>
      <div className="bg-white p-5 border border-bg-3 flex flex-col gap-5 rounded-lg">
        <Skeleton height={16} count={1} />
        <div className="flex flex-col gap-3">
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
          <Skeleton width={100} height={16} />
        </div>
      </div>
    </div>
  );
}
