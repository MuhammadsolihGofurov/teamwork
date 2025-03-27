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
          key="speciality_id"
          handleChangeRouter={(key) => console.log(key)}
        />
      </div>
    </div>
  );
}
