import React from "react";
import BreadcrumbsSkeleton from "../breadcrumbs-skeleton";
import RightInfoAllSkeleton from "../right-info-all-skeleton";
import Skeleton from "react-loading-skeleton";

export default function TaskDetailsSkeleton() {
  return (
    <main className="pt-20 sm:pt-[100px]">
      <div className="container flex flex-col">
        <BreadcrumbsSkeleton />
        <div className="flex flex-row gap-8 py-5">
          <div className="w-full 2xl:w-[70%]">
            <div className="bg-white sm:border sm:border-bg-3 sm:p-7 lg:p-12 rounded-xl">
              <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-y-5 animate-pulse">
                <div className="flex flex-row gap-3 sm:gap-5 sm:w-auto w-full">
                  {/* ✅ Profil rasmi uchun Skeleton */}
                  <Skeleton className="xs:w-[90px] w-16 h-16 xs:h-[90px] rounded-full" />

                  {/* ✅ Matn qismi */}
                  <div className="flex flex-col gap-1 sm:gap-2 w-[150px]">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>

                {/* ✅ Fors-major uchun */}
                <div className="flex flex-row flex-wrap sm:flex-col items-center sm:items-end sm:justify-end gap-1 sm:w-auto w-full">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-3 w-[100px]" />
                </div>
              </div>
              <div className="flex items-center justify-between py-6 sm:py-8 animate-pulse">
                <div className="flex items-center gap-1">
                  <Skeleton className="w-5 h-5 rounded-full" />
                  <Skeleton className="w-24 h-4 mt-2 rounded" />
                </div>
                <div className="flex items-center gap-5">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <Skeleton className="w-10 h-10 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col sm:gap-5">
                <div className="bg-some_btn sm:bg-main sm:bg-opacity-5 rounded-t-xl sm:rounded-xl px-4 sm:px-5 py-5 sm:py-8 flex flex-col gap-5 sm:gap-8 animate-pulse">
                  {/* Title Skeleton */}
                  <Skeleton className="w-3/4 h-6 sm:h-8 rounded" />

                  {/* Buttons Skeleton */}
                  <div className="flex gap-4">
                    <Skeleton className="py-3 sm:py-4 px-7 w-40 h-12 rounded-lg" />
                    <Skeleton className="py-4 px-7 w-52 h-12 sm:block hidden rounded-lg" />
                  </div>
                </div>
                <div className="flex flex-col gap-5 bg-main bg-opacity-5 sm:px-0 px-4 sm:pb-0 pb-10 sm:pt-0 pt-5 sm:bg-transparent rounded-b-xl">
                  {/* Tags */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Skeleton className="w-24 h-5 rounded-md" />
                    <Skeleton className="w-32 h-5 rounded-md" />
                  </div>

                  {/* More Info */}
                  <Skeleton className="w-full h-6 rounded-md" />

                  {/* Views & Offers */}
                  <div className="flex items-center gap-5 flex-wrap">
                    <Skeleton className="w-40 h-5 rounded-md" />
                    <Skeleton className="w-32 h-5 rounded-md" />
                  </div>

                  {/* Divider */}
                  <div className="w-full h-[1px] bg-bg-3"></div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Fields */}
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Skeleton className="w-6 h-6 rounded-full" />
                        <div className="flex flex-col text-sm text-primary flex-1">
                          <Skeleton className="w-32 h-4 rounded-md" />
                          <Skeleton className="w-40 h-5 rounded-md mt-1" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-5 py-7 sm:py-10 px-3 sm:px-10">
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6" circle />
                <Skeleton width={120} className="h-4 mt-2" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6" circle />
                <Skeleton width={120} className="h-4 mt-2" />
              </div>
            </div>
          </div>
          <RightInfoAllSkeleton />
        </div>
      </div>
    </main>
  );
}
