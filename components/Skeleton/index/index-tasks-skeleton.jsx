import React from "react";
import Skeleton from "react-loading-skeleton";
import TasksSkeleton from "./tasks-skeleton";

export default function IndexTasksSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton width={100} />
      <div className="flex flex-col w-full gap-2">
        <TasksSkeleton />
        <TasksSkeleton />
        <TasksSkeleton />
      </div>
    </div>
  );
}
