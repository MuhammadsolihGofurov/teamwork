import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";

export default function CustomSelect({
  options,
  isIcon = false,
  setSelectedId,
  empty_message
}) {
  const intl = useIntl();
  const [selectedOption, setSelectedOption] = useState({
    id: 0,
    name: intl.formatMessage({ id: "Tanlang" }),
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOption = (id, name) => {
    setSelectedOption({ id, name });
    setSelectedId(id);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full bg-white text-primary rounded-full py-4 px-6"
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
          {selectedOption?.name}
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
        className={`absolute w-full min-h-[40px] max-h-[200px] overflow-y-auto bg-white flex flex-col gap-1 top-full left-0 rounded-xl shadow-md p-3 mt-2 z-10  ${
          isOpen
            ? "opacity-100 visible translate-y-0 transition-transform duration-150"
            : "translate-y-3 opacity-0 invisible  transition-transform duration-150"
        }`}
      >
        {!options ? (
          <p className="text-center py-4 text-sm text-gray-500">{empty_message}</p>
        ) : (
          <>
            <button
              type="button"
              onClick={() =>
                handleOption(0, intl.formatMessage({ id: "Tanlang" }))
              }
              className="p-2 bg-gray-100 transition-colors duration-200 rounded-md cursor-pointer text-start"
            >
              {intl.formatMessage({ id: "Tanlang" })}
            </button>
            {options?.map((option, index) => (
              <button
                type="button"
                onClick={() => handleOption(option?.id, option?.name)}
                className={`p-2 hover:bg-gray-100 ${
                  selectedOption?.id === option?.id
                    ? "bg-main bg-opacity-15"
                    : ""
                } transition-colors text-primary duration-200 rounded-md cursor-pointer text-start`}
                key={option?.name + index}
              >
                {option?.name}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
