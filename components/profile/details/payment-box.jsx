import { PaymentBoxSkeleton } from "@/components/Skeleton/profile";
import { useModal } from "@/context/modal-provider";
import { thousandSeperate } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";

export default function PaymentBox({ isMobile = false }) {
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const { showModal } = useModal();

  if (loading) {
    return <PaymentBoxSkeleton />;
  }

  return (
    <div
      className={`bg-white border border-bg-3 rounded-lg ${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col gap-5 pt-5 sm:pt-8 pb-1 w-full`}
    >
      <div className="flex flex-col items-start justify-between px-5 sm:pl-10 sm:pr-7 gap-4">
        {/* money box */}
        <div className="flex justify-between items-start w-full gap-x-1 gap-y-3 xs:flex-row flex-col">
          <div className="flex flex-col pl-4 sm:pl-0">
            <h4 className="text-lg font-medium text-primary">
              {intl.formatMessage({ id: "Balans" })}:
            </h4>
            <p className="text-sm font-normal text-primary">
              {intl.formatMessage({
                id: "Ko’rsatilgan online xizmatlar summasi",
              })}
            </p>
          </div>
          <div className="flex gap-1 w-full sm:w-auto">
            <div className="flex items-center gap-3 py-3 px-5 rounded-full border border-bg-3 sm:w-auto w-full sm:min-w-[200px] min-h-14 max-h-14 flex-1">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="6"
                  y="3"
                  width="22"
                  height="22"
                  rx="3"
                  fill="#98BE00"
                />
                <path
                  d="M4.66602 7.00033C4.66602 6.38149 4.91185 5.78799 5.34943 5.35041C5.78702 4.91282 6.38051 4.66699 6.99935 4.66699H18.666C18.9754 4.66699 19.2722 4.78991 19.491 5.0087C19.7098 5.22749 19.8327 5.52424 19.8327 5.83366V9.33366L22.166 14.0003V10.5003C22.166 10.1909 22.0431 9.89416 21.8243 9.67537C21.6055 9.45658 21.3088 9.33366 20.9994 9.33366H6.99935C6.38051 9.33366 5.78702 9.08783 5.34943 8.65024C4.91185 8.21266 4.66602 7.61916 4.66602 7.00033ZM4.66602 7.00033V21.0003C4.66602 21.6192 4.91185 22.2127 5.34943 22.6502C5.78702 23.0878 6.38051 23.3337 6.99935 23.3337H20.9994C21.3088 23.3337 21.6055 23.2107 21.8243 22.992C22.0431 22.7732 22.166 22.4764 22.166 22.167V18.667M23.3327 14.0003V18.667H18.666C18.0472 18.667 17.4537 18.4212 17.0161 17.9836C16.5785 17.546 16.3327 16.9525 16.3327 16.3337C16.3327 15.7148 16.5785 15.1213 17.0161 14.6837C17.4537 14.2462 18.0472 14.0003 18.666 14.0003H23.3327Z"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="flex-1">
                {user_info?.balance ? thousandSeperate(user_info?.balance) : 0}
              </span>
            </div>
            <button
              type="button"
              className="min-h-14 max-h-14 w-14 rounded-full flex items-center justify-center border border-bg-3 hover:border-main transition-colors duration-200 group "
              onClick={() => showModal("payment")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00065 3.33301V12.6663M3.33398 7.99967H12.6673"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-main transition-colors duration-200"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* coin box */}
        <div className="flex justify-between items-start w-full gap-x-1 gap-y-3 xs:flex-row flex-col">
          <div className="flex flex-col pl-4 sm:pl-0">
            <h4 className="text-lg font-medium text-primary">
              {intl.formatMessage({ id: "Tangalari" })}:
            </h4>
            <p className="text-sm font-normal text-primary">
              {intl.formatMessage({
                id: "Ko’rsatilgan online xizmatlar summasi",
              })}
            </p>
          </div>
          <div className="flex gap-1">
            <div className="flex items-center gap-3 py-3 px-5 rounded-full border border-bg-3 min-w-[120px] min-h-14 max-h-14">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="6" width="22" height="22" rx="11" fill="#FFDB5A" />
                <path
                  d="M17.2667 10.5C17.0553 10.1334 16.7483 9.83112 16.3783 9.62561C16.0084 9.42011 15.5896 9.31906 15.1667 9.3333H12.8333C12.2145 9.3333 11.621 9.57914 11.1834 10.0167C10.7458 10.4543 10.5 11.0478 10.5 11.6666C10.5 12.2855 10.7458 12.879 11.1834 13.3166C11.621 13.7541 12.2145 14 12.8333 14H15.1667C15.7855 14 16.379 14.2458 16.8166 14.6834C17.2542 15.121 17.5 15.7145 17.5 16.3333C17.5 16.9521 17.2542 17.5456 16.8166 17.9832C16.379 18.4208 15.7855 18.6666 15.1667 18.6666H12.8333C12.4104 18.6809 11.9916 18.5798 11.6217 18.3743C11.2517 18.1688 10.9447 17.8666 10.7333 17.5M14 7V9.33333M14 18.6667V21M24.5 14C24.5 19.799 19.799 24.5 14 24.5C8.20101 24.5 3.5 19.799 3.5 14C3.5 8.20101 8.20101 3.5 14 3.5C19.799 3.5 24.5 8.20101 24.5 14Z"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="flex-1">0</span>
            </div>
            <button
              type="button"
              className="min-h-14 max-h-14 w-14 rounded-full flex items-center justify-center border border-bg-3 hover:border-main transition-colors duration-200 group"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00065 3.33301V12.6663M3.33398 7.99967H12.6673"
                  stroke="#222222"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:stroke-main transition-colors duration-200"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="py-3 px-5 rounded-lg bg-main bg-opacity-10 text-main font-medium mx-1 border border-transparent hover:border-main transition-colors duration-200 sm:text-base text-sm flex items-center justify-center"
        onClick={() => showModal("money-withdraw")}
      >
        {intl.formatMessage({ id: "Pul yechish" })}
      </button>
    </div>
  );
}
