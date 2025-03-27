import React from "react";
import { LeftTasksFilter } from "./details";

// Wrapper komponent shu faylda bor
export function IndexWrapper({ children }) {
  return (
    <div className="w-full pt-6 pb-10">
      <div className="container">
        <div className="flex flex-row gap-8">{children}</div>
      </div>
    </div>
  );
}

// Asosiy komponent
export default function IndexFetchData({ type = "tasks" }) {
  return (
    <IndexWrapper>
      <div className="w-full lg:w-2/6 2xl:w-1/4">
        <LeftTasksFilter />
      </div>
      <div className="w-full lg:w-4/6 2xl:w-2/4"></div>
    </IndexWrapper>
  );
}
