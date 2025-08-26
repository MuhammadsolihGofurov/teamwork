import React from "react";
import { LeftExpertsFilter, LeftTasksFilter } from "../index/details";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { setToggleFilterModalConfirm } from "@/redux/slice/settings";

export default function FilterOffcanvas({ type = "tasks" }) {
  const intl = useIntl();
  const { filterModalConfirm } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setToggleFilterModalConfirm());
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full min-h-screen flex sm:hidden bg-primary bg-opacity-10 items-start justify-end ${
        filterModalConfirm
          ? "opacit-100 visible z-[1002]"
          : "opacity-0 invisible z-[-2]"
      } transition-opacity duration-150`}
      onClick={() => handleToggle()}
    >
      {type == "tasks" ? (
        <LeftTasksFilter
          className={`w-11/12 small:w-[300px] h-screen flex flex-col gap-5 bg-white rounded-tl-xl rounded-bl-xl p-5 overflow-y-scroll scroll__none  ${
            filterModalConfirm ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
          }`}
          isCloseBtn
          handleToggle={handleToggle}
          isModal
        />
      ) : (
        <LeftExpertsFilter
          className={`w-11/12 small:w-[300px] h-screen flex flex-col gap-5 bg-white rounded-tl-xl rounded-bl-xl p-5 overflow-y-scroll scroll__none  ${
            filterModalConfirm ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
          }`}
          isCloseBtn
          handleToggle={handleToggle}
          isModal
        />
      )}
    </div>
  );
}
