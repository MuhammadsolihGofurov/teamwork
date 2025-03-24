import React from "react";
import { setToggleLogOutModalConfirm } from "@/redux/slice/settings";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import {
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { LoginUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function LogOutModal() {
  const { logOutModalConfirm } = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const intl = useIntl();
  const router = useRouter();

  const logOutFn = async () => {
    // setLoading(true);
    try {
      // Redux orqali user ma'lumotlarini tozalash

      // LocalStorage / cookies tozalash
      localStorage.removeItem(REGISTERAUTHKEY);
      localStorage.removeItem(REGISTERASUSERTYPE);
      localStorage.removeItem(REGISTERPHONENUMBER);

      toast.success(intl.formatMessage({ id: "success-log-out" }));

      // Login sahifasiga redirect qilish
      setTimeout(() => {
        router.push(`/${LoginUrl}`);
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // setLoading(false);
    }
  };

  const handleLogOut = () => {
    logOutFn();
    dispatch(setToggleLogOutModalConfirm());
  };

  const handleToggleModal = () => {
    dispatch(setToggleLogOutModalConfirm());
  };

  return (
    <div
      className={`${
        logOutModalConfirm
          ? "z-[1000] opacity-100 visible transition-all duration-150"
          : " z-[-1] opacity-0 invisible transition-all duration-150"
      } w-full h-screen bg-primary bg-opacity-15 fixed top-0 left-0 flex items-center justify-center`}
      onClick={() => handleToggleModal()}
    >
      <div
        className={`bg-white ${
          logOutModalConfirm
            ? " scale-100 opacity-100 visible transition-transform duration-150"
            : " scale-0 opacity-0 invisible transition-transform duration-150"
        } rounded-3xl px-5 pt-10 pb-7 border border-bg-2 w-11/12 xs:w-[400px] text-center relative z-0 `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* close button */}
        <button
          type="button"
          role="button"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:bg-bg-1 rounded-sm transition-colors duration-150"
          onClick={() => handleToggleModal()}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#364749"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <svg
          width="56"
          height="56"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <path
            d="M12 8H12.01M11 12H12V16H13M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
            stroke="#98BE00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="text-lg font-semibold text-primary pt-4 pb-2 leading-5">
          {intl.formatMessage({ id: "logOutModalTitle" })}
        </h3>
        <p className="text-sm font-normal text-opacity-65 text-primary">
          {intl.formatMessage({ id: "logOutModalBody" })}
        </p>
        <div className="flex gap-2 justify-center pt-5">
          <button
            type="button"
            role="button"
            onClick={() => handleLogOut()}
            className="px-5 py-2 w-[120px] bg-main font-medium text-white rounded-lg hover:bg-white border-2 border-main hover:text-main transition-colors duration-200"
          >
            {intl.formatMessage({ id: "Ha" })}
          </button>
          <button
            type="button"
            role="button"
            onClick={() => handleToggleModal()}
            className="px-5 py-2 w-[120px] bg-gray-400 font-medium text-white rounded-lg hover:bg-white border-2 border-gray-400 hover:text-gray-400 transition-colors duration-200"
          >
            {intl.formatMessage({ id: "Yo'q" })}
          </button>
        </div>
      </div>
    </div>
  );
}
