import React from "react";
import { useIntl } from "react-intl";
import CustomSelect from "./details/custom-select";
import MultiSelect from "./details/multi-select";
import { useFetchData } from "@/hooks/useFetchData";
import { useSelector } from "react-redux";
import {
  ENGLISH_LG,
  ID_CARD,
  PASSPORT,
  RUSSIAN_LG,
  UZBEK_LG,
} from "@/utils/data";

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
  isCollect = false,
  withState = "api",
  keyOption = "id",
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
    reason_lists: `/agreement/cancel-reason-list`,
    passport: [
      { id: 1, name: intl.formatMessage({ id: "ID Karta" }), value: ID_CARD },
      { id: 2, name: intl.formatMessage({ id: "Passport" }), value: PASSPORT },
    ],
    languages: [
      {
        id: 1,
        name: intl.formatMessage({ id: "O'zbek tili" }),
        value: UZBEK_LG,
      },
      {
        id: 2,
        name: intl.formatMessage({ id: "Rus tili" }),
        value: RUSSIAN_LG,
      },
      {
        id: 3,
        name: intl.formatMessage({ id: "Ingliz tili" }),
        value: ENGLISH_LG,
      },
    ],
    level_of_expert: [
      { id: 1, name: intl.formatMessage({ id: "Havaskor" }), value: "AMATEUR" },
      {
        id: 2,
        name: intl.formatMessage({ id: "Mutaxassis" }),
        value: "EXPERT",
      },
      { id: 3, name: intl.formatMessage({ id: "Profi" }), value: "PROFI" },
    ],
    degree: [
      {
        id: 1,
        name: intl.formatMessage({ id: "O'rta maxsus" }), // SCHOOL
        value: "1",
      },
      {
        id: 2,
        name: intl.formatMessage({ id: "O'rta ta'lim (litsey/kollej)" }), // HIGH_SCHOOL
        value:"2",
      },
      {
        id: 3,
        name: intl.formatMessage({ id: "Bakalavr" }), // BACHELOR
        value: "3",
      },
      {
        id: 4,
        name: intl.formatMessage({ id: "Magistratura" }), // MASTER
        value: "4",
      },
      {
        id: 5,
        name: intl.formatMessage({ id: "Doktorantura" }), // DOCTOR
        value: "5",
      },
    ],
  };

  const shouldFetch =
    select_type !== "multiple_without_api" &&
    withState !== "static" &&
    endpoints[state] !== undefined; // <-- `endpoints[state]` mavjudligini tekshiramiz

  const fallbackData =
    withState === "static"
      ? { items: endpoints?.[state] ?? [] } // <-- `undefined` bo‘lsa, bo‘sh array qaytaramiz
      : { items: speciality_current?.children ?? [] }; // <-- `speciality_current?.children` mavjudligini tekshiramiz

  const { data, isLoading, error } = shouldFetch
    ? useFetchData(
        endpoints[state], // <-- endi aniq URL borligini tekshirib chaqiramiz
        isAuth,
        isCollect,
        state
      )
    : {
        data: fallbackData, // <-- `fallbackData` ishlatamiz
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
          keyOption={keyOption}
        />
      )}

      {errors?.message && (
        <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
      )}
    </label>
  );
}
