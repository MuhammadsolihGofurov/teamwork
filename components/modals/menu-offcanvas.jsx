import { setToggleMenuOffcanvas } from "@/redux/slice/settings";
import {
  AddAdsUrl,
  ExpertsUrl,
  FaqsUrl,
  OffersSecurityUrl,
  OffersTermsUrl,
  SearchOrders,
  TasksUrl,
} from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { NextLink } from "../Utils";
import { Lang } from "../Header/components";

export default function MenuOffcanvas() {
  const router = useRouter();
  const intl = useIntl();
  const { menuOffcanvas } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setToggleMenuOffcanvas());
  };

  const menuLinks = [
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

  const detailsLinks = [
    {
      id: 1,
      name: intl.formatMessage({ id: "addAd" }),
      url: AddAdsUrl,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Oferta shartlari" }),
      url: OffersTermsUrl,
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Buyurtmalarni qidirish" }),
      url: TasksUrl,
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Tez-tez so'raladigan savollar" }),
      url: FaqsUrl,
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "Mutaxassislar" }),
      url: ExpertsUrl,
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "Bitim xavfsizligi" }),
      url: OffersSecurityUrl,
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-primary bg-opacity-40 transition-opacity duration-200 ${
        menuOffcanvas
          ? "opacity-100 visible z-[1001]"
          : "opacity-0 invisible z-[-1]"
      }`}
      onClick={() => handleToggle()}
    >
      <div
        className={`w-[320px] p-5 bg-white flex flex-col transition-all duration-150 h-screen overflow-y-scroll scroll__none ${
          menuOffcanvas
            ? "translate-x-0 opacity-100 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex w-full justify-end">
          <button type="button" onClick={() => handleToggle()}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#364749"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* lang */}
        <LinksWrapper title={intl.formatMessage({ id: "Til" })}>
          <Lang type="offcanvas" isOffcanvas/>
        </LinksWrapper>

        {/* menu */}
        <LinksWrapper title={intl.formatMessage({ id: "Menu" })}>
          {menuLinks?.map((item) => {
            return (
              <NextLink
                url={item?.url}
                key={item?.id + item?.name}
                className={`text-primary font-base`}
                onClick={() => handleToggle()}
              >
                {item?.name}
              </NextLink>
            );
          })}
        </LinksWrapper>

        {/* details links */}
        <LinksWrapper title={intl.formatMessage({ id: "Foydali sahifalar" })}>
          {detailsLinks?.map((item) => {
            return (
              <NextLink
                url={item?.url}
                key={item?.id + item?.name}
                className={`text-primary font-base`}
                onClick={() => handleToggle()}
              >
                {item?.name}
              </NextLink>
            );
          })}
        </LinksWrapper>
      </div>
    </div>
  );
}

export const LinksWrapper = ({ title, children }) => {
  return (
    <div className="flex flex-col items-start pt-5 gap-3">
      <div className="w-full flex items-center gap-2">
        <h5 className="text-sm text-primary font-medium text-opacity-60">
          {title}
        </h5>
        <span className="w-full h-[1px] bg-bg-3  flex-1"></span>
      </div>
      {children}
    </div>
  );
};
