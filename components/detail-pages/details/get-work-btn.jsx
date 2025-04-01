import { WorkWithUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function GetWorkBtn({ id, user_id, full_name }) {
  const intl = useIntl();
  const router = useRouter();
  const { is_auth } = useSelector((state) => state.user);

  const handleGetWorkWithUser = () => {
    if (!is_auth) {
      toast.error(intl.formatMessage({ id: "error-access-with-auth-token" }));
      return;
    }
    const fullName = encodeURIComponent(full_name);

    router.push(
      `/${WorkWithUrl}?expert_id=${id}&full_name=${fullName}&user_id=${user_id}`
    );
  };

  return (
    <button
      type="button"
      onClick={() => handleGetWorkWithUser()}
      className="py-3 px-6 rounded-lg bg-some_btn font-medium text-primary sm:text-base text-sm  hover:bg-main hover:text-white transition-colors duration-150"
    >
      {intl.formatMessage({ id: "Ishga yo'llash" })}
    </button>
  );
}
