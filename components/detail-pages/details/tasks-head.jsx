import React from "react";
import { useIntl } from "react-intl";

export default function TasksHead({ title, id }) {
  const intl = useIntl();
  return (
    <div className="bg-some_btn sm:bg-main sm:bg-opacity-5 rounded-t-xl sm:rounded-xl px-4 sm:px-5 py-5 sm:py-8 flex flex-col gap-5 sm:gap-8">
      <h4 className="text-xl sm:text-2xl font-medium text-primary">{title}</h4>
      <div className="flex gap-4">
        <button className="py-3 sm:py-4 px-7 bg-white sm:bg-some_btn text-primary font-medium rounded-lg hover:bg-main hover:text-white transition-colors duration-150">
          {intl.formatMessage({ id: "Taklif yuborish" })}
        </button>
        <button className="py-4 px-7 sm:block hidden bg-some_btn text-primary font-medium rounded-lg hover:bg-main hover:text-white transition-colors duration-150">
          {intl.formatMessage({ id: "O’xshash topshiriq qo’shish" })}
        </button>
      </div>
    </div>
  );
}
