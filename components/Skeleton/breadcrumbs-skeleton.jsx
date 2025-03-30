import React from "react";
import Skeleton from "react-loading-skeleton";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="sm:flex hidden items-center gap-5">
      <div className="flex items-center gap-2">
        <Skeleton width={20} height={20} circle />
        <Skeleton width={100} height={16} className="mt-2" />
      </div>
      <Skeleton width={100} height={16} className="mt-2" />
      <Skeleton width={100} height={16} className="mt-2" />
    </div>
  );
}
