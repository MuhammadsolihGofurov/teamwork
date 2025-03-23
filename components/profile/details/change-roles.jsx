import { CUSTOMER, EXPERT } from "@/utils/data";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function ChangeRoles() {
  const intl = useIntl();
  const { user_info } = useSelector((state) => state.user);

  const roles = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Ish beruvchi" }),
      code: CUSTOMER,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Mutaxassis" }),
      code: EXPERT,
    },
  ];

  return (
    <div className="grid grid-cols-2 w-full rounded-lg overflow-hidden m-1 mt-0">
      {roles?.map((role) => {
        return (
          <button
            type="button"
            className={`p-2 font-medium text-sm ${
              user_info?.type?.value == role?.code ? "bg-main bg-opacity-15 text-main" : "bg-bg-2 text-primary"
            }`}
            key={role?.name}
          >
            {role?.name}
          </button>
        );
      })}
    </div>
  );
}
