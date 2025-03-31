import { setToggleMakeOfferModal } from "@/redux/slice/settings";
import { TasksCreateUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function TasksHead({ title, id }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { is_auth } = useSelector((state) => state.user);
  const router = useRouter();

  const handleMakeOfferModal = () => {
    dispatch(setToggleMakeOfferModal({ task_id: id }));
  };

  const handleCreateTasks = () => {
    if (!is_auth) {
      toast.error(intl.formatMessage({ id: "error-access-with-auth-token" }));
      return;
    }
    router.push(`/${TasksCreateUrl}`);
  };

  return (
    <div className="bg-some_btn sm:bg-main sm:bg-opacity-5 rounded-t-xl sm:rounded-xl px-4 sm:px-5 py-5 sm:py-8 flex flex-col gap-5 sm:gap-8">
      <h4 className="text-xl sm:text-2xl font-medium text-primary">{title}</h4>
      <div className="flex gap-4">
        <button
          className="py-3 sm:py-4 px-7 bg-white sm:bg-some_btn text-primary font-medium rounded-lg hover:bg-main hover:text-white transition-colors duration-150"
          onClick={() => handleMakeOfferModal()}
        >
          {intl.formatMessage({ id: "Taklif yuborish" })}
        </button>
        <button
          className="py-4 px-7 sm:block hidden bg-some_btn text-primary font-medium rounded-lg hover:bg-main hover:text-white transition-colors duration-150"
          onClick={() => handleCreateTasks()}
        >
          {intl.formatMessage({ id: "O’xshash topshiriq qo’shish" })}
        </button>
      </div>
    </div>
  );
}
