import { Pagination } from "@/components/Utils";
import { MyRateCard } from "@/components/cards";
import React from "react";
import { useIntl } from "react-intl";

export default function CenterRatesData({ pageDetails, data, pagination }) {
  const intl = useIntl();

  if (data?.length == 0) {
    return (
      <p className="text-base text-primary font-normal text-center py-10">
        {intl.formatMessage({ id: "empty-tasks" })}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => {
        return <MyRateCard data={item} key={item?.id} />;
      })}
      <Pagination data={pagination} page="bg-white" />
    </div>
  );
}
