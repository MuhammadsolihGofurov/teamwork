import { NextLink } from "@/components/Utils";
import { ExpertsUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";

export default function ChangeLink() {
  const intl = useIntl();
  const router = useRouter();

  const data = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Topshiriqlar" }),
      url: "",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Mutaxassislar" }),
      url: ExpertsUrl,
    },
  ];

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center p-[3px] rounded-full lg:border-transparent border border-bg-3 bg-white">
        {data?.map((item) => {
          return (
            <NextLink
              url={item?.url}
              key={item?.name}
              className={`text-sm sm:text-base font-medium text-primary rounded-full hover:text-main transition-colors duration-150 px-2 py-[13px] ${
                router.pathname == `/${item?.url}` ? "bg-bg-2" : "bg-white"
              }`}
            >
              {item?.name}
            </NextLink>
          );
        })}
      </div>
      <button
        type="button"
        className="px-3 small:px-5 w-full sm:w-auto lg:w-14 h-14 rounded-full lg:border-transparent border border-bg-3 bg-white flex items-center justify-center text-sm gap-1 font-medium"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3.75V14.25M3.75 9H14.25"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="lg:hidden inline">
          {intl.formatMessage({ id: "Qo’shish" })}
        </span>
      </button>
    </div>
  );
}
