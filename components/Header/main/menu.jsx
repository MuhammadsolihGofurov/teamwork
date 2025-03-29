import { NextLink } from "@/components/Utils";
import { AddAdsUrl, ExpertsUrl, FaqsUrl, TasksUrl } from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";

export default function Menu({ type = "main" }) {
  const intl = useIntl();

  const data = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Topshiriqlar" }),
      url: TasksUrl,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Mutaxassislar" }),
      url: ExpertsUrl,
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "menuFAQ" }),
      url: FaqsUrl,
    },
  ];

  return (
    <div className={` gap-7 ${type == "header" ? "lg:flex hidden" : "flex"}`}>
      {data?.map((item, index) => {
        return (
          <NextLink
            url={item?.url}
            key={index}
            title={item?.name}
            className={
              "text-primary font-normal text-base hover:text-main transition-colors duration-200"
            }
          >
            {item?.name}
          </NextLink>
        );
      })}
    </div>
  );
}
