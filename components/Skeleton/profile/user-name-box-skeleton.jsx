import React from "react";
import Skeleton from "react-loading-skeleton";

export default function UserNameBoxSkeleton() {
  return (
    <div className="relative z-0 bg-white w-full border hidden sm:flex flex-col gap-3 small:gap-5 border-bg-3 pt-5 rounded-lg">
      <div className="flex flex-col gap-1 px-6">
        <Skeleton height={20} width={150} />
        <Skeleton height={15} width={100} />
        <Skeleton height={15} width={120} className="mt-3" />
      </div>

      <div className="grid grid-cols-2 w-full px-1 gap-1">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}
