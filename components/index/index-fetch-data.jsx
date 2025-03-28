import React from "react";
import { CenterDataTasks, LeftTasksFilter } from "./details";

// Wrapper komponent shu faylda bor
export function IndexWrapper({ children }) {
  return (
    <div className="w-full pt-6 pb-10">
      <div className="container">
        <div className="flex flex-row">{children}</div>
      </div>
    </div>
  );
}

// Asosiy komponent
export default function IndexFetchData({ type = "tasks", all_data = [] }) {
  return (
    <IndexWrapper>
      <div className="hidden lg:block lg:w-2/6 2xl:w-1/4 pr-9">
        <LeftTasksFilter />
      </div>
      <div className="w-full lg:w-4/6 2xl:w-2/4">
        <CenterDataTasks all_data={all_data} />
      </div>
    </IndexWrapper>
  );
}
