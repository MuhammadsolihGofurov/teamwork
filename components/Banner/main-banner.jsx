import React from "react";
import { useIntl } from "react-intl";
import { NextLink } from "../Utils";
import { PersonImages } from "../custom";
import { ChangeLink, FilterOpenBtn, SearchTerms } from "./details";

export default function MainBanner() {
  const intl = useIntl();

  const images = [
    { id: 1, img: "/images/person.png", title: "Images 1" },
    { id: 2, img: "/images/person.jpg", title: "Images 2" },
    { id: 3, img: "/images/person-1.png", title: "Images 3" },
    { id: 4, img: "/images/person-2.png", title: "Images 4" },
    { id: 5, img: "/images/person-3.png", title: "Images 5" },
    { id: 6, img: "/images/person-4.png", title: "Images 5" },
    { id: 7, img: "/images/person-5.png", title: "Images 5" },
    { id: 8, img: "/images/person-6.png", title: "Images 5" },
    { id: 9, img: "/images/person-7.png", title: "Images 5" },
    { id: 10, img: "/images/person-8.png", title: "Images 5" },
    { id: 11, img: "/images/person-9.png", title: "Images 5" },
  ];

  return (
    <section
      id="banner"
      className="main__banner lg:bg-bg-2 pt-14 sm:pt-20 md:pt-[120px] pb-3 2xl:mx-5 rounded-lg text-primary"
    >
      <div className="container">
        <div className="flex flex-col items-center justify-start gap-7">
          <div className="flex flex-col items-center justify-center gap-7 w-full">
            <h1 className="font-medium text-2xl sm:text-[40px] sm:leading-10 w-full 2xl:w-5/12 text-center">
              <span
                dangerouslySetInnerHTML={{
                  __html: intl.formatMessage({
                    id: "indexTitle",
                  }),
                }}
              />
            </h1>
            <NextLink
              url={""}
              className={
                "bg-main flex items-center justify-center py-3 sm:py-4 px-5 rounded-full text-white font-medium group hover:bg-white hover:text-main transition-colors duration-200 border border-transparent hover:border-main"
              }
            >
              <span>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 5V19M5.5 12H19.5"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-main transition-colors duration-200"
                  />
                </svg>
              </span>
              {intl.formatMessage({ id: "E'lon joylash" })}
            </NextLink>
            <div className="flex flex-col gap-5 w-full 2xl:w-5/12 ">
              <PersonImages images={images} length={11} counter={"+11 301"} />
            </div>
          </div>
          <div className="flex lg:flex-row flex-col items-end justify-start pt-20  w-full gap-y-5 gap-8">
            <div className="w-full lg:w-2/6 2xl:w-[23%]">
              <ChangeLink />
            </div>
            <div className="w-full lg:w-4/6 2xl:w-[54%] flex items-center justify-center gap-1">
              <SearchTerms />
              <FilterOpenBtn />
            </div>
            <div className="w-[23%] 2xl:block hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
