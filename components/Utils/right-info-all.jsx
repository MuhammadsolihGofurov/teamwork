import { BioInfoUrl } from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";
import { NextLink } from ".";
import { RightTaskProcessBar } from "./details";

export default function RightInfoAll({ page, status }) {
  if (page == "orders/agreement/view") {
    return (
      <Wrapper>
        <InfoBox />
        <RightTaskProcessBar status={status}/>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <InfoBox />
    </Wrapper>
  );
}

export const Wrapper = ({ children }) => {
  return (
    <div className="w-full 2xl:flex hidden 2xl:w-[23%] flex-col gap-5">
      {children}
    </div>
  );
};

export const InfoBox = () => {
  const intl = useIntl();

  const lists = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Portfolio" }),
      url: "portfolio",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Bio" }),
      url: BioInfoUrl,
    },
  ];

  return (
    <div className="p-5 rounded-lg border border-bg-3 bg-white flex flex-col gap-3 min-h-[235px] justify-between">
      <h3 className="text-base font-medium text-primary">
        {intl.formatMessage({ id: "Tavsiya qilamiz!" })}
      </h3>
      <p className="text-sm font-normal text-primary">
        {intl.formatMessage({
          id: "Profilingiz ma’lumotlari to’liq to’ldiring va buyurtmachilar uchun eng faol mutaxassisga aylaning, buyurtmalarni ketma ket qabul qiling!",
        })}
      </p>
      <ul>
        {lists?.map((list) => {
          return (
            <li
              key={list.id}
              className="text-main text-medium text-sm pb-1 list-inside list-disc"
            >
              <NextLink url={list.url}>{list.name}</NextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
