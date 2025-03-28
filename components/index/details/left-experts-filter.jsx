import {
  FilterBudgetRange,
  FilterDropdown,
  FilterMultiSelect,
  FilterSelect,
} from "@/components/custom/filter";
import { useFetchData } from "@/hooks/useFetchData";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";

export default function LeftTasksFilter() {
  const intl = useIntl();
  const router = useRouter();

  const { data: specialities } = useSWR(
    ["/speciality/parent-list?expand=children", router.locale],
    (url) =>
      fetcher(url, {
        headers: {
          "Accept-Language": router.locale,
        },
      })
  );

  const { data: skills } = useSWR(["/skill/list", router.locale], (url) =>
    fetcher(url, {
      headers: {
        "Accept-Language": router.locale,
      },
    })
  );

  const reytingData = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Barchasi" }),
      value: "all",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Havaskor" }),
      value: "AMATEUR",
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Mutaxassis" }),
      value: "EXPERT",
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Profi" }),
      value: "PROFI",
    },
  ];

  const experienceData = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Barchasi" }),
      value: "all",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "1-6 oy" }),
      value: "1-6",
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "6 oy - 1 yil" }),
      value: "6-1",
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "1-3 yil" }),
      value: "1-3",
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "3 yildan yuqori" }),
      value: "3",
    },
  ];

  return (
    <div id="left-tasks-filter" className="w-full">
      <div className="flex flex-col gap-5">
        <FilterSelect
          options={specialities?.data?.items}
          isIcon
          type={"speciality"}
          name={"speciality"}
          empty_message={intl.formatMessage({ id: `empty-speciality` })}
          page={"filter"}
          keyFor="speciality_id"
          title={intl.formatMessage({ id: "Mutaxassislik bo'yicha" })}
        />
        <FilterMultiSelect
          options={skills?.data?.items}
          isIcon
          name={"skill_ids"}
          empty_message={intl.formatMessage({ id: `empty-skill_ids` })}
          page={"filter"}
          keyFor="skill_ids"
          title={intl.formatMessage({ id: "Konikmalar" })}
        />
        <FilterDropdown
          options={reytingData}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          name="expert_level"
          title={intl.formatMessage({ id: "Reyting" })}
        />
        <FilterDropdown
          options={experienceData}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          name="experience"
          title={intl.formatMessage({ id: "Platformadagi tajriba" })}
        />
      </div>
    </div>
  );
}
