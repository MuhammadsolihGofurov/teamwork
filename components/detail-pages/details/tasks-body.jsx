import { formatDateForCard, thousandSeperate } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";

export default function TasksBody({
  speciality_name,
  speciality_parent_name,
  more_info,
  count_of_view,
  count_of_offer,
  inability_to_dead_line,
  dead_line,
  inability_to_price,
  budget,
}) {
  const intl = useIntl();
  return (
    <div className="flex flex-col gap-5 bg-main bg-opacity-5 sm:px-0 px-4 sm:pb-0 pb-10 sm:pt-0 pt-5 sm:bg-transparent rounded-b-xl">
      {speciality_name ? (
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-primary font-normal text-sm">#{speciality_name}</p>
          <p className="text-primary font-normal text-sm">
            #{speciality_parent_name}
          </p>
        </div>
      ) : (
        <></>
      )}
      <div
        className="text-primary text-lg"
        dangerouslySetInnerHTML={{ __html: more_info }}
      />
      <div className="flex items-center gap-5 flex-wrap">
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.5 17.5V15.8333C2.5 14.9493 2.85119 14.1014 3.47631 13.4763C4.10143 12.8512 4.94928 12.5 5.83333 12.5H9.16667C10.0507 12.5 10.8986 12.8512 11.5237 13.4763C12.1488 14.1014 12.5 14.9493 12.5 15.8333V17.5M13.3333 2.60834C14.0503 2.79192 14.6859 3.20892 15.1397 3.7936C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57765 15.5935 7.29674 15.1397 7.88141C14.6859 8.46609 14.0503 8.88309 13.3333 9.06667M17.5 17.5V15.8334C17.4958 15.0977 17.2483 14.384 16.7961 13.8037C16.3439 13.2234 15.7124 12.8089 15 12.625M10.8333 5.83333C10.8333 7.67428 9.34095 9.16667 7.5 9.16667C5.65905 9.16667 4.16667 7.67428 4.16667 5.83333C4.16667 3.99238 5.65905 2.5 7.5 2.5C9.34095 2.5 10.8333 3.99238 10.8333 5.83333Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-primary font-medium text-[15px]">
            {intl.formatMessage({ id: "Berilgan takliflar" })}:{count_of_offer}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.99984 11.6665C10.9203 11.6665 11.6665 10.9203 11.6665 9.99984C11.6665 9.07936 10.9203 8.33317 9.99984 8.33317C9.07936 8.33317 8.33317 9.07936 8.33317 9.99984C8.33317 10.9203 9.07936 11.6665 9.99984 11.6665Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18.3332 9.99984C16.1107 13.889 13.3332 15.8332 9.99984 15.8332C6.6665 15.8332 3.889 13.889 1.6665 9.99984C3.889 6.11067 6.6665 4.1665 9.99984 4.1665C13.3332 4.1665 16.1107 6.11067 18.3332 9.99984Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-primary font-medium text-[15px]">
            {intl.formatMessage({ id: "Ko’rishlar" })}:{count_of_view}
          </span>
        </div>
      </div>
      <div className="w-full h-[1px] bg-bg-3"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* soha */}
        {speciality_name ? (
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
                {speciality_parent_name} / {speciality_name}
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
              {inability_to_dead_line
                ? intl.formatMessage({ id: "Kelishilgan holda" })
                : formatDateForCard(dead_line)}
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
              {inability_to_price
                ? intl.formatMessage({ id: "Kelishilgan holda" })
                : thousandSeperate(budget)}{" "}
              {intl.formatMessage({ id: "so'm" })}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
