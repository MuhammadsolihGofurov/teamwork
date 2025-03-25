import React from "react";
import { InfoTopBanner } from "./details/info";

export default function CenterInfoProfile({ page = "" }) {
  if (page === "info") {
    return (
      <CenterInfoWrapper>
        <InfoTopBanner />
      </CenterInfoWrapper>
    );
  }

  return <CenterInfoWrapper></CenterInfoWrapper>;
}
// bitta wrapper olish va uni ichida bitta top uchun section bo'ladi qoganlari pagega qarab render qilinadi xuddi register-form kabi

export const CenterInfoWrapper = ({ children }) => {
  return (
    <div
      id="center-info-profile"
      className="w-full sm:w-4/6 2xl:w-3/5 flex flex-col gap-2"
    >
      {children}
    </div>
  );
};
