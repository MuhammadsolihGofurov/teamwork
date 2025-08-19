import { PaymentCard } from "@/components/cards";
import { Pagination } from "@/components/Utils";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

export default function PaymentTable({ data, pagination }) {
  const intl = useIntl();
  const { loading } = useSelector((state) => state.user);
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton height={56} />
        <Skeleton height={56} />
        <Skeleton height={56} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {data?.length !== 0 ? (
        <div className="overflow-x-auto">
          <table className="sm:w-full w-[550px]">
            <tbody>
              {data?.map((item, index) => {
                return <PaymentCard data={item} key={item?.total + index} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-base text-primary font-normal text-center py-10">
          {intl.formatMessage({ id: "empty-payment" })}
        </p>
      )}
      <Pagination data={pagination} page="bg-white" />
    </div>
  );
}
