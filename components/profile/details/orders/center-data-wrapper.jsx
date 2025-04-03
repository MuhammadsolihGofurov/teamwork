import { MyOrderCard } from "@/components/cards";
import React from "react";

export default function CenterDataWrapper({
  data,
  page = "orders/index",
  card_type,
}) {
  return (
    <div className="flex flex-col gap-2">
      {data?.map((item) => {
        return (
          <MyOrderCard data={item} key={item?.title} card_type={card_type} />
        );
      })}
    </div>
  );
}
