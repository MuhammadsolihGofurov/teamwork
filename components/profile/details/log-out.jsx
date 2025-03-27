import { useModal } from "@/context/modal-provider";
import { RemvoeUserFullInfo } from "@/redux/slice/user";
import {
  PRIVATEAUTHKEY,
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { LoginUrl } from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function LogOut({ isMobile = false }) {
  const intl = useIntl();
  const router = useRouter();
  const { showModal } = useModal();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(RemvoeUserFullInfo());
    router.push(`/${LoginUrl}`);

    localStorage.removeItem(REGISTERAUTHKEY);
    localStorage.removeItem(REGISTERASUSERTYPE);
    localStorage.removeItem(REGISTERPHONENUMBER);
    localStorage.removeItem(PRIVATEAUTHKEY);

    toast.success(intl.formatMessage({ id: "success-log-out" }));
  };

  return (
    <button
      type="button"
      role="button"
      onClick={() =>
        showModal({
          title: "logOutModalTitle",
          message: "logOutModalBody",
          onConfirm: handleLogOut,
        })
      }
      className={`mt-10 hover:border-main hover:text-main group transition-colors duration-200 py-4 px-5 rounded-lg border border-bg-3 bg-white  items-center justify-center text-sm gap-1 text-primary cursor-pointer ${
        isMobile ? "flex sm:hidden" : "sm:flex hidden"
      }`}
    >
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.33333 5.83341V4.50008C9.33333 4.14646 9.19286 3.80732 8.94281 3.55727C8.69276 3.30722 8.35362 3.16675 8 3.16675H3.33333C2.97971 3.16675 2.64057 3.30722 2.39052 3.55727C2.14048 3.80732 2 4.14646 2 4.50008V12.5001C2 12.8537 2.14048 13.1928 2.39052 13.4429C2.64057 13.6929 2.97971 13.8334 3.33333 13.8334H8C8.35362 13.8334 8.69276 13.6929 8.94281 13.4429C9.19286 13.1928 9.33333 12.8537 9.33333 12.5001V11.1667M4.66667 8.50008H14M14 8.50008L12 6.50008M14 8.50008L12 10.5001"
          stroke="#222222"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-200 group-hover:stroke-main"
        />
      </svg>
      {intl.formatMessage({ id: "logOut" })}
    </button>
  );
}
