import { BioInfoUrl } from "@/utils/router";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";
import { NextLink } from ".";
import { RightTaskProcessBar } from "./details";
import { useModal } from "@/context/modal-provider";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksDetailsSums } from "@/redux/slice/user";

export default function RightInfoAll({ page, status }) {
  if (page == "orders/agreement/view") {
    return (
      <Wrapper>
        <InfoBox />
        <RightTaskProcessBar status={status} />
      </Wrapper>
    );
  }

  if (page == "orders/details") {
    return (
      <Wrapper is_mobile={true}>
        <CountOfTaskView />
        <TasksDetailsModals />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <InfoBox />
    </Wrapper>
  );
}

export const Wrapper = ({ children, is_mobile = false }) => {
  return (
    <div
      className={`flex-col gap-5 ${
        is_mobile
          ? "sm:w-full md:w-[300px] 2xl:w-[23%] flex"
          : "w-full 2xl:flex hidden 2xl:w-[23%]"
      }`}
    >
      {children}
    </div>
  );
};

export const InfoBox = () => {
  const intl = useIntl();

  const lists = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Portfolio" }),
      url: "portfolio",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Bio" }),
      url: BioInfoUrl,
    },
  ];

  return (
    <div className="p-5 rounded-lg border border-bg-3 bg-white flex flex-col gap-3 min-h-[235px] justify-between">
      <h3 className="text-base font-medium text-primary">
        {intl.formatMessage({ id: "Tavsiya qilamiz!" })}
      </h3>
      <p className="text-sm font-normal text-primary">
        {intl.formatMessage({
          id: "Profilingiz ma’lumotlari to’liq to’ldiring va buyurtmachilar uchun eng faol mutaxassisga aylaning, buyurtmalarni ketma ket qabul qiling!",
        })}
      </p>
      <ul>
        {lists?.map((list) => {
          return (
            <li
              key={list.id}
              className="text-main text-medium text-sm pb-1 list-inside list-disc"
            >
              <NextLink url={list.url}>{list.name}</NextLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const TasksDetailsModals = () => {
  const intl = useIntl();
  const { showModal } = useModal();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasksDetailsSums());
  }, []);

  return (
    <div className="p-5 rounded-lg border border-bg-3 bg-white flex flex-col gap-3">
      <button
        type="button"
        onClick={() => showModal("task-fast-and-color")}
        className="flex items-start gap-2 hover:text-main text-primary transition-colors duration-150 text-start"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.9995 14C5.95873 14.5876 5.11716 15.4726 4.58266 16.5416C4.04816 17.6106 3.8451 18.8148 3.9995 20C5.18466 20.1544 6.38893 19.9513 7.45793 19.4168C8.52692 18.8823 9.41193 18.0408 9.9995 17M3.99951 13C5.7826 13.2119 7.44256 14.0175 8.71227 15.2872C9.98198 16.557 10.7876 18.2169 10.9995 20C11.8834 19.4904 12.6228 18.7638 13.1477 17.8889C13.6727 17.014 13.9658 16.0197 13.9995 15C15.6786 14.4093 17.1449 13.334 18.2129 11.91C19.2808 10.486 19.9026 8.77734 19.9995 7C19.9995 6.20435 19.6834 5.44129 19.1208 4.87868C18.5582 4.31607 17.7952 4 16.9995 4C15.2222 4.09691 13.5135 4.71867 12.0895 5.78665C10.6655 6.85464 9.5902 8.32089 8.99951 10C7.97977 10.0337 6.98547 10.3268 6.11058 10.8518C5.23568 11.3767 4.5091 12.1161 3.99951 13ZM15.9995 9C15.9995 9.55228 15.5518 10 14.9995 10C14.4472 10 13.9995 9.55228 13.9995 9C13.9995 8.44772 14.4472 8 14.9995 8C15.5518 8 15.9995 8.44772 15.9995 9Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="flex-1 text-sm lg:inline sm:hidden inline">
          {intl.formatMessage({ id: "“Tezkor” belgisi bilan belgilash" })}
        </span>
      </button>
      <button
        type="button"
        onClick={() => showModal("pin-to-top")}
        className="flex items-start gap-2 hover:text-main text-primary transition-colors duration-150 text-start"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 4.5L11 8.5L7 10L5.5 11.5L12.5 18.5L14 17L15.5 13L19.5 9M9 15L4.5 19.5M14.5 4L20 9.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="flex-1 text-sm lg:inline sm:hidden inline">
          {intl.formatMessage({
            id: "Ro'yxatning yuqorisida “Qatirib qo’yish”",
          })}
        </span>
      </button>
      <button
        type="button"
        onClick={() => showModal("priority-modal")}
        className="flex items-start gap-2 hover:text-main text-primary transition-colors duration-150 text-start"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 13V5M12 5L9 8M12 5L15 8M9 17H10M14 17H15M19 17H20M4 17H5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="flex-1 text-sm lg:inline sm:hidden inline">
          {intl.formatMessage({
            id: "Eng yuqoriga ko'tarish",
          })}
        </span>
      </button>
    </div>
  );
};

export const CountOfTaskView = () => {
  const { order_details } = useSelector((state) => state.myOrdersDetails);
  const intl = useIntl();

  return (
    <div className="p-5 rounded-lg border border-bg-3 bg-white flex flex-col gap-3">
      <p>
        {intl.formatMessage({ id: "Ko'rishlar" })}:{" "}
        {order_details?.count_of_view} ( {intl.formatMessage({ id: "bugun" })}{" "}
        {order_details?.count_of_view_to_day} {intl.formatMessage({ id: "ta" })}{" "}
        ){" "}
      </p>
    </div>
  );
};
