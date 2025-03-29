import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";

export default function Advantages() {
  const intl = useIntl();
  const data = [
    {
      id: 1,
      name: intl.formatMessage({ id: "advTitle1" }),
      icon: "/images/adv-1.png",
      body: intl.formatMessage({ id: "advBody1" }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "advTitle2" }),
      icon: "/images/adv-2.png",
      body: intl.formatMessage({ id: "advBody2" }),
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "advTitle3" }),
      icon: "/images/adv-3.png",
      body: intl.formatMessage({ id: "advBody3" }),
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "advTitle4" }),
      icon: "/images/adv-4.png",
      body: intl.formatMessage({ id: "advBody4" }),
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "advTitle5" }),
      icon: "/images/adv-5.png",
      body: intl.formatMessage({ id: "advBody5" }),
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "advTitle6" }),
      icon: "/images/adv-6.png",
      body: intl.formatMessage({ id: "advBody6" }),
    },
    {
      id: 7,
      name: intl.formatMessage({ id: "advTitle7" }),
      icon: "/images/adv-7.png",
      body: intl.formatMessage({ id: "advBody7" }),
    },
    {
      id: 8,
      name: intl.formatMessage({ id: "advTitle8" }),
      icon: "/images/adv-8.png",
      body: intl.formatMessage({ id: "advBody8" }),
    },
  ];

  return (
    <div className="py-10 sm:py-20" id="advantages">
      <div className="container grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {data?.map((item) => {
          return (
            <div
              className="p-10 rounded-lg border flex flex-col items-center justify-start text-center text-primary border-primary border-opacity-10"
              key={item?.id}
            >
              <Image
                src={item?.icon}
                title={item?.name}
                alt={item?.name}
                loading="lazy"
                width={36}
                height={36}
                // layout="responsive"
              />
              <h6 className="pt-7 pb-3 font-semibold text-lg">{item?.name}</h6>
              <p className="font-normal">{item?.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
