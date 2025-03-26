import React from "react";
import { useIntl } from "react-intl";
import CustomSelect from "./details/custom-select";
import MultiSelect from "./details/multi-select";
import { useFetchData } from "@/hooks/useFetchData";
import { useSelector } from "react-redux";

export default function SelectInput({
  name,
  title,
  state,
  page,
  errors,
  isIcon,
  control,
  select_type = "custom",
  options = [],
  selectedState,
  setSelectedAction = () => {},
  required = false,
  isAuth = false,
}) {
  const intl = useIntl();
  const { country_id, region_id, speciality_current } = useSelector(
    (state) => state.settings
  );

  const endpoints = {
    country: "/country/list",
    region: `/region/list?country_id=${country_id}`,
    district: `/district/list?region_id=${region_id}`,
    speciality: `/speciality/parent-list?expand=children`,
    skill_ids: `/skill/list`,
  };

  // Agar select_type "multiple_without_api" bo‘lsa, API so‘rov yubormaymiz
  const shouldFetch = select_type !== "multiple_without_api";
  const { data, isLoading, error } = shouldFetch
    ? useFetchData(endpoints[state], isAuth)
    : {
        data: { items: speciality_current?.children },
        isLoading: false,
        error: null,
      };

  return (
    <label className="flex flex-col gap-2" htmlFor={name}>
      <span
        className={` text-primary  ${
          page == "profile"
            ? "pl-0 text-base font-medium"
            : "pl-6 text-sm font-normal"
        }`}
      >
        {title}
      </span>

      {select_type.startsWith("multiple") ? (
        <MultiSelect
          options={data?.items}
          name={name}
          control={control}
          empty_message={intl.formatMessage({ id: `empty-${state}` })}
          selectedState={selectedState}
          setSelectedAction={setSelectedAction}
          required={required}
          select_type={select_type}
          page={page}
        />
      ) : (
        <CustomSelect
          options={data?.items}
          isIcon={isIcon}
          type={state}
          name={name}
          control={control}
          empty_message={intl.formatMessage({ id: `empty-${state}` })}
          required={required}
          page={page}
        />
      )}

      {errors?.message && (
        <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
      )}
    </label>
  );
}
