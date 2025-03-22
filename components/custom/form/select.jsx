import { Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import CustomSelect from "./details/custom-select";
import useSWR from "swr";
import { useRouter } from "next/router";
import fetcher from "@/utils/fetcher";
import { useFetchRegions } from "@/hooks/useFetchRegions";

export default function SelectInput({
  type,
  placeholder,
  name,
  title,
  required,
  register = () => {},
  validation,
  noSelected = false,
  page,
  errors,
  isIcon,
}) {
  const intl = useIntl();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(0);

  if (page === "country") {
    const { data: countries } = useSWR(
      ["/country/list", router.locale],
      (url) =>
        fetcher(url, {
          headers: {
            "Accept-Language": router.locale,
          },
        })
    );

    return (
      <label className="flex flex-col gap-2" htmlFor={name}>
        <span className="text-sm font-normal text-primary pl-6">{title}</span>

        <CustomSelect
          options={countries?.data?.items}
          isIcon={isIcon}
          setSelectedId={setSelectedId}
          empty_message={intl.formatMessage({ id: "empty-country" })}
        />

        {errors?.message && (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        )}
      </label>
    );
  }

  if (page === "region") {
    const { regions, isLoading, error } = useFetchRegions(selectedId);

    return (
      <label className="flex flex-col gap-2" htmlFor={name}>
        <span className="text-sm font-normal text-primary pl-6">{title}</span>

        <CustomSelect
          options={regions?.data?.items}
          isIcon={isIcon}
          setSelectedId={setSelectedId}
          empty_message={intl.formatMessage({ id: "empty-viloyat" })}
        />

        {errors?.message && (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        )}
      </label>
    );
  }

  return <div></div>;
}
