import React from "react";
import { useIntl } from "react-intl";

export default function ExpertBio({ about }) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4 text-primary border-b border-bg-3 pb-7 sm:pb-0 sm:border-transparent">
      <h3 className="sm:hidden block font-semibold text-lg">{intl.formatMessage({ id: "Bio" })}</h3>
      {about ? (
        <p className="font-normal">{about}</p>
      ) : (
        <p className="text-center text-sm text-opacity-70">
          {intl.formatMessage({ id: "Ma'lumotlar mavjud emas." })}
        </p>
      )}
    </div>
  );
}
