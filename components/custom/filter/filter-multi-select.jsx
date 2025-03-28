import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntl } from "react-intl";
import { authAxios } from "@/utils/axios";
import { debounce } from "lodash";
import { useParams } from "@/hooks/useParams";
import { useRouter } from "next/router";

export default function FilterMultiSelect({
  options = [],
  empty_message,
  isIcon = false,
  name,
  keyFor,
  title,
}) {
  const intl = useIntl();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { updateParams, checkParams } = useParams();

  // API dan qidirish
  const fetchOptions = useCallback(
    debounce(async (query) => {
      try {
        const response = await authAxios.post("/skill/search", { name: query });
        setFilteredOptions(response?.data?.data || []);
      } catch (error) {
        console.error("Skill search error:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (router.query.skill_ids && options.length > 0) {
      const selectedIds = router.query.skill_ids
        .split(",")
        .map((id) => id.trim());

      const selectedItems = options.filter((option) =>
        selectedIds.includes(option.id.toString())
      );

      setSelectedOptions(selectedItems);
    }
  }, [options]);

  useEffect(() => {
    if (search) {
      fetchOptions(search);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, options]);

  // Dropdown tashqariga bosganda yopiladi
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  // Elementni tanlash yoki o‘chirish
  const toggleSelect = (option) => {
    updateParams("skill_ids", option.id);
    setSelectedOptions((prev) => {
      let updatedOptions;

      if (prev.some((o) => o.id === option.id)) {
        updatedOptions = prev.filter((o) => o.id !== option.id);
      } else {
        updatedOptions = [...prev, option];
      }

      return updatedOptions;
    });
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="relative w-full">
        <button
          type="button"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full bg-bg-1 text-primary rounded-lg py-3 px-3 min-h-12 max-h-12"
        >
          <span className="flex items-center gap-2 pointer-events-none">
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
          </span>
          <span>
            <input
              type="text"
              name={name}
              placeholder={title}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none border-none h-full absolute py-3 min-h-12 max-h-12 px-9  top-0 left-0 rounded-lg"
            />
          </span>
          <span>
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

        {/* Dropdown list */}
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
                key={option.id}
                onClick={() => toggleSelect(option)}
                className={`p-2 hover:bg-gray-100 flex items-center gap-2 transition-colors text-primary duration-200 rounded-md cursor-pointer text-start ${
                  selectedOptions.some((o) => o.id === option.id)
                    ? "bg-main bg-opacity-15 font-medium"
                    : ""
                }`}
              >
                {option.name}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Tanlangan elementlar */}
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-3">
          {selectedOptions.map((option) => (
            <button
              type="button"
              key={option.id}
              onClick={() => toggleSelect(option)}
              className="flex items-center gap-2 bg-main bg-opacity-10 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-red-200"
            >
              {option.name}
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1L1 9M1 1L9 9"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
