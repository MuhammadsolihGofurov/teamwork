import React from "react";
import { NextLink } from ".";
import { useRouter } from "next/router";

export default function LeftInfoAll({ data = [] }) {
  const router = useRouter();

  return (
    <div className="w-full 2xl:flex hidden 2xl:w-[23%] p-5 rounded-lg bg-white border border-bg-3  flex-col min-h-[320px]">
      {data?.map((item) => {
        return (
          <NextLink
            url={item?.url}
            key={item?.name}
            className={`py-4 px-5 rounded-lg  font-medium border border-transparent hover:border-main transition-colors duration-100  ${
              router.pathname === `/${item?.url}`
                ? "bg-main bg-opacity-5  text-main"
                : "text-primary "
            }`}
          >
            {item?.name}
          </NextLink>
        );
      })}
    </div>
  );
}
