import React from "react";
import { useIntl } from "react-intl";

export default function SearchTerms({ isMobileVersion = false }) {
  const intl = useIntl();
  return (
    <div
      className={`w-full sm:w-1/4 relative ${
        isMobileVersion ? "border-bg-3" : "lg:border-transparent"
      }   border bg-white p-1 rounded-full min-h-14 max-h-14 flex flex-row flex-1 sm:flex-auto`}
    >
      <input
        type="text"
        name="search"
        title="search"
        id="search"
        className="w-full max-h-14 rounded-full px-10 placeholder:text-sm font-medium"
        placeholder={intl.formatMessage({ id: "search-terms" })}
      />

      <button
        type="button"
        className="text-sm px-5 rounded-full bg-main border border-main hover:text-main hover:bg-white transition-colors duration-200 text-white text-center"
      >
        {intl.formatMessage({ id: "Qidiruv" })}
      </button>

      {/* absolute */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-2/4 -translate-y-2/4 left-5 "
      >
        <path
          d="M15.75 15.75L11.25 11.25M12.75 7.5C12.75 10.3995 10.3995 12.75 7.5 12.75C4.60051 12.75 2.25 10.3995 2.25 7.5C2.25 4.60051 4.60051 2.25 7.5 2.25C10.3995 2.25 12.75 4.60051 12.75 7.5Z"
          stroke="#222222"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
