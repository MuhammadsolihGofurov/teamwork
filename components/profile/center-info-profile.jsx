import React from "react";
import {
  AdditionalInfoChanges,
  BioInfoChanges,
  InfoLegalChanges,
  InfoMainChanges,
  InfoPhysicalChanges,
  InfoTopBanner,
} from "./details/info";
import { MenuTabs, PaymentBox } from "./details";
import { useIntl } from "react-intl";
import { CenterDataWrapper } from "./details/orders";

export default function CenterInfoProfile({
  page = "",
  tabsMenu,
  isMobile = false,
  tabsMenuCounts,
  data,
  card_type
}) {
  const intl = useIntl();

  if (page === "info") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <InfoTopBanner />
        <MenuTabs data={tabsMenu} />
        <InfoMainChanges />
      </CenterInfoWrapper>
    );
  }

  if (page === "physical-info") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <InfoTopBanner />
        <MenuTabs data={tabsMenu} />
        <InfoPhysicalChanges />
      </CenterInfoWrapper>
    );
  }

  if (page === "legal-info") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <InfoTopBanner />
        <MenuTabs data={tabsMenu} />
        <InfoLegalChanges />
      </CenterInfoWrapper>
    );
  }

  if (page === "additional-info") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <InfoTopBanner />
        <MenuTabs data={tabsMenu} />
        <AdditionalInfoChanges />
      </CenterInfoWrapper>
    );
  }

  if (page === "bio-info") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <InfoTopBanner />
        <MenuTabs data={tabsMenu} />
        <BioInfoChanges />
      </CenterInfoWrapper>
    );
  }

  if (page === "tasks/index") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs data={tabsMenu} />
      </CenterInfoWrapper>
    );
  }

  if (page === "orders/index") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs data={tabsMenu} tabsMenuCounts={tabsMenuCounts} />
        <CenterDataWrapper data={data} page={page} card_type={card_type}/>
      </CenterInfoWrapper>
    );
  }

  return <CenterInfoWrapper></CenterInfoWrapper>;
}
// bitta wrapper olish va uni ichida bitta top uchun section bo'ladi qoganlari pagega qarab render qilinadi xuddi register-form kabi

export const CenterInfoWrapper = ({ children, isMobile }) => {
  return (
    <div
      id="center-info-profile"
      className={`w-full sm:w-4/6 2xl:w-[56%] ${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col gap-2`}
    >
      {children}
    </div>
  );
};
