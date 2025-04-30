import React, { useEffect, useState } from "react";
import { LogOut, MenuLinksBox, PictureBox, UserNameBox } from "./details";
import { NextLink } from "../Utils";
import { SoloChatUrl } from "@/utils/router";
import { LeftInfoProfilePicture } from "./details/chats";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { EXPERT } from "@/utils/data";
import Skeleton from "react-loading-skeleton";

export default function LeftInfoProfile({
  isMobile = false,
  page = "default",
  chats = [],
}) {
  if (page === "chats") {
    return (
      <Wrapper>
        <ChatsLists chats={chats} />
      </Wrapper>
    );
  }

  return (
    <Wrapper isMobile={isMobile}>
      <UserNameBox />
      <MenuLinksBox />
      <LogOut />
    </Wrapper>
  );
}

export const Wrapper = ({ children, isMobile }) => {
  return (
    <div
      id="left-info-profile"
      className={`w-full sm:w-2/6 2xl:w-[21%] flex flex-col gap-2 `}
    >
      <PictureBox />
      {/* <UserNameBox /> */}
      {children}
    </div>
  );
};

export const ChatsLists = ({ chats }) => {
  const router = useRouter();
  const intl = useIntl();
  const { current_user_type } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [router.locale]);

  if (loading) {
    return (
      <div className="flex flex-col gap-0 bg-white rounded-lg sm:border border-bg-3 sm:p-2 text-sm sm:h-[462px] sm:overflow-y-auto scroll__none">
        <div className="flex items-center gap-2">
          <Skeleton width={40} height={40} circle/>
          <div className="flex flex-col w-full">
            <Skeleton height={14}/>
            <Skeleton height={10}/>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 bg-white rounded-lg sm:border border-bg-3 sm:p-2 text-sm sm:h-[462px] sm:overflow-y-auto scroll__none">
      {chats && chats?.length > 0 ? (
        chats?.map((item, index) => {
          const expert =
            current_user_type === EXPERT
              ? item?.creator
              : item?.partner?.expert;
          const isActive = router.query.chat_id == item?.id;

          return (
            <NextLink
              url={`${SoloChatUrl}?chat_id=${item?.id}`}
              className={`flex gap-3 p-2 rounded-lg hover:bg-main hover:bg-opacity-5 transition-colors duration-200 relative ${
                isActive ? "bg-main bg-opacity-5" : ""
              }`}
              key={item?.id}
            >
              <LeftInfoProfilePicture
                path={expert?.photo?.path}
                full_name={expert?.full_name}
                is_online={item?.partner?.is_online}
              />
              <span className="flex flex-col gap-1 flex-1 pr-5">
                <span className="line-clamp-1 text-primary font-medium text-sm">
                  {expert?.full_name || item?.partner?.full_name}
                </span>
                <span className="text-xs line-clamp-1 text-primary text-opacity-60">
                  {item?.lastMessage?.content}
                </span>
              </span>
              {/* unread message */}
              {item?.unreadMessagesCount ? (
                <span className="absolute right-1 h-[14px] py-[2px] px-1 rounded-full bg-main text-white flex items-center justify-center text-xs">
                  {item?.unreadMessagesCount}
                </span>
              ) : (
                <></>
              )}
            </NextLink>
          );
        })
      ) : (
        <p className="text-center text-primary text-opacity-60 text-sm">
          {intl.formatMessage({ id: "Chatlar mavjud emas." })}
        </p>
      )}
    </div>
  );
};
