import React from "react";
import { ExpertPriceBox, ExpertTabItems, PictureBox } from "./details";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";

export default function ExpertDetail({ data }) {
  const router = useRouter();
  const { expert } = data;

  const { data: comments, isValidating } = useSWR(
    [
      `/comment/list?user_id=${data?.id}&expand=agreement,commentator,user&per-page=8`,
      router.locale,
    ],
    (url) =>
      fetcher(url, {
        headers: {
          "Accept-Language": router.locale,
        },
      })
  );

  return (
    <div className="bg-white sm:border sm:border-bg-3 flex flex-col rounded-xl sm:p-7 lg:p-12 gap-8">
      <PictureBox
        type="experts"
        image={expert?.photo?.path}
        is_online={data?.is_online}
        title={expert?.full_name}
        time_since_join={expert?.timeSinceJoin}
        is_pro={expert?.level_of_expert}
        rate={expert?.rate}
        specialities={expert?.specialitySets}
        id={expert?.id}
        is_favorite={data?.is_favourite}
        comments_count={comments?.data?.items?.length}
      />
      <ExpertPriceBox
        hourly_salary={expert?.hourly_salary}
        total_count={expert?.taskSummary?.total_count}
        id={expert?.id}
        full_name={expert?.full_name}
        user_id={data?.id}
      />
      <ExpertTabItems
        about={expert?.necessary_information}
        comments={comments?.data?.items}
      />
    </div>
  );
}
