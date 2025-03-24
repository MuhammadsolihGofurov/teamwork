import { NextLink } from "@/components/Utils";
import {
  ChatsUrl,
  LoginUrl,
  NotificationUrl,
  ProfileUrl,
} from "@/utils/router";
import React from "react";
import { useSelector } from "react-redux";
import ProfilePicture from "./profile-picture";

export default function ProfileBox() {
  const { is_auth } = useSelector((state) => state.user);
  const url = is_auth ? ProfileUrl : LoginUrl;
  const notification_url = is_auth ? NotificationUrl : LoginUrl;
  const chat_url = is_auth ? ChatsUrl : LoginUrl;


  return (
    <div
      className={`${
        is_auth ? "bg-bg-2 flex" : "sm:hidden flex"
      } rounded-full p-[3px] items-center gap-1`}
    >
      {is_auth ? (
        <div className={`flex items-center gap-1 bg-white p-1 rounded-full`}>
          <NextLink
            url={chat_url}
            type="button"
            className="w-9 h-9 sm:flex hidden items-center justify-center bg-bg-2 rounded-full relative z-0 hover:border-main border-transparent border transition-colors duration-200 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 9.00008C6.66667 10.6667 9.33333 10.6667 11 9.00008M11.868 11.528C11.868 11.528 11.9193 11.4913 12.0013 11.4286C13.23 10.4786 14 9.10198 14 7.56931C14 4.71198 11.3133 2.39331 8.00133 2.39331C4.688 2.39331 2 4.71198 2 7.56931C2 10.428 4.68667 12.6666 8 12.6666C8.28267 12.6666 8.74667 12.648 9.392 12.6106C10.2333 13.1573 11.4613 13.606 12.536 13.606C12.8687 13.606 13.0253 13.3326 12.812 13.054C12.488 12.6566 12.0413 12.0206 11.868 11.528Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-main transition-colors duration-200"
              />
            </svg>
            <span className="w-2 h-2 rounded-full bg-main absolute top-1 right-2"></span>
          </NextLink>
          <NextLink
            url={notification_url}
            type="button"
            className="w-9 h-9 flex items-center justify-center sm:bg-bg-2 rounded-full relative z-0 hover:border-main border-transparent border transition-colors duration-200 group"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.99984 11.3333V12C5.99984 12.5304 6.21055 13.0391 6.58562 13.4142C6.9607 13.7893 7.4694 14 7.99984 14C8.53027 14 9.03898 13.7893 9.41405 13.4142C9.78912 13.0391 9.99984 12.5304 9.99984 12V11.3333M6.6665 3.33333C6.6665 2.97971 6.80698 2.64057 7.05703 2.39052C7.30708 2.14048 7.64621 2 7.99984 2C8.35346 2 8.6926 2.14048 8.94265 2.39052C9.19269 2.64057 9.33317 2.97971 9.33317 3.33333C10.0988 3.69535 10.7514 4.25888 11.2212 4.96353C11.691 5.66818 11.9601 6.48738 11.9998 7.33333V9.33333C12.05 9.7478 12.1968 10.1447 12.4284 10.4921C12.66 10.8395 12.9699 11.1276 13.3332 11.3333H2.6665C3.0298 11.1276 3.33971 10.8395 3.5713 10.4921C3.80288 10.1447 3.94967 9.7478 3.99984 9.33333V7.33333C4.03954 6.48738 4.3087 5.66818 4.77847 4.96353C5.24824 4.25888 5.9009 3.69535 6.6665 3.33333Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-main transition-colors duration-200"
              />
            </svg>
            <span className="w-2 h-2 rounded-full bg-main absolute top-1 right-2"></span>
          </NextLink>
        </div>
      ) : (
        <></>
      )}
      <button
        type="button"
        className={`${is_auth ? "flex" : "sm:hidden flex"}`}
      >
        <NextLink url={url}>
          <ProfilePicture />
        </NextLink>
      </button>
    </div>
  );
}
