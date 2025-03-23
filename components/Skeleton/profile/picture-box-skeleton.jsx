import React from "react";
import Skeleton from "react-loading-skeleton";

export default function PictureBoxSkeleton() {
  return (
    <div className="relative z-0 bg-white w-full border grid items-center grid-cols-3 sm:grid-cols-1 gap-3 small:gap-5 border-bg-3 pt-4 sm:p-6 rounded-lg">
      {/* Profile Image Skeleton */}
      <div className="flex items-center flex-col text-center gap-2 justify-center col-span-1 sm:col-span-1 sm:pl-0 pl-5">
        <Skeleton
          circle
          className=" w-[70px] small:w-[90px] sm:w-[140px] h-[70px] small:h-[90px] sm:h-[140px]"
        />
        <p className="text-sm font-medium text-primary">
          <Skeleton width={50} />
        </p>
        <div className="flex flex-row gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} width={13} height={12} />
          ))}
        </div>
      </div>

      {/* User Info Skeleton */}
      <div className="sm:hidden flex flex-col gap-1 col-span-2 sm:pr-0 pr-5">
        <h3 className="text-base small:text-lg font-semibold text-primary leading-4 small:leading-5">
          <Skeleton width={120} />
        </h3>
        <p className="text-primary text-sm">
          <Skeleton width={80} />
        </p>
        <p className="text-primary text-opacity-40 text-sm pt-5">
          <Skeleton width={100} />
        </p>
      </div>

      {/* Bio or ChangeRoles Skeleton */}
      <div className="sm:hidden flex w-full col-span-3 px-5">
        <Skeleton
          count={3}
          className=" w-[250px] small:w-[280px] xs:w-[320px]"
        />
      </div>

      {/* Edit Button Skeleton */}
      <button
        type="button"
        className="absolute top-3 sm:top-5 right-3 sm:right-5"
        disabled
      >
        <Skeleton width={20} height={20} />
      </button>
    </div>
  );
}
