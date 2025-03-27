import React from "react";

export default function FilterOpenBtn() {
  return (
    <button
      type="button"
      className="lg:hidden flex items-center justify-center h-14 w-14 rounded-full border border-bg-3"
    >
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.75 1H1.25M8.75 10H4.25M7.25 13H10.25M3.5 4H14M2 7H11"
          stroke="#222222"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
