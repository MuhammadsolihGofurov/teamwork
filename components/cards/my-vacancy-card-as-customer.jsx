import { formatDateForCard, thousandSeperate } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";
import {} from "@/utils/data";
import { useSelector } from "react-redux";

// === type ===
// published => offers, experts, stops, deletes knopkalari bilan
// on_process => experts, docs, chats knopkalari bilan
// on_agreement => docs
// un_published => edits, deletes, publish knopkalari bilan
// archive => knopkalarsiz

export default function MyVacancyCardAsCustomer({ data, card_type = "archive" }) {
  const { current_user_type } = useSelector((state) => state.user);
  const intl = useIntl();
  let url = ``;

  //   if (current_user_type == EXPERT) {
  //     url = "#";
  //   } else {
  //     if (data?.count_of_offer > 0) {
  //       url = `${MyOrdersViewOffersUrl}?task_id=${data?.id}`;
  //     } else if (data?.count_of_candidate > 0) {
  //       url = `${MyOrdersViewExpertsUrl}?task_id=${data?.id}`;
  //     } else {
  //       url = `${MyOrdersViewIdUrl}?task_id=${data?.id}`;
  //     }
  //   }

  if (card_type === "MY_OFFERS_TO_ORDER") {
    return <div></div>;
  }

  return <div></div>;
}
