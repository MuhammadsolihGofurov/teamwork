import { Dropdown } from "@/components/custom/form";
import CustomSelect from "@/components/custom/form/details/custom-select";
import { useFetchData } from "@/hooks/useFetchData";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function LeftTasksFilter() {
  const { specialities } = useSelector((state) => state.settings);
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

  return (
    <div id="left-tasks-filter" className="w-full">
      <div className="flex flex-col gap-5">
        <CustomSelect
          options={specialities}
          isIcon
          type={"speciality"}
          name={"speciality"}
          empty_message={intl.formatMessage({ id: `empty-speciality` })}
          page={"filter"}
          keyFor="speciality_id"
          handleChangeRouter={(key) => console.log(key)}
          title={intl.formatMessage({ id: "Kategoriyani belgilang" })}
        />
        <Dropdown
          options={othersData}
          type={"speciality"}
          name={"speciality"}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          keyFor="other"
          handleChangeRouter={(key) => console.log(key)}
          title={intl.formatMessage({ id: "Qo'shimcha" })}
        />
      </div>
    </div>
  );
}
