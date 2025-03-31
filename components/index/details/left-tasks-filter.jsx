import {
  FilterBudgetRange,
  FilterDropdown,
  FilterSelect,
} from "@/components/custom/filter";
import { useFetchData } from "@/hooks/useFetchData";
import { setToggleFilterModalConfirm } from "@/redux/slice/settings";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

export default function LeftTasksFilter({
  className = "w-full flex flex-col gap-5",
  isCloseBtn = false,
  // handleToggle = () => {},
  isModal = false,
}) {
  const intl = useIntl();
  const { filterModalConfirm } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setToggleFilterModalConfirm());
  };

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
    <div
      id="left-tasks-filter"
      className={`lg:w-2/6 2xl:w-[23%] fixed lg:relative top-0 left-0 w-full min-h-screen flex lg:bg-transparent bg-primary bg-opacity-10 items-start justify-end lg:opacity-100 lg:visible lg:z-0 ${
        filterModalConfirm
          ? "opacit-100 visible z-[1002]"
          : "opacity-0 invisible z-[-2]"
      } transition-opacity duration-150 `}
      onClick={() => handleToggle()}
    >
      <div
        className={`w-11/12 small:w-[300px] sm:w-full h-screen lg:h-auto  flex flex-col gap-5 bg-white rounded-tl-xl rounded-bl-xl p-5 lg:p-0 overflow-y-scroll lg:overflow-y-hidden scroll__none lg:opacity-100 lg:visible lg:z-0 lg:translate-x-0 ${
          filterModalConfirm
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        <FilterSelect
          options={data?.items}
          isIcon
          type={"speciality"}
          name={"speciality"}
          empty_message={intl.formatMessage({ id: `empty-speciality` })}
          page={"filter"}
          keyFor="speciality_id"
          title={intl.formatMessage({ id: "Kategoriyani belgilang" })}
          isModal={isModal}
        />
        <FilterBudgetRange
          options={budgetStatic}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          keyFor="budget"
          title={intl.formatMessage({ id: "Xizmat narxi bo'yicha" })}
          isModal={isModal}
        />
        <FilterDropdown
          options={othersData}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          name="other"
          title={intl.formatMessage({ id: "Qo'shimcha" })}
          isModal={isModal}
        />
        <button
          type="button"
          className="w-full sm:hidden flex items-center justify-center bg-main p-3 rounded-lg text-white font-medium"
          onClick={() => handleToggle()}
        >
          {intl.formatMessage({ id: "Filterlash" })}
        </button>
      </div>
    </div>
  );
}
