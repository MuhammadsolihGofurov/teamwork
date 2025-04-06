import { Pagination } from "@/components/Utils";
import { IndexExpertCard } from "@/components/cards";
import React from "react";

export default function CenterRatesData({ pageDetails, data, pagination }) {
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => {
        return <IndexExpertCard data={item} key={item?.id} />;
      })}
      <Pagination data={pagination} page="bg-white" />
    </div>
  );
}
