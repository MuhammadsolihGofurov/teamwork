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
import {
  CenterAgreementCreate,
  CenterAgreementView,
  CenterDataWrapper,
  CenterMyTaskDetails,
} from "./details/orders";
import { Pagination } from "../Utils";
import { CenterSavedData } from "./details/saved";
import { CenterRatesData } from "./details/rates";
import { CenterChatsData } from "./details/chats";

export default function CenterInfoProfile({
  page = "",
  tabsMenu,
  isMobile = false,
  tabsMenuCounts,
  data,
  card_type,
  tabsMenuQuery,
  pageDetails,
  pagination,
  method,
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
        <CenterDataWrapper data={data} page={page} card_type={card_type} />
      </CenterInfoWrapper>
    );
  }

  if (page === "orders/details") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs
          data={tabsMenu}
          tabsMenuCounts={tabsMenuCounts}
          tabsMenuQuery={tabsMenuQuery}
        />
        <CenterMyTaskDetails
          data={data}
          pageDetails={pageDetails}
          pagination={pagination}
        />
      </CenterInfoWrapper>
    );
  }

  if (page === "orders/agreement/create") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs
          data={tabsMenu}
          tabsMenuCounts={tabsMenuCounts}
          tabsMenuQuery={tabsMenuQuery}
        />
        <CenterAgreementCreate data={data} type={page} method={method} />
      </CenterInfoWrapper>
    );
  }

  if (page === "orders/agreement/view") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs
          data={tabsMenu}
          tabsMenuCounts={tabsMenuCounts}
          tabsMenuQuery={tabsMenuQuery}
        />
        <CenterAgreementView data={data} type={page} method={method} />
      </CenterInfoWrapper>
    );
  }

  if (page === "saved") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs data={tabsMenu} tabsMenuCounts={tabsMenuCounts} />
        <CenterSavedData
          pageDetails={pageDetails}
          data={data}
          pagination={pagination}
        />
      </CenterInfoWrapper>
    );
  }

  if (page === "rates") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs data={tabsMenu} tabsMenuCounts={tabsMenuCounts} />
        <CenterRatesData
          pageDetails={pageDetails}
          data={data}
          pagination={pagination}
        />
      </CenterInfoWrapper>
    );
  }

  if (page === "chats") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <CenterChatsData data={data}/>
      </CenterInfoWrapper>
    );
  }

  if (page === "my-vacancy/index") {
    return (
      <CenterInfoWrapper isMobile={isMobile}>
        <PaymentBox />
        <MenuTabs data={tabsMenu} tabsMenuCounts={tabsMenuCounts} />
        <CenterDataWrapper data={data} page={page} card_type={card_type} />
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
