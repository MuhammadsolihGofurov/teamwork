import { Pagination } from "@/components/Utils";
import { IndexExpertCard } from "@/components/cards";
import React from "react";

export default function CenterSavedData({ pageDetails, data, pagination }) {
  if (pageDetails == "tasks") {
    return <p>Tasks</p>;
  }

  // pageDetails default experts ni qaytaryapti
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => {
        return <IndexExpertCard data={item} key={item?.id} />;
      })}
      <Pagination data={pagination} page="bg-white" />
    </div>
  );
}
