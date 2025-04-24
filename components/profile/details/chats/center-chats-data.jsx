import React from "react";
import { useIntl } from "react-intl";

export default function CenterChatsData({ data = "none" }) {
  const intl = useIntl();

  if (data === "none") {
    return (
      <div className="w-full h-full bg-white border border-bg-3 p-5 rounded-lg min-h-[710px] flex items-center justify-center text-center">
        <p className="text-lg text-primary font-normal text-opacity-60">{intl.formatMessage({ id: "Xabar yuborishni boshlash uchun suhbatni tanlang" })}</p>
      </div>
    );
  }
  return <div></div>;
}
