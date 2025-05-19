import { CUSTOMER, EXPERT } from "@/utils/data";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { StatusChangeBtn } from ".";
import { InfoTopSkeleton } from "@/components/Skeleton/profile";
import { toast } from "react-toastify";

export default function InfoTopBanner({ isMobile = false }) {
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const [changedStatus, setChangedStatus] = useState("");

  const roles = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Jismoniy shaxs" }),
      body: user_info?.full_name,
      role: CUSTOMER,
      isCorrect: false,
      isAccept: true,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Yuridik shaxs" }),
      body: intl.formatMessage({ id: "Qo’shish" }),
      role: CUSTOMER,
      isCorrect: false,
      isAccept: true,
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Mutaxassis" }),
      body: user_info?.full_name,
      role: EXPERT,
      isCorrect: user_info?.type?.value == EXPERT,
      isAccept: true,
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Jamoa" }),
      body: intl.formatMessage({ id: "Qo’shish" }),
      role: EXPERT,
      isCorrect: false,
      isAccept: false,
      assson: true,
    },
  ];

  const filteredRoles = roles?.filter(
    (item) => item.role == user_info?.type?.value
  );

  // Boshlang‘ich `isCorrect` ni set qilish
  useEffect(() => {
    const correctRole = filteredRoles.find((item) => item.isCorrect);
    if (correctRole) {
      setChangedStatus(correctRole.id);
    }
  }, [user_info]);

  if (loading) {
    return <InfoTopSkeleton />;
  }

  return (
    <div
      className={`bg-white border border-bg-3 rounded-lg ${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col gap-5 pt-5 sm:pt-8 pb-1 w-full`}
    >
      <div className="flex flex-col gap-1 px-5 sm:px-10">
        <h1
          className="text-lg sm:text-xl font-medium text-primary"
          role="heading"
        >
          {intl.formatMessage({ id: "Tizimga xush kelibsiz!" })}
        </h1>
        <p className="text-primary text-sm font-normal" role="body">
          {intl.formatMessage({
            id: "Marhamat profilingizni batafsil to’ldiring!",
          })}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 small:gap-5 px-5 sm:px-10">
        {filteredRoles?.map((item) => {
          return (
            <button
              type="button"
              role="button"
              onClick={() => {
                if (item.assson) {
                  toast.success(intl.formatMessage({ id: "Tez kunda" }));
                } else {
                  setChangedStatus(item.id);
                }
              }}
              key={item?.name}
              className={`flex ${
                changedStatus === item.id
                  ? "border-main font-semibold bg-main bg-opacity-10"
                  : "font-medium border-transparent bg-bg-2"
              } border-2 flex-col gap-0 text-start py-2 sm:py-3 px-3 sm:px-6 rounded-lg text-xs small:text-sm  text-primary `}
            >
              <span>{item?.name}</span>
              <span className="text-main sm:inline hidden">{item?.body}</span>
            </button>
          );
        })}
      </div>
      <StatusChangeBtn
        currentRole={filteredRoles?.find((item) => item?.id == changedStatus)}
      />
    </div>
  );
}
