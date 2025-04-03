import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CreateTaskFormSkeleton() {
  return (
    <div className="bg-white">
      <div className="grid-cols-1 items-start rounded-lg sm:border border-bg-3">
        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-2/3 h-4" count={2} />
          </div>
          <Skeleton className="w-full h-20" />
        </div>

        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 flex flex-col gap-5">
          <Skeleton className="w-1/3 h-6" />
          <Skeleton className="w-full h-24" />
        </div>

        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 flex flex-col gap-5">
          <Skeleton className="w-1/3 h-6" />
          <Skeleton className="w-full h-12" />
        </div>

        <div className="border-b border-b-bg-3 sm:p-10 sm:pb-8 pb-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
        </div>

        <div className="sm:p-10 sm:pb-8 pb-8 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
            <Skeleton className="w-1/3 h-6" />
            <Skeleton className="w-2/3 h-4" count={2} />
          </div>
          <Skeleton className="w-full h-14" />
          <Skeleton className="w-full h-14" />
        </div>
      </div>

      <Skeleton className="w-full h-14" />
    </div>
  );
}
