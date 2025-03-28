import React from "react";
import { CenterData, LeftExpertsFilter, LeftTasksFilter } from "./details";
import { Pagination, RightInfoAll } from "../Utils";

// Wrapper komponent shu faylda bor
export function IndexWrapper({ children, id }) {
  return (
    <div className="w-full pt-6 pb-10" id={id}>
      <div className="container">
        <div className="flex flex-row gap-8">{children}</div>
      </div>
    </div>
  );
}

// Asosiy komponent
export default function IndexFetchData({
  type = "tasks",
  all_data = [],
  loading,
  pagination,
}) {
  if (type == "experts") {
    return (
      <IndexWrapper id={type}>
        <div className="hidden lg:block lg:w-2/6 2xl:w-[23%]">
          <LeftExpertsFilter />
        </div>
        <div className="w-full lg:w-4/6 2xl:w-[54%]">
          <CenterData
            all_data={all_data}
            count={pagination?.totalCount}
            loading={loading}
            type={type}
          />
          <Pagination data={pagination} />
        </div>
        <RightInfoAll />
      </IndexWrapper>
    );
  }

  if (type == "tasks") {
    return (
      <IndexWrapper id={type}>
        <div className="hidden lg:block lg:w-2/6 2xl:w-[23%]">
          <LeftTasksFilter />
        </div>
        <div className="w-full lg:w-4/6 2xl:w-[54%]">
          <CenterData
            all_data={all_data}
            count={pagination?.totalCount}
            loading={loading}
            type={type}
          />
          <Pagination data={pagination} />
        </div>
        <RightInfoAll />
      </IndexWrapper>
    );
  }

  return (
    <IndexWrapper>
      <div className="hidden lg:block lg:w-2/6 2xl:w-1/4 pr-9">
        <LeftTasksFilter />
      </div>
      <div className="w-full lg:w-4/6 2xl:w-2/4">
        <CenterData all_data={all_data} />
      </div>
    </IndexWrapper>
  );
}
