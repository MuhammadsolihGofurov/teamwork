import { IndexTaskCard } from "@/components/cards";
import React from "react";
import { useIntl } from "react-intl";

export default function CenterDataTasks({ all_data }) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-1">
      {/* <p>{intl.formatMessage({ id: "Qidiruv natijasi:" })} 19999 {intl.formatMessage({id: "ta e'lonlar"})}</p> */}
      <p className="text-base font-semibold text-primary text-opacity-40">
        {intl.formatMessage({ id: "Qidiruv natijasi:" })} {all_data?.length}
      </p>
      <div className="flex flex-col w-full gap-2">
        {all_data?.map((item) => {
          return <IndexTaskCard data={item} key={item?.id} />;
        })}
      </div>
    </div>
  );
}
