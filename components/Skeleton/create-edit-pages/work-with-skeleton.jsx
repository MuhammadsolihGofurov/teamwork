import React from "react";
import WorkWithFormSkeleton from "./work-with-form-skeleton";
import RightInfoAllSkeleton from "../right-info-all-skeleton";
import BreadcrumbsSkeleton from "../breadcrumbs-skeleton";
import { Wrapper } from "@/components/Utils";
import Skeleton from "react-loading-skeleton";

export default function WorkWithSkeleton() {
  return (
    <Wrapper>
      <div className="container flex flex-col gap-5">
        <BreadcrumbsSkeleton />
        <div className="flex gap-8 sm:flex-row flex-col items-start">
          <div className="2xl:w-[23%] 2xl:flex hidden">
            <div className="border border-bg-3 rounded-lg p-5 w-full min-h-[320px]">
              <Skeleton height={"32px"} />
              <Skeleton height={"32px"} />
            </div>
          </div>
          <div className="w-full 2xl:w-[54%]">
            <WorkWithFormSkeleton />
          </div>
          <RightInfoAllSkeleton />
        </div>
      </div>
    </Wrapper>
  );
}
