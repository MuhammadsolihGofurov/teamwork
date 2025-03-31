import React from "react";
import { useIntl } from "react-intl";

export default function ExpertComment({ comments }) {
  const intl = useIntl();
  return (
    <div className="flex flex-col gap-4 text-primary border-b border-bg-3 pb-7 sm:pb-0 sm:border-transparent">
      <h3 className="sm:hidden block font-semibold text-lg">
        {intl.formatMessage({ id: "Sharxlar" })}
      </h3>
      {comments?.length > 0 ? (
        <>
          <div className="flex flex-col gap-8 w-full md:w-3/4">
            {comments?.map((item) => {
              return (
                <div className="flex items-start gap-3" key={item?.title}>
                  <div className="w-14 h-14 rounded-full bg-main flex items-center justify-center text-xl">
                    👍🏻
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, index) => {
                        const filledStars = Math.floor(item?.rate || 0);
                        const isFilled = index < filledStars;
                        return (
                          <svg
                            key={index}
                            width="16"
                            height="16"
                            viewBox="0 0 12 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.99992 8.87498L2.91392 10.4975L3.50342 7.06098L1.00342 4.62748L4.45342 4.12748L5.99642 1.00098L7.53942 4.12748L10.9894 4.62748L8.48942 7.06098L9.07892 10.4975L5.99992 8.87498Z"
                              fill={isFilled ? "#98BE00" : "#DDDDDD"}
                              stroke={isFilled ? "#98BE00" : "#DDDDDD"}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        );
                      })}
                    </div>
                    <h2 className="text-lg sm:text-xl font-medium leading-6 sm:leading-7 w-full sm:w-11/12">
                      <span className="bg-selection transition-colors duration-200">
                        {item?.title}
                      </span>
                    </h2>
                    <p className="font-normal leading-5">{item?.more_info}</p>
                    <p className="text-primary font-normal text-opacity-50">
                      {item?.created_at}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {/* slider yasash kerak mobile version uchun */}
        </>
      ) : (
        <p className="text-center text-sm sm:text-base text-opacity-80 text-primary">
          {intl.formatMessage({ id: "Ma'lumotlar mavjud emas." })}
        </p>
      )}
    </div>
  );
}
