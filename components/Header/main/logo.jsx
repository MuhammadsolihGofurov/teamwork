import React from "react";
import { Lang } from "../components";
import { useIntl } from "react-intl";
import { useRouter } from "next/router";
import { NextLink } from "@/components/Utils";

export default function LogoMain() {
  const intl = useIntl();
  const router = useRouter();

  const menu = [
    {
      id: 1,
      title: intl.formatMessage({ id: "menuProject" }),
      url: `projects`
    },
  ];

  return (
    <div className="flex items-center gap-10">
      <a href="/" title="Teamwork" className="block w-[125px] sm:w-[150px]">
        <img src="/images/logo.svg" alt="logo" title="logo" loading="lazy" />
      </a>
      <Lang />
      {menu?.map((link, index) => (
        <NextLink
          url={link?.url}
          key={index}
          className={`font-normal text-base leading-5 text-primary hover:text-main sm:block hidden`}
        >
          {link?.title}
        </NextLink>
      ))}
    </div>
  );
}
