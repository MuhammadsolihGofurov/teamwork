import React from "react";
import { NextLink } from "../Utils";

export default function Breadcrumbs({ data, isReturn = false }) {
  if (isReturn) {
    return (
      <div className="flex items-center gap-1 w-full sm:relative sm:top-0 fixed top-[75px] sm:py-0 py-4 sm:bg-transparent bg-white z-[99] sm:border-0 border-b border-black border-opacity-10 sm:px-0 px-5 group hover:text-main transition-colors duration-150">
        <NextLink
          url={data[0]?.url}
          className={"flex items-center gap-2 text-dark font-normal"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.16602 10H15.8327M4.16602 10L9.16602 15M4.16602 10L9.16602 5"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-main transition-colors duration-150"
            />
          </svg>

          {data[0]?.name}
        </NextLink>
      </div>
    );
  }

  return <div></div>;
}
