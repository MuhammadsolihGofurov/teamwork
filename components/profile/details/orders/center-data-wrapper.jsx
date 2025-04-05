import { MyOrderCardSkeleton } from "@/components/Skeleton/profile/orders";
import { Pagination } from "@/components/Utils";
import { MyOrderCard } from "@/components/cards";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function CenterDataWrapper({
  data,
  page = "orders/index",
  card_type,
}) {
  const { loading } = useSelector((state) => state.user);
  const router = useRouter();
  const currentPage = parseInt(router.query.page) || 1;
  const pageSize = 3;

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return data.slice(start, end);
  }, [data, currentPage]);

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <MyOrderCardSkeleton />
        <MyOrderCardSkeleton />
        <MyOrderCardSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {currentData?.map((item) => {
        return (
          <MyOrderCard data={item} key={item?.title} card_type={card_type} />
        );
      })}
      <Pagination
        data={{
          totalCount: data.length,
          currentPage: currentPage,
          pageCount: Math.ceil(data.length / pageSize),
        }}
        page="bg-white"
      />
    </div>
  );
}
