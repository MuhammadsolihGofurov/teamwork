import React from "react";
import { PartInfoBtn, PictureBox, TasksBody, TasksHead } from "./details";

export default function TaskDetail({ data = { owner: null } }) {
  const { owner } = data;

  return (
    <div className="bg-white sm:border sm:border-bg-3 flex flex-col rounded-xl sm:p-7 lg:p-12">
      <PictureBox
        type="tasks"
        image={owner?.photo_url}
        is_online={owner?.is_online}
        title={owner?.full_name}
        time_since_join={owner?.employer?.timeSinceJoin}
        is_pro={owner?.is_pro_account}
      />
      <PartInfoBtn
        type="tasks"
        published_date={data?.created_at}
        id={data?.id}
        is_favorite={data?.is_favorite}
      />
      <div className="flex flex-col sm:gap-5">
        <TasksHead title={data?.title} id={data?.id} />
        <TasksBody
          speciality_name={data?.speciality?.name}
          speciality_parent_name={data?.speciality?.parent?.name}
          more_info={data?.more_info}
          count_of_view={data?.count_of_view}
          count_of_offer={data?.count_of_offer}
          inability_to_dead_line={data?.inability_to_dead_line}
          dead_line={data?.dead_line}
          inability_to_price={data?.inability_to_price}
          budget={data?.budget}
          attachments={data?.attachments}
        />
      </div>
    </div>
  );
}
