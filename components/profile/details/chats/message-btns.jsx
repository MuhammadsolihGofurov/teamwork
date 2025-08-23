import { CUSTOMER, EXPERT } from "@/utils/data";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerBtns } from "./customer";
import { setAgreementStatus } from "@/redux/slice/stages";
import { ExpertBtns } from "./expert";

export default function MessageBtns({ stage, task_id, agreement, offer }) {
  const { current_user_type, accept_data } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.myChats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAgreementStatus({ agreement, offer }));
  }, [offer, accept_data, messages]);

  if (current_user_type === CUSTOMER) {
    return (
      <MessageBtnsWrapper>
        <CustomerBtns
          stage={stage}
          task_id={task_id}
          agreement={agreement}
          offer={offer}
        />
      </MessageBtnsWrapper>
    );
  }

  if (current_user_type === EXPERT) {
    return (
      <MessageBtnsWrapper>
        <ExpertBtns
          stage={stage}
          task_id={task_id}
          agreement={agreement}
          offer={offer}
        />
      </MessageBtnsWrapper>
    );
  }

  return null;
}

export const MessageBtnsWrapper = ({ children }) => {
  return (
    <div className="bg-gray-100 py-1 flex items-center justify-center gap-2 flex-wrap">
      {children}
    </div>
  );
};
