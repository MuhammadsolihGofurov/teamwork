import { useParams } from "@/hooks/useParams";
import React from "react";
import { useIntl } from "react-intl";

export default function FilterBudgetInput() {
  const intl = useIntl();
  const { checkParams, updateParams } = useParams();

  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="relative">
        <input
          type="number"
          name="budget_from"
          className="py-3 px-2 rounded-md border border-bg-3 bg-white w-full pr-10"
          placeholder="0.00"
        />
        <span className="absolute top-2/4 right-3 -translate-y-2/4 font-medium text-sm">
          {intl.formatMessage({ id: "budgetFrom" })}
        </span>
      </div>
      <div className="relative">
        <input
          type="number"
          name="budget_to"
          className="py-3 px-2 rounded-md border border-bg-3 bg-white w-full pr-10"
          placeholder="0.00"
        />
        <span className="absolute top-2/4 right-3 -translate-y-2/4 font-medium text-sm">
          {intl.formatMessage({ id: "budgetTo" })}
        </span>
      </div>
    </div>
  );
}
