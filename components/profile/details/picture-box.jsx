import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { ChangeRoles } from ".";
import { PictureBoxSkeleton } from "@/components/Skeleton/profile";
import { EXPERT } from "@/utils/data";
import { NextLink, Rates } from "@/components/Utils";
import { InfoEditUrl } from "@/utils/router";

export default function PictureBox({ isMobile = false }) {
  const { user_info, loading } = useSelector((state) => state.user);
  const router = useRouter();
  const userSinceJoin =
    user_info?.type?.value == EXPERT
      ? user_info?.expert?.timeSinceJoin
      : user_info?.employer?.timeSinceJoin;

  if (loading) {
    return <PictureBoxSkeleton />;
  }

  return (
    <div
      className={`relative z-0 bg-white w-full border ${
        isMobile ? "sm:hidden grid" : "sm:grid hidden"
      } items-center grid-cols-3 sm:grid-cols-1 gap-3 small:gap-5 border-bg-3 pt-4 sm:p-6 rounded-lg`}
    >
      <div className="flex items-center flex-col text-center gap-2 justify-center col-span-1 sm:col-span-1 sm:pl-0 pl-5">
        <Image
          src={
            (user_info?.photoUrl || user_info?.photo?.url) ??
            "/images/defaultAvatar.png"
          }
          title={user_info?.full_name}
          alt={"Profile image"}
          role="img"
          width={140}
          height={140}
          className="rounded-full object-cover bg-bg-2"
        />
        <p className="text-sm font-medium text-primary">
          {" "}
          {user_info?.rate || 0}
        </p>
        <Rates current_rate={user_info?.rate} isBig />
      </div>

      <div className="sm:hidden flex flex-col gap-1 col-span-2 sm:pr-0 pr-5">
        <h3 className="text-base small:text-lg font-semibold text-primary leading-4 small:leading-5">
          {user_info?.full_name}
        </h3>
        <p className="text-primary text-sm">{user_info?.type?.name}</p>
        <p className="text-primary text-opacity-40 text-sm pt-5">
          {userSinceJoin}
        </p>
      </div>

      <div className="sm:hidden flex w-full col-span-3">
        {router.pathname === "/profile/info" ? (
          <ChangeRoles />
        ) : (
          <p className="pb-5 px-5 line-clamp-2 text-primary text-opacity-60">
            {user_info?.expert?.necessary_information}
          </p>
        )}
      </div>

      <NextLink
        url={`${InfoEditUrl}`}
        type="button"
        className="absolute top-3 sm:top-5 right-3 sm:right-5 group"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-4 sm:h-4"
        >
          <g opacity="0.4" className="sm:opacity-40 opacity-100">
            <path
              d="M4.66602 4.66662H3.99935C3.64573 4.66662 3.30659 4.80709 3.05654 5.05714C2.80649 5.30719 2.66602 5.64633 2.66602 5.99995V11.9999C2.66602 12.3536 2.80649 12.6927 3.05654 12.9428C3.30659 13.1928 3.64573 13.3333 3.99935 13.3333H9.99935C10.353 13.3333 10.6921 13.1928 10.9422 12.9428C11.1922 12.6927 11.3327 12.3536 11.3327 11.9999V11.3333M10.666 3.33328L12.666 5.33328M13.5893 4.38995C13.8519 4.12739 13.9994 3.77127 13.9994 3.39995C13.9994 3.02863 13.8519 2.67251 13.5893 2.40995C13.3268 2.14738 12.9707 1.99988 12.5993 1.99988C12.228 1.99988 11.8719 2.14738 11.6093 2.40995L5.99935 7.99995V9.99995H7.99935L13.5893 4.38995Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:stroke-main transition-colors duration-150"
            />
          </g>
        </svg>
      </NextLink>
    </div>
  );
}
