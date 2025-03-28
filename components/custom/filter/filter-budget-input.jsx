import { useParams } from "@/hooks/useParams";
import React from "react";
import { useIntl } from "react-intl";

export default function FilterBudgetInput() {
  const intl = useIntl();
  const { checkParams, updateParams, findParams } = useParams();

  return (
    <div className="grid grid-cols-2 gap-1">
      <div className="relative">
        <input
          type="number"
          name="budget_from"
          value={findParams("budget_from") ?? ""}
          onChange={(e) => updateParams("budget_from", e.target.value)}
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
          value={findParams("budget_to") ?? ""}
          onChange={(e) => updateParams("budget_to", e.target.value)}
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
