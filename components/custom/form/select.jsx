import React from "react";
import { useIntl } from "react-intl";
import CustomSelect from "./details/custom-select";
import { useFetchData } from "@/hooks/useFetchData";
import { useSelector } from "react-redux";

export default function SelectInput({
  name,
  title,
  page,
  errors,
  isIcon,
  control,
}) {
  const intl = useIntl();
  const { country_id, region_id } = useSelector((state) => state.settings);

  const endpoints = {
    country: "/country/list",
    region: `/region/list?country_id=${country_id}`,
    district: `/district/list?region_id=${region_id}`,
  };

  const { data, isLoading, error } = useFetchData(endpoints[page]);

  return (
    <label className="flex flex-col gap-2" htmlFor={name}>
      <span className="text-sm font-normal text-primary pl-6">{title}</span>

      <CustomSelect
        options={data?.items}
        isIcon={isIcon}
        type={page}
        name={name}
        control={control}
        empty_message={intl.formatMessage({ id: `empty-${page}` })}
      />

      {errors?.message && (
        <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
      )}
    </label>
  );
}
