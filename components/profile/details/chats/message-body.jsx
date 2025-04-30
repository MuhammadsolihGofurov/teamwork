import { extractTime, groupMessagesByDate } from "@/utils/funcs";
import React from "react";
import { useSelector } from "react-redux";

export default function MessageBody({ messages = [], task_id }) {
  const { user_info } = useSelector((state) => state.user);

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="sm:p-5 h-[450px] sm:h-[490px] bg-white scroll__none flex flex-col items-start overflow-y-auto">
      {Object.entries(groupedMessages).map(([date, msgs, index]) => (
        <div key={date + index} className="w-full">
          <div className="text-center text-xs font-normal text-primary text-opacity-60 my-4">
            <span className="py-1 px-2 bg-opacity-5 bg-main rounded-full">
              {date}
            </span>
          </div>
          {msgs.map((item) => {
            const isState = user_info?.id == item?.sender_id;
            const isOwnerWrapper = isState ? "justify-end" : "justify-start";
            const isOwnerMessage = isState ? "bg-main bg-opacity-5" : "bg-bg-1";

            if (item?.type === "INFO") {
              return (
                <div className="w-full flex" key={item?.id}>
                  <div
                    className="border border-bg-3 bg-bg-1 w-full sm:w-[400px] rounded-lg flex flex-col items-start mb-5"
                    key={item?.id}
                  >
                    <div className="flex flex-col items-start gap-1 p-5">
                      <h4 className="text-primary text-sm">{item?.content}</h4>
                      <p className="text-main text-xs font-medium flex items-center gap-1 py-1 px-2 bg-white rounded-full">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.66667 5.33335H11.3333M4.66667 8.00002H11.3333M4.66667 10.6667H11.3333M3.33333 2.66669H12.6667C13.403 2.66669 14 3.26364 14 4.00002V12C14 12.7364 13.403 13.3334 12.6667 13.3334H3.33333C2.59695 13.3334 2 12.7364 2 12V4.00002C2 3.26364 2.59695 2.66669 3.33333 2.66669Z"
                            stroke="#98BE00"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        № {task_id}
                      </p>
                    </div>
                    {/* message button */}
                  </div>
                </div>
              );
            }

            return (
              <div
                className={`flex w-full pb-8 ${isOwnerWrapper}`}
                key={item?.id}
              >
                <div
                  className={`px-5 py-4 rounded-2xl ${isOwnerMessage} pr-8 flex flex-col gap-1 max-w-[400px] relative min-w-[120px]`}
                >
                  <h5 className="text-primary">{item?.content}</h5>
                  <p className="text-xs text-primary text-opacity-80">
                    {extractTime(item?.created_at)}
                  </p>

                  {!isState && (
                    <button type="button" className="absolute top-4 right-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.00004 8.66671L3.33337 6.00004M3.33337 6.00004L6.00004 3.33337M3.33337 6.00004H10.6667C11.374 6.00004 12.0522 6.28099 12.5523 6.78109C13.0524 7.28119 13.3334 7.95946 13.3334 8.66671C13.3334 9.37395 13.0524 10.0522 12.5523 10.5523C12.0522 11.0524 11.374 11.3334 10.6667 11.3334H10"
                          stroke="#222222"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}

                  {isState && item?.read ? (
                    <span className="absolute right-3 bottom-3">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.66671 8.00008L8.00004 11.3334L14.6667 4.66675M1.33337 8.00008L4.66671 11.3334M8.00004 8.00008L11.3334 4.66675"
                          stroke="#222222"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    <></>
                  )}

                  <div
                    className={`message__offer_shape w-5 h-5  absolute  ${
                      isState
                        ? "-bottom-5 rotate-180 right-3 bg-main bg-opacity-5"
                        : "-top-4 bg-bg-1"
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
