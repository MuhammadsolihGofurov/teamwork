import React from "react";
import Skeleton from "react-loading-skeleton";

export default function MainInfoUpdateSkeleton() {
  return (
    <div className="bg-white grid items-center grid-cols-1 lg:grid-cols-2 gap-6 p-8 rounded-lg border border-bg-3">
      <div className="flex items-center gap-3">
        <Skeleton circle className="w-[100px] h-[100px]" />
        <div className="flex flex-col">
          <Skeleton className="w-[120px] h-[20px]" />
          <Skeleton className="w-[70px] h-[15px]" />
        </div>
      </div>
      <Skeleton count={3} />
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <Skeleton width={150} />
      </div>
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>
      <div className="col-span-1 lg:col-span-2 pt-20">
        <Skeleton height={58}/>
      </div>
    </div>
  );
}
