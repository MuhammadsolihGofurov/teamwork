import React from "react";
import { useIntl } from "react-intl";

export default function GetWorkBtn() {
  const intl = useIntl();
  return (
    <button
      type="button"
      className="py-3 px-6 rounded-lg bg-some_btn font-medium text-primary sm:text-base text-sm  hover:bg-main hover:text-white transition-colors duration-150"
    >
      {intl.formatMessage({ id: "Ishga yo'llash" })}
    </button>
  );
}
