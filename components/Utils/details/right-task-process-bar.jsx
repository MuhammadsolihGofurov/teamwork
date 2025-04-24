import React from "react";
import { useIntl } from "react-intl";

export default function RightTaskProcessBar({
  status = "EMPLOYER_GUARANTEED_THE_PAYMENT",
}) {
  const intl = useIntl();
  const data = [
    {
      id: 1,
      status: "EMPLOYER_SENT_ORDER_TO_EXPERT",
      title: "Shartlarni kelishish",
      body: "Buyurtmachi buyurtmani tasdiqlash uchun mutaxassisga jo'natdi",
    },
    {
      id: 2,
      status: "EMPLOYER_GUARANTEED_THE_PAYMENT",
      title: "To'lovni kafolatlash",
      body: "Buyurtmachi to'lovni kafolatladi",
    },
    {
      id: 3,
      status: "ORDER_IN_PROGRESS",
      title: "Buyurtma bajarilmoqda",
      body: "Buyurtma mutaxassis tomonidan bajarilmoqda.",
    },
    {
      id: 4,
      status: "WAITING_EMPLOYER_ACCEPT_ORDER",
      title: "Buyurtmani tasdiqlash",
      body: "Buyurtmachi buyurtmani qabul qilib olishi kutilmoqda.",
    },
    {
      id: 5,
      status: "ACCEPTED_ORDER_BY_EMPLOYER",
      title: "Buyurtma qabul qilindi",
      body: "Buyurtma buyurtmachi tomonidan qabul qilindi.",
    },
  ];

  const currentIndex = data.findIndex((item) => item.status === status);

  return (
    <div className="mt-14 p-5 rounded-lg border border-bg-3 bg-white flex flex-col gap-3">
      <h3 className="text-base font-medium text-primary">
        {intl.formatMessage({ id: "Buyurtma holati" })}
      </h3>
      <div className="flex flex-col gap-6">
        {data?.map((item, index) => {
          const isBeforeOrCurrent = index <= currentIndex;
          const isBeforeOrCurrentIcon = index < currentIndex;

          return (
            <div
              className={`${
                isBeforeOrCurrent ? "bg-bg-2" : "bg-white"
              } rounded-lg px-3 py-4 flex flex-col gap-2 border border-bg-2 relative`}
              key={item.status}
            >
              <ul>
                <li className="text-sm text-main font-semibold list-inside list-disc">
                  {item.title}
                </li>
              </ul>
              <p className="text-sm text-primary">{item.body}</p>
              <div
                className={`${
                  isBeforeOrCurrentIcon
                    ? "text-main"
                    : "text-primary text-opacity-10"
                } absolute -bottom-6 left-2/4 -translate-x-2/4 `}
              >
                <svg
                  width="10"
                  height="20"
                  viewBox="0 0 10 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5" cy="10" r="2" fill="currentColor" />
                  <circle cx="5" cy="10" r="4.5" stroke="currentColor" />
                  <path d="M5 0V5.00191" stroke="currentColor" />
                  <path d="M5 15V20.0019" stroke="currentColor" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
