import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { useIntl } from "react-intl";
import "lightgallery/css/lightgallery.css";
import { formatDateForCard, thousandSeperate } from "@/utils/funcs";

const LightGallery = dynamic(() => import("lightgallery/react"), {
  ssr: false,
});

export default function OrderDetailBox({ data }) {
  const intl = useIntl();
  return (
    <div className="flex flex-col gap-0 w-full">
      <div className="py-6 px-5 rounded-t-lg bg-some_btn ">
        <h2 className="text-primary font-medium text-xl">{data?.title}</h2>
      </div>
      <div className="px-5 py-7 bg-some_btn bg-opacity-5 flex flex-col gap-5 rounded-b-lg">
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <p className="text-sm text-primary font-medium">
            #{data?.speciality?.name}
          </p>
          <p className="text-sm text-primary font-medium">
            #{data?.speciality?.parent?.name}
          </p>
        </div>
        <p className="text-primary text-base sm:text-lg">{data?.more_info}</p>
        {data?.attachments?.length > 0 ? (
          <div className="flex flex-row gap-2 flex-wrap gallery">
            <LightGallery>
              {data?.attachments?.map((item) => {
                return (
                  <a
                    href={item?.path}
                    className="full__image w-20 h-20 rounded-lg border border-bg-3 hover:border-main transition-colors duration-150 cursor-pointer flex"
                    key={item?.name}
                  >
                    <Image
                      src={item?.path}
                      width={0}
                      height={0}
                      layout="responsive"
                      className="w-full h-full object-cover"
                    />
                  </a>
                );
              })}
            </LightGallery>
          </div>
        ) : (
          <></>
        )}
        <div className="flex items-center gap-x-5 gap-y-2 flex-wrap">
          <p className="text-base text-primary font-medium">№{data?.id}</p>
          <div className="flex items-center gap-1">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 18V16.3333C2.5 15.4493 2.85119 14.6014 3.47631 13.9763C4.10143 13.3512 4.94928 13 5.83333 13H9.16667C10.0507 13 10.8986 13.3512 11.5237 13.9763C12.1488 14.6014 12.5 15.4493 12.5 16.3333V18M13.3333 3.10834C14.0503 3.29192 14.6859 3.70892 15.1397 4.2936C15.5935 4.87827 15.8399 5.59736 15.8399 6.3375C15.8399 7.07765 15.5935 7.79674 15.1397 8.38141C14.6859 8.96609 14.0503 9.38309 13.3333 9.56667M17.5 18V16.3334C17.4958 15.5977 17.2483 14.884 16.7961 14.3037C16.3439 13.7234 15.7124 13.3089 15 13.125M10.8333 6.33333C10.8333 8.17428 9.34095 9.66667 7.5 9.66667C5.65905 9.66667 4.16667 8.17428 4.16667 6.33333C4.16667 4.49238 5.65905 3 7.5 3C9.34095 3 10.8333 4.49238 10.8333 6.33333Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="flex-1 text-primary text-sm font-medium">
              {intl.formatMessage({ id: "Berilgan takliflar" })}:{" "}
              {data?.count_of_offer}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0003 12.166C10.9208 12.166 11.667 11.4198 11.667 10.4993C11.667 9.57887 10.9208 8.83268 10.0003 8.83268C9.07985 8.83268 8.33366 9.57887 8.33366 10.4993C8.33366 11.4198 9.07985 12.166 10.0003 12.166Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.3337 10.4993C16.1112 14.3885 13.3337 16.3327 10.0003 16.3327C6.66699 16.3327 3.88949 14.3885 1.66699 10.4993C3.88949 6.61018 6.66699 4.66602 10.0003 4.66602C13.3337 4.66602 16.1112 6.61018 18.3337 10.4993Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="flex-1 text-primary text-sm font-medium">
              {intl.formatMessage({ id: "Ko’rishlar" })}: {data?.count_of_view}
            </span>
          </div>
        </div>
        <div className="w-full h-[1px] bg-bg-3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* soha */}
          {data?.speciality ? (
            <div className="flex items-start gap-2">
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5 9.5C14.9477 9.5 14.5 9.05228 14.5 8.5C14.5 7.94772 14.9477 7.5 15.5 7.5C16.0523 7.5 16.5 7.94772 16.5 8.5C16.5 9.05228 16.0523 9.5 15.5 9.5Z"
                    stroke="#121212"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 7V10.859C20 11.396 19.787 11.911 19.407 12.291L11.291 20.407C11.103 20.5951 10.8797 20.7443 10.634 20.846C10.3883 20.9478 10.125 21.0002 9.859 21.0002C9.59305 21.0002 9.3297 20.9478 9.08399 20.846C8.83829 20.7443 8.61504 20.5951 8.427 20.407L3.593 15.573C3.40493 15.385 3.25574 15.1617 3.15396 14.916C3.05217 14.6703 2.99978 14.407 2.99978 14.141C2.99978 13.875 3.05217 13.6117 3.15396 13.366C3.25574 13.1203 3.40493 12.897 3.593 12.709L11.71 4.593C12.0896 4.2135 12.6043 4.00021 13.141 4H17C17.7956 4 18.5587 4.31607 19.1213 4.87868C19.6839 5.44129 20 6.20435 20 7Z"
                    stroke="#121212"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col text-sm  text-primary flex-1">
                <h5 className="font-normal">
                  {intl.formatMessage({ id: "Soha" })}:
                </h5>
                <h6 className="font-semibold">
                  {data?.speciality?.parent?.name} / {data?.speciality?.name}
                </h6>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* muddat */}
          <div className="flex items-start gap-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.205 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H7C6.46957 5 5.96086 5.21071 5.58579 5.58579C5.21071 5.96086 5 6.46957 5 7V11H21M6 14V18H2M6 14C8.20914 14 10 15.7909 10 18C10 20.2091 8.20914 22 6 22C3.79086 22 2 20.2091 2 18M6 14C3.79086 14 2 15.7909 2 18M9 3V7M17 3V7"
                  stroke="#121212"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col text-sm  text-primary flex-1">
              <h5 className="font-normal">
                {intl.formatMessage({ id: "Bajarilish muddati" })}:
              </h5>
              <h6 className="font-semibold">
                {data?.inability_to_dead_line
                  ? intl.formatMessage({ id: "Kelishilgan holda" })
                  : formatDateForCard(data?.dead_line)}
              </h6>
            </div>
          </div>
          {/* summa */}
          <div className="flex items-start gap-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H5.99M18 12H17.99M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12ZM19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6Z"
                  stroke="#121212"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col text-sm  text-primary flex-1">
              <h5 className="font-normal">
                {intl.formatMessage({ id: "Taklif etilayotgan narx" })}:
              </h5>
              <h6 className="font-semibold">
                {data?.inability_to_price ? (
                  intl.formatMessage({ id: "Kelishilgan holda" })
                ) : (
                  <>
                    {thousandSeperate(data?.budget)}{" "}
                    {intl.formatMessage({ id: "so'm" })}
                  </>
                )}
              </h6>
            </div>
          </div>
          {/* shikoyat */}
          <div className="flex items-start gap-2">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3V7C10 7.26522 9.89464 7.51957 9.70711 7.70711C9.51957 7.89464 9.26522 8 9 8H5M10 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V8M10 3L5 8M12 11V17M15 14H9"
                  stroke="#121212"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col text-sm  text-primary flex-1">
              <h5 className="font-normal">
                {intl.formatMessage({ id: "Shikoyat yo’llash" })}:
              </h5>
              <div className="flex items-center text-some_red gap-1 font-semibold">
                <button type="button" className="hover:text-main">
                  {intl.formatMessage({ id: "Buyurtmachiga" })}
                </button>
                |{" "}
                <button type="button" className="hover:text-main">
                  {intl.formatMessage({ id: "Moderatorga" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
