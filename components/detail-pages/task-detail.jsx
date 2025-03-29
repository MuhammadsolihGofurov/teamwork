import React from "react";
import { PartInfoBtn, PictureBox } from "./details";

export default function TaskDetail({ data = { owner: null } }) {
  const { owner } = data;

  return (
    <div className="bg-white sm:border sm:border-bg-3 flex flex-col gap-5 rounded-xl sm:p-7 lg:p-12">
      <PictureBox
        type="tasks"
        image={owner?.photo_url}
        is_online={owner?.is_online}
        title={owner?.full_name}
        time_since_join={owner?.employer?.timeSinceJoin}
      />
      <PartInfoBtn
        published_date={data?.created_at}
        id={data?.id}
        is_favorite={data?.is_favorite}
      />
    </div>
  );
}
