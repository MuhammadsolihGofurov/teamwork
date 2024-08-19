import React from "react";
import { Button } from "../custom/button";
import { useIntl } from "react-intl";
import { NextLink } from "../Utils";
import { PersonImages } from "../custom";

export default function MainBanner() {
  const intl = useIntl();

  const images = [
    { id: 1, img: "/images/person.jpg", title: "Images 1" },
    { id: 2, img: "/images/person.jpg", title: "Images 2" },
    { id: 3, img: "/images/person.jpg", title: "Images 3" },
    { id: 4, img: "/images/person.jpg", title: "Images 4" },
    { id: 5, img: "/images/person.jpg", title: "Images 5" },
  ];

  return (
    <section
      id="banner"
      className="main__banner bg-bg-2 pt-[120px] pb-5 text-primary"
    >
      <div className="container">
        <div className="flex items-center justify-start gap-7">
          <h1 className="font-semibold text-4xl  w-5/12">
            Разместите свою работу, чтобы найти более дешевые, качественные и
            быстрые решения!
          </h1>
          <div className="flex flex-col gap-5 w-3/6">
            <p className="opacity-70 text-lg">
              На данный момент более 11305 специалистов в различных областях
              готовы помочь вам на нашей платформе.
            </p>
            <hr color="#000" />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <NextLink url={"login"}>
                  <Button state={"greenBtnHome"}>
                    {intl.formatMessage({ id: "orderBtn" })}
                  </Button>
                </NextLink>
                <NextLink url={"login"}>
                  <Button state={"darkBtnHome"}>
                    {intl.formatMessage({ id: "freelancerBtn" })}
                  </Button>
                </NextLink>
              </div>
              <PersonImages images={images} length={4} counter={"+11 301"}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
