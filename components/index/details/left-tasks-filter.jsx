import {
  FilterBudgetRange,
  FilterDropdown,
  FilterSelect,
} from "@/components/custom/filter";
import { useFetchData } from "@/hooks/useFetchData";
import React from "react";
import { useIntl } from "react-intl";

export default function LeftTasksFilter() {
  const intl = useIntl();

  const { data, isLoading, error } = useFetchData(
    "/speciality/parent-list?expand=children",
    false,
    true,
    "speciality"
  );

  const othersData = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Barchasi" }),
      value: "all",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Ko'rilganlar" }),
      value: "seen",
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Ko'rilmaganlar" }),
      value: "unseen",
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Tezkor" }),
      value: "quickOnes",
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "Kam takliflar" }),
      value: "lessOffers",
    },
  ];

  const budgetStatic = [
    {
      id: 1,
      name: `100.000 ${intl.formatMessage({ id: "ming gacha" })}`,
      value: 100000,
      key: "budget_to",
    },
    {
      id: 2,
      name: `500.000 ${intl.formatMessage({ id: "ming gacha" })}`,
      value: 500000,
      key: "budget_to",
    },
    {
      id: 3,
      name: `1.000.000 ${intl.formatMessage({ id: "ming gacha" })}`,
      value: 1000000,
      key: "budget_to",
    },
    {
      id: 4,
      name: `5.000.000 ${intl.formatMessage({ id: "ming gacha" })}`,
      value: 5000000,
      key: "budget_to",
    },
  ];

  return (
    <div id="left-tasks-filter" className="w-full">
      <div className="flex flex-col gap-5">
        <FilterSelect
          options={data?.items}
          isIcon
          type={"speciality"}
          name={"speciality"}
          empty_message={intl.formatMessage({ id: `empty-speciality` })}
          page={"filter"}
          keyFor="speciality_id"
          title={intl.formatMessage({ id: "Kategoriyani belgilang" })}
        />
        <FilterBudgetRange
          options={budgetStatic}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          keyFor="budget"
          title={intl.formatMessage({ id: "Xizmat narxi bo'yicha" })}
        />
        <FilterDropdown
          options={othersData}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          name="other"
          title={intl.formatMessage({ id: "Qo'shimcha" })}
        />
      </div>
    </div>
  );
}
