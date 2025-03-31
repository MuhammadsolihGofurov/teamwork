import React from "react";
import { useIntl } from "react-intl";

export default function FeedbackBtn({ id, isMobile = false }) {
  const intl = useIntl();
  return (
    <>
      <div className="flex items-center gap-1 text-primary text-sm font-semibold">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${isMobile ? "sm:inline hidden" : ""}`}
        >
          <path
            d="M10.0002 6.66683H10.0085M9.16683 10.0002H10.0002V13.3335H10.8335M5.00016 3.3335H15.0002C15.9206 3.3335 16.6668 4.07969 16.6668 5.00016V15.0002C16.6668 15.9206 15.9206 16.6668 15.0002 16.6668H5.00016C4.07969 16.6668 3.3335 15.9206 3.3335 15.0002V5.00016C3.3335 4.07969 4.07969 3.3335 5.00016 3.3335Z"
            stroke="#121212"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="flex-1">
          {intl.formatMessage({ id: "Fors-major holatlarda" })}:
        </span>
      </div>
      <button
        type="button"
        className="text-some_red text-sm font-medium text-start"
      >
        {intl.formatMessage({ id: "Murojaat qoldiring" })}
      </button>
    </>
  );
}
