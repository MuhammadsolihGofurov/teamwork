import { NextLink } from "@/components/Utils";
import React from "react";

export default function MainBars() {
  return (
    <div className="bg-bg-2 rounded-full pt-[1px] pr-[1px] px-[1px] pl-3 flex items-center gap-2">
      <button
        type="button"
        className="w-6 h-6 flex items-center justify-center"
      >
        <svg
          width="16"
          height="11"
          viewBox="0 0 16 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 11V9.16667H16V11H0ZM0 6.41667V4.58333H16V6.41667H0ZM0 1.83333V0H16V1.83333H0Z"
            fill="#222222"
          />
        </svg>
      </button>
      <div className="min-w-9 min-h-9 bg-white rounded-full">
        <NextLink url={"login"}>
          <span className="w-9 h-9 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 15C1 13.9391 1.42143 12.9217 2.17157 12.1716C2.92172 11.4214 3.93913 11 5 11H13C14.0609 11 15.0783 11.4214 15.8284 12.1716C16.5786 12.9217 17 13.9391 17 15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17H3C2.46957 17 1.96086 16.7893 1.58579 16.4142C1.21071 16.0391 1 15.5304 1 15Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M9 7C10.6569 7 12 5.65685 12 4C12 2.34315 10.6569 1 9 1C7.34315 1 6 2.34315 6 4C6 5.65685 7.34315 7 9 7Z"
                stroke="#222222"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </NextLink>
      </div>
    </div>
  );
}
