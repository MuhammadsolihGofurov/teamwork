import { Controller } from "react-hook-form";
import {
  setCountryId,
  setDistrictId,
  setRegionId,
  setSpecialityCurrent,
  setSpecialityIds,
} from "@/redux/slice/settings";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

export default function CustomSelect({
  options = [],
  isIcon = false,
  empty_message,
  type = "country",
  control,
  name,
  required,
  page,
  keyFor,
  title = "",
  handleChangeRouter = () => {},
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleClick = (field, option) => {
    // if (page !== "filter") {
    //   field.onChange(option.id);
    // }

    !keyFor ? field.onChange(option.id) : handleChangeRouter(option?.id);

    setSelectedOption(option);
    switch (type) {
      case "country":
        dispatch(setCountryId(option.id));
        break;
      case "region":
        dispatch(setRegionId(option.id));
        break;
      case "district":
        dispatch(setDistrictId(option.id));
        break;
      case "speciality":
        dispatch(setSpecialityCurrent(option));
        dispatch(setSpecialityIds([]));
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  if (page == "filter") {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-bg-1 text-primary rounded-lg p-3  min-h-12 max-h-12"
        >
          <span className="flex items-center gap-2">
            {isIcon && (
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.875 13.875L15.75 15.75M3 4.5H15M3 9H6M3 13.5H6M14.25 11.25C14.25 12.9069 12.9069 14.25 11.25 14.25C9.59315 14.25 8.25 12.9069 8.25 11.25C8.25 9.59315 9.59315 8.25 11.25 8.25C12.9069 8.25 14.25 9.59315 14.25 11.25Z"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {selectedOption
              ? selectedOption.name
              : title}
          </span>
          <span className="pointer-events-none">
            <svg
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transform transition-transform duration-150 ${
                isOpen ? "rotate-180" : ""
              }`}
            >
              <path
                d="M1 1L5 5L9 1"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <div
          className={`absolute w-full min-h-[40px] max-h-[200px] overflow-y-auto bg-white flex flex-col gap-1 top-full left-0 rounded-xl shadow_md p-3 mt-2 z-10  
          ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-3"
          } 
          transition-transform duration-150`}
        >
          {options.length === 0 ? (
            <p className="text-center py-4 text-sm text-gray-500">
              {empty_message}
            </p>
          ) : (
            options?.map((option) => (
              <button
                type="button"
                onClick={() => handleClick(false, option)}
                className={`p-2 hover:bg-gray-100 ${
                  selectedOption?.id === option.id
                    ? "bg-main bg-opacity-15 font-medium"
                    : ""
                } transition-colors text-primary duration-200 rounded-md cursor-pointer text-start`}
                key={option.id}
              >
                {option.name}
              </button>
            ))
          )}
        </div>

        {type === "speciality" && selectedOption && (
          <div className="flex flex-wrap gap-2 pt-3 text-sm">
            <p className="px-2 py-1 bg-main bg-opacity-10 rounded-md">
              {selectedOption?.name}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (page == "profile") {
    return (
      <Controller
        name={name}
        control={control}
        rules={{ required: required }}
        render={({ field }) => (
          <div>
            <div className="relative w-full" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full bg-bg-2 text-primary rounded-lg p-4 border border-bg-3 min-h-[58px] max-h-[58px]"
              >
                <span className="flex items-center gap-2">
                  {isIcon && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.875 13.875L15.75 15.75M3 4.5H15M3 9H6M3 13.5H6M14.25 11.25C14.25 12.9069 12.9069 14.25 11.25 14.25C9.59315 14.25 8.25 12.9069 8.25 11.25C8.25 9.59315 9.59315 8.25 11.25 8.25C12.9069 8.25 14.25 9.59315 14.25 11.25Z"
                        stroke="#222222"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {options.find((o) => o.id === field.value)?.name ??
                    intl.formatMessage({ id: "Tanlang" })}
                </span>
                <span className="pointer-events-none">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform duration-150 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="#222222"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              <div
                className={`absolute w-full min-h-[40px] max-h-[200px] overflow-y-auto bg-white flex flex-col gap-1 top-full left-0 rounded-xl shadow-md p-3 mt-2 z-10  
              ${
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-3"
              } 
              transition-transform duration-150`}
              >
                {options?.length === 0 ? (
                  <p className="text-center py-4 text-sm text-gray-500">
                    {empty_message}
                  </p>
                ) : (
                  <>
                    {options?.map((option, index) => (
                      <button
                        type="button"
                        onClick={() => handleClick(field, option)}
                        className={`p-2 hover:bg-gray-100 ${
                          field.value === option.id
                            ? "bg-main bg-opacity-15 font-medium"
                            : ""
                        } transition-colors text-primary duration-200 rounded-md cursor-pointer text-start`}
                        key={option.id}
                      >
                        {option.name}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>
            {type == "speciality" && selectedOption ? (
              <div className="flex flex-wrap gap-2 pt-3 text-sm">
                <p className="px-2 py-1 bg-bg-2 rounded-md">
                  {selectedOption?.name}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <div>
          <div className="relative w-full" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full bg-white text-primary rounded-full py-[18.5px] px-6"
            >
              <span className="flex items-center gap-2">
                {isIcon && (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.875 13.875L15.75 15.75M3 4.5H15M3 9H6M3 13.5H6M14.25 11.25C14.25 12.9069 12.9069 14.25 11.25 14.25C9.59315 14.25 8.25 12.9069 8.25 11.25C8.25 9.59315 9.59315 8.25 11.25 8.25C12.9069 8.25 14.25 9.59315 14.25 11.25Z"
                      stroke="#222222"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                {field.value
                  ? options.find((o) => o.id === field.value)?.name
                  : intl.formatMessage({ id: "Tanlang" })}
              </span>
              <span className="pointer-events-none">
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transform transition-transform duration-150 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M1 1L5 5L9 1"
                    stroke="#222222"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            <div
              className={`absolute w-full min-h-[40px] max-h-[200px] overflow-y-auto bg-white flex flex-col gap-1 top-full left-0 rounded-xl shadow-md p-3 mt-2 z-10  
              ${
                isOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-3"
              } 
              transition-transform duration-150`}
            >
              {options.length === 0 ? (
                <p className="text-center py-4 text-sm text-gray-500">
                  {empty_message}
                </p>
              ) : (
                <>
                  {options.map((option, index) => (
                    <button
                      type="button"
                      onClick={() => handleClick(field, option)}
                      className={`p-2 hover:bg-gray-100 ${
                        field.value === option.id
                          ? "bg-main bg-opacity-15 font-medium"
                          : ""
                      } transition-colors text-primary duration-200 rounded-md cursor-pointer text-start`}
                      key={option.id}
                    >
                      {option.name}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
          {type == "speciality" && selectedOption ? (
            <div className="flex flex-wrap gap-2 pt-3 pl-5 text-sm">
              <p className="px-2 py-1 bg-white rounded-md">
                {selectedOption?.name}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    />
  );
}
