import { CUSTOMER } from "@/utils/data";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CustomerBtns } from "./customer";
import { setAgreementStatus } from "@/redux/slice/stages";

export default function MessageBtns({ stage, task_id, agreement, offer }) {
  const { current_user_type } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAgreementStatus(agreement));
  }, [offer]);

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

  return <MessageBtnsWrapper>EXPERT</MessageBtnsWrapper>;
}

export const MessageBtnsWrapper = ({ children }) => {
  return <div className="py-5 min-h-[60px] bg-gray-100 flex items-center justify-center">{children}</div>;
};
