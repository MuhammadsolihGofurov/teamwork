import React from "react";
import { useIntl } from "react-intl";
import { EduSlider } from "./details";

export default function ResumeAll() {
  const intl = useIntl();

  return (
    <div
      className={`bg-white flex flex-col items-start gap-6 pt-5 sm:p-8 rounded-lg sm:border border-bg-3`}
    >
      <EduSlider />
    </div>
  );
}
