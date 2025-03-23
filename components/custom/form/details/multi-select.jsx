import { Controller } from "react-hook-form";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Tooltip } from "flowbite-react";
import { authAxios } from "@/utils/axios";
import { debounce } from "lodash";

export default function MultiSelect({
  options = [],
  empty_message,
  control,
  name,
  selectedState,
  setSelectedAction,
  required,
  select_type,
}) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  const fetchSkills = useCallback(
    debounce(async (query) => {
      try {
        const response = await authAxios.post("/skill/search", { name: query });
        setFilteredOptions(response?.data?.data || []);
      } catch (error) {
        console.error("Skill search error:", error);
      }
    }, 500), // 500ms kechikish
    []
  );

  useEffect(() => {
    if (select_type === "multiple_skill_ids") {
      if (search) {
        fetchSkills(search);
      } else {
        setFilteredOptions(options);
      }
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, select_type, options]);

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) 
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleSelect = (field, option) => {
    let updatedOptions = [...selectedState];
    if (updatedOptions.some((o) => o.id === option.id)) {
      updatedOptions = updatedOptions.filter((o) => o.id !== option.id);
    } else {
      updatedOptions.push(option);
    }
    dispatch(setSelectedAction(updatedOptions));
    field.onChange(updatedOptions.map((o) => o.id));
  };

  const removeOption = (field, option) => {
    let updatedOptions = selectedState.filter((o) => o.id !== option.id);
    dispatch(setSelectedAction(updatedOptions));
    field.onChange(updatedOptions.map((o) => o.id));
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      render={({ field }) => (
        <div>
          <div className="relative w-full">
            <button
              type="button"
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full bg-white text-primary rounded-full py-[27.5px] px-6"
            >
              <span className="flex-1">
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "Tanlang" })}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent outline-none border-none h-full absolute py-[18.5px] px-6 top-0 left-0 rounded-full"
                />
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
              ref={dropdownRef}
            >
              {filteredOptions.length === 0 ? (
                <p className="text-center py-4 text-sm text-gray-500">
                  {empty_message}
                </p>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    type="button"
                    key={option?.name + option?.id}
                    onClick={() => handleSelect(field, option)}
                    className={`p-2 hover:bg-gray-100 flex items-center gap-2 ${
                      selectedState.some((o) => o.id === option.id)
                        ? "bg-main bg-opacity-15 font-medium"
                        : ""
                    } transition-colors text-primary duration-200 rounded-md cursor-pointer text-start`}
                  >
                    {option.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {selectedState.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 pl-5">
              {selectedState.map((option) => (
                <Tooltip
                  key={option?.name + option.id}
                  placement={"bottom"}
                  content={intl.formatMessage({
                    id: "O'chirish uchun ustiga bosing",
                  })}
                >
                  <button
                    type="button"
                    onClick={() => removeOption(field, option)}
                    className="flex items-center bg-white px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-red-200"
                  >
                    {option.name}
                  </button>
                </Tooltip>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
}
