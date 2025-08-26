import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ExperienceFormSkeleton() {
  return (
    <div className="bg-white grid items-center grid-cols-1 lg:grid-cols-2 gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3">
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
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>
      <div className="flex flex-col">
        <Skeleton width={50} />
        <Skeleton height={58} />
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Skeleton height={140} />
      </div>
      <div className="col-span-1 lg:col-span-2 pt-6 sm:pt-14">
        <Skeleton height={58} />
      </div>
    </div>
  );
}
