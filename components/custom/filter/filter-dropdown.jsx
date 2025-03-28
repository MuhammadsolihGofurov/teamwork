import { useParams } from "@/hooks/useParams";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";

export default function FilterDropdown({
  options = [],
  isIcon = false,
  type,
  name,
  empty_message,
  page,
  keyFor,
  title,
  handleChangeRouter = () => {},
}) {
  const [isOpen, setIsOpen] = useState(true);
  const dropdownRef = useRef(null);
  const { updateParams, checkParams } = useParams();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (page === "filter") {
    return (
      <div className="relative w-full" ref={dropdownRef}>
        <button
          type="button"
          className="flex items-center gap-2 px-5 font-semibold text-primary"
          onClick={toggleDropdown}
        >
          <span>{title || "Select"}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-200 ${
              isOpen ? "" : "rotate-180"
            }`}
          >
            <path
              d="M4 10L8 6L12 10"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div
          className={`w-full bg-bg-1 mt-2 rounded-lg overflow-hidden transition-all duration-300 ${
            isOpen ? "opacity-100 h-auto visible" : "invisible opacity-0 h-0"
          }`}
        >
          <div className="flex flex-col gap-2 p-4">
            {options.length === 0 ? (
              <p className="text-gray-500 text-center">
                {empty_message || "No options available"}
              </p>
            ) : (
              options.map((option) => (
                <label
                  key={option?.id}
                  htmlFor={option?.id}
                  className="checkbox__item flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded relative"
                >
                  <input
                    type="radio"
                    id={option?.id}
                    name={keyFor}
                    checked={checkParams(keyFor, option?.value)}
                    onChange={() => updateParams(keyFor, option?.value)}
                    className="hidden opacity-0 peer cursor-pointer"
                  />
                  <div className="w-5 h-5 flex items-center justify-center border-2 rounded-md border-bg-4 peer-checked:border-main peer-checked:bg-main checkbox__icon after:opacity-0 peer-checked:after:opacity-100 transition"></div>
                  <span className="checkbox__text peer-checked:text-main font-medium  text-primary">
                    {option.name}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return <div>FilterDropdown</div>;
}
