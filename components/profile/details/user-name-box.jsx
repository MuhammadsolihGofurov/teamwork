import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { ChangeRoles } from ".";
import { UserNameBoxSkeleton } from "@/components/Skeleton/profile";
import { EXPERT } from "@/utils/data";

export default function UserNameBox() {
  const { user_info, loading } = useSelector((state) => state.user);
  const router = useRouter();
  const userSinceJoin =
    user_info?.type?.value == EXPERT
      ? user_info?.expert?.timeSinceJoin
      : user_info?.employer?.timeSinceJoin;

  if (loading) {
    return <UserNameBoxSkeleton />;
  }

  return (
    <div className="relative z-0 bg-white w-full border hidden sm:flex flex-col gap-3 small:gap-5 border-bg-3 pt-5 rounded-lg">
      <div className="flex flex-col gap-1 px-6">
        <h3 className="text-base font-semibold text-primary leading-4 small:leading-5">
          {user_info?.full_name}
        </h3>
        <p className="text-primary text-sm">{user_info?.type?.name}</p>
        <p className="text-primary text-opacity-40 text-sm pt-3">
          {userSinceJoin}
        </p>
      </div>

      <div className="flex w-full">
        <ChangeRoles />
        {/* {router.pathname?.split("/")?.[2] === "info" ? (
          <ChangeRoles />
        ) : (
          <p className="pb-5 line-clamp-2 text-primary text-opacity-60 sm:hidden block">
            {user_info?.expert?.necessary_information}
          </p>
        )} */}
      </div>
    </div>
  );
}
