import {
  IndexExpertsSkeleton,
  IndexTasksSkeleton,
} from "@/components/Skeleton/index";
import { IndexExpertCard, IndexTaskCard } from "@/components/cards";
import { useParams } from "@/hooks/useParams";
import React from "react";
import { useIntl } from "react-intl";

export default function CenterData({
  all_data,
  loading,
  count,
  type = "tasks",
}) {
  const intl = useIntl();
  const { findParams } = useParams();
  const searchTerms = [
    "speciality_id",
    "budget_from",
    "budget_to",
    "other",
    "experience",
    "expert_level",
  ];
  const isSearchBox = searchTerms.some((term) => findParams(term));

  if (loading && type == "tasks") {
    return <IndexTasksSkeleton />;
  }

  if (loading && type == "experts") {
    return <IndexExpertsSkeleton />;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* <p>{intl.formatMessage({ id: "Qidiruv natijasi:" })} 19999 {intl.formatMessage({id: "ta e'lonlar"})}</p> */}

      {isSearchBox && (
        <p className="text-sm font-semibold text-primary text-opacity-40">
          {intl.formatMessage({ id: "Qidiruv natijasi:" })} {count}
        </p>
      )}
      <div className="flex flex-col w-full gap-2">
        {all_data?.length > 0 ? (
          all_data?.map((item) => {
            return type == "tasks" ? (
              <IndexTaskCard data={item} key={item?.id} />
            ) : (
              <IndexExpertCard data={item} key={item?.id} />
            );
          })
        ) : (
          <p className="text-primary text-center py-5 text-opacity-40">
            {intl.formatMessage({ id: "empty-tasks" })}
          </p>
        )}
      </div>
    </div>
  );
}
