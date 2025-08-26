import {
  FilterBudgetRange,
  FilterDropdown,
  FilterMultiSelect,
  FilterSelect,
} from "@/components/custom/filter";
import { useFetchData } from "@/hooks/useFetchData";
import { setToggleFilterModalConfirm } from "@/redux/slice/settings";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

export default function LeftTasksFilter({
  className = "w-full flex flex-col gap-5",
  isCloseBtn = false,
  // handleToggle = () => {},
  isModal = false,
}) {
  const intl = useIntl();
  const router = useRouter();
  const { filterModalConfirm } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setToggleFilterModalConfirm());
  };

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
    <div
      id="left-experts-filter"
      className={`
        lg:w-[23%] fixed lg:relative top-0 left-0 w-full min-h-screen flex lg:bg-transparent bg-primary bg-opacity-10 items-start justify-end lg:opacity-100 lg:visible lg:z-0 ${
          filterModalConfirm
            ? "opacit-100 visible z-[1002]"
            : "opacity-0 invisible z-[-2]"
        } transition-opacity duration-150 `}
      onClick={() => handleToggle()}
    >
      <div
        className={`w-11/12 small:w-[300px] h-screen lg:h-auto flex flex-col gap-5 bg-white rounded-tl-xl rounded-bl-xl p-5 lg:p-0 overflow-y-scroll lg:overflow-visible scroll__none lg:opacity-100 lg:visible lg:z-0 lg:translate-x-0 ${
          filterModalConfirm
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        <FilterSelect
          options={specialities?.data?.items}
          isIcon
          type={"speciality"}
          name={"speciality"}
          empty_message={intl.formatMessage({ id: `empty-speciality` })}
          page={"filter"}
          keyFor="speciality_id"
          title={intl.formatMessage({ id: "Mutaxassislik bo'yicha" })}
          isModal={isModal}
        />
        <FilterMultiSelect
          options={skills?.data?.items}
          isIcon
          name={"skill_ids"}
          empty_message={intl.formatMessage({ id: `empty-skill_ids` })}
          page={"filter"}
          keyFor="skill_ids"
          title={intl.formatMessage({ id: "Konikmalar" })}
          isModal={isModal}
        />
        <FilterDropdown
          options={reytingData}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          name="expert_level"
          title={intl.formatMessage({ id: "Reyting" })}
          isModal={isModal}
        />
        <FilterDropdown
          options={experienceData}
          empty_message={intl.formatMessage({ id: `empty-others` })}
          page={"filter"}
          name="experience"
          title={intl.formatMessage({ id: "Platformadagi tajriba" })}
          isModal={isModal}
        />
        <button
          type="button"
          className="w-full lg:hidden flex items-center justify-center bg-main p-3 rounded-lg text-white font-medium"
          onClick={() => handleToggle()}
        >
          {intl.formatMessage({ id: "Filterlash" })}
        </button>
      </div>
    </div>
  );
}
