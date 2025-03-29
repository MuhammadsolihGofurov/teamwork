import {
  ChangeLink,
  FilterOpenBtn,
  SearchTerms,
} from "@/components/Banner/details";
import { ExpertsUrl, TasksUrl } from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";

export default function TopFilterBar() {
  const intl = useIntl();
  const data = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Topshiriqlar" }),
      url: TasksUrl,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Mutaxassislar" }),
      url: ExpertsUrl,
    },
  ];

  return (
    <div className="py-2 sm:border-t border-b border-bg-3">
      <div className="container flex lg:flex-row flex-col items-end justify-start w-full gap-y-5 gap-8">
        <div className="w-full lg:w-2/6 2xl:w-[23%]">
          <ChangeLink isMobileVersion data={data} />
        </div>
        <div className="w-full lg:w-4/6 2xl:w-[54%] flex items-center justify-center gap-1">
          <SearchTerms isMobileVersion/>
          <FilterOpenBtn />
        </div>
        <div className="w-[23%] 2xl:block hidden"></div>
      </div>
    </div>
  );
}
