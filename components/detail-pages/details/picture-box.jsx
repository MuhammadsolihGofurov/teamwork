import { LikeBtn } from "@/components/cards/details";
import Image from "next/image";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { ShareBtn } from "./part-info-btn";
import { FeedbackBtn, TimeSinceJoin } from ".";
import GetWorkBtn from "./get-work-btn";

export default function PictureBox({
  image,
  title,
  is_sure,
  type = "tasks",
  time_since_join,
  is_online = false,
  is_pro,
  rate,
  specialities,
  id,
  is_favorite,
  comments_count,
}) {
  const intl = useIntl();
  const isTasks = type == "tasks";
  const [imgSrc, setImgSrc] = useState(image ?? "/images/default.png");

  if (type === "experts") {
    return (
      <div className="w-full flex flex-wrap sm:flex-nowrap sm:flex-row justify-between gap-5">
        <div className="flex flex-col items-center sm:justify-center gap-1 relative">
          <div
            className={`${
              is_online ? "block" : ""
            } w-3 h-3 rounded-full bg-main absolute top-0 left-0`}
          ></div>
          <div className="xs:w-[90px] w-16 h-16 xs:h-[90px] rounded-full overflow-hidden">
            <Image
              src={
                image
                  ? image?.startsWith("http")
                    ? image
                    : `${process.env.NEXT_PUBLIC_API_PATH_IMAGE}${image}`
                  : "/images/default.png"
              }
              width={90}
              height={90}
              alt=""
              title={title}
              layout="responsive"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm pt-2">
            {rate} | {comments_count}
          </p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => {
              const filledStars = Math.floor(rate || 0);
              const isFilled = index < filledStars;
              return (
                <svg
                  key={index}
                  width="12"
                  height="12"
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
        </div>
        <div className="flex flex-1 flex-col justify-between items-start gap-y-3">
          <div className="w-full flex justify-between items-start">
            <TasksTitle
              title={title}
              is_sure={is_sure}
              is_online={is_online}
              time_since_join={time_since_join}
              is_pro={is_pro}
              type={type}
              specialities={specialities}
            />
            <div className="hidden sm:flex flex-row flex-wrap sm:flex-col items-center sm:items-end  sm:justify-end gap-1 sm:w-auto w-full">
              <FeedbackBtn id={id} />
            </div>
          </div>
          <div className="flex items-center justify-between w-full">
            <TimeSinceJoin time_since_join={time_since_join} isIcon />
            <div className="hidden sm:flex items-center gap-5">
              <ShareBtn />
              <LikeBtn
                page="details"
                id={id}
                type={type}
                is_favorite={is_favorite}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex sm:hidden flex-col gap-3">
          <div className="flex itemsce justify-between gap-1">
            <GetWorkBtn id={id} />
            <div className="flex items-center gap-3">
              <ShareBtn />
              <LikeBtn
                page="details"
                id={id}
                type={type}
                is_favorite={is_favorite}
              />
            </div>
          </div>
          <div className="w-full flex items-center flex-wrap gap-1">
            <FeedbackBtn id={id} isMobile={true} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-y-5">
      <div className="flex flex-row gap-3 sm:gap-5 sm:w-auto w-full">
        <div className="xs:w-[90px] w-16 h-16 xs:h-[90px] rounded-full overflow-hidden">
          <Image
            src={imgSrc}
            width={90}
            height={90}
            alt=""
            title={title}
            layout="responsive"
            className="w-full h-full object-cover"
            onError={() => setImgSrc("/images/defaultAvatar.png")}
          />
        </div>
        <TasksTitle
          title={title}
          is_sure={is_sure}
          is_online={is_online}
          time_since_join={time_since_join}
          is_pro={is_pro}
        />
      </div>
      <div className="flex flex-row flex-wrap sm:flex-col items-center sm:items-end  sm:justify-end gap-1 sm:w-auto w-full">
        <FeedbackBtn id={id} />
      </div>
    </div>
  );
}

export const TasksTitle = ({
  title,
  time_since_join,
  is_pro,
  type,
  specialities,
}) => {
  const intl = useIntl();

  if (type === "experts") {
    const level_of_expert = [
      {
        id: 1,
        name: intl.formatMessage({ id: "Havaskor" }),
        value: "AMATEUR",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_67_4062)">
        <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM7.81054 6.24024H10.8999L11.9004 7.5293H19.166V17.7598H4.83398V7.5293H6.81006L7.81054 6.24024Z" fill="#FF9533"/>
        </g>
        <defs>
        <clipPath id="clip0_67_4062">
        <rect width="24" height="24" fill="white"/>
        </clipPath>
        </defs>
        </svg>
        `,
      },
      {
        id: 2,
        name: intl.formatMessage({ id: "Mutaxassis" }),
        value: "EXPERT",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.783 2.826L12 1L20.217 2.826C20.4391 2.87536 20.6377 2.99897 20.78 3.1764C20.9224 3.35384 21 3.57452 21 3.802V13.789C20.9999 14.7767 20.756 15.7492 20.2899 16.62C19.8238 17.4908 19.1499 18.2331 18.328 18.781L12 23L5.672 18.781C4.85027 18.2332 4.17646 17.4911 3.71035 16.6205C3.24424 15.7498 3.00024 14.7776 3 13.79V3.802C3.00004 3.57452 3.07764 3.35384 3.21999 3.1764C3.36234 2.99897 3.56094 2.87536 3.783 2.826ZM13 10V5L8 12H11V17L16 10H13Z" fill="#00A8DD"/>
        </svg>
        `,
      },
      {
        id: 3,
        name: intl.formatMessage({ id: "Profi" }),
        value: "PROFI",
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_37_4298)">
      <path d="M11.9784 19.0583C17.2411 19.0583 21.5075 14.7919 21.5075 9.52913C21.5075 4.26634 17.2411 0 11.9784 0C6.71556 0 2.44922 4.26634 2.44922 9.52913C2.44922 14.7919 6.71556 19.0583 11.9784 19.0583Z" fill="#FFEF5C"/>
      <path d="M4.25921 15.1035L0.980469 20.787L4.80724 20.5838L6.54582 23.9996L9.57889 18.7413C7.40567 18.1791 5.53952 16.8704 4.25921 15.1035Z" fill="#EFCD1B"/>
      <path d="M19.7157 15.0752C18.4448 16.8468 16.5787 18.1602 14.4102 18.7319L17.4527 23.9996L19.1913 20.5839L23.018 20.787L19.7157 15.0752Z" fill="#EFCD1B"/>
      <path d="M11.9813 16.4362C15.796 16.4362 18.8884 13.3438 18.8884 9.52916C18.8884 5.71448 15.796 2.62207 11.9813 2.62207C8.16663 2.62207 5.07422 5.71448 5.07422 9.52916C5.07422 13.3438 8.16663 16.4362 11.9813 16.4362Z" fill="#EFCD1B"/>
      <path d="M15.9105 8.93643C16.0861 8.7792 15.9885 8.50405 15.7466 8.47189L13.4947 8.17173C13.3972 8.15743 13.3152 8.10383 13.2723 8.02165L12.2654 6.15276C12.1561 5.94908 11.84 5.94908 11.7307 6.15276L10.7277 8.02165C10.6848 8.10026 10.5989 8.15743 10.5053 8.17173L8.25344 8.47189C8.01147 8.50405 7.91391 8.7792 8.08953 8.93643L9.71694 10.3908C9.78719 10.4551 9.81841 10.5445 9.8028 10.6302L9.42034 12.6813C9.37741 12.9029 9.63498 13.0744 9.85353 12.9672L11.8673 11.9988C11.9532 11.9559 12.0585 11.9559 12.1444 11.9988L14.1582 12.9672C14.3767 13.0708 14.6304 12.9029 14.5914 12.6813L14.205 10.6302C14.1894 10.5409 14.2206 10.4516 14.2909 10.3908L15.9105 8.93643Z" fill="white"/>
      </g>
      <defs>
      <clipPath id="clip0_37_4298">
      <rect width="24" height="24" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      `,
      },
    ];

    const current_level = level_of_expert?.find((item) => item?.name == is_pro);

    return (
      <div className="flex flex-col gap-1 text-primary">
        <div className="flex items-center gap-1">
          <span dangerouslySetInnerHTML={{ __html: current_level?.icon }} />
          <span className="text-[15px] text-primary">
            {current_level?.name}
          </span>
        </div>
        <h3 className="font-medium text-lg sm:text-xl leading-5 sm:leading-6 pt-1">
          {title}
        </h3>
        <div className="flex flex-row flex-wrap gap-y-0 gap-x-1">
          {specialities?.map((item) => {
            return (
              <p className="text-sm text-primary" key={item?.name}>
                {item?.name},
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 sm:gap-2 text-primary">
      <h3 className="font-semibold text-lg  sm:text-xl leading-5 sm:leading-6">
        {title}
      </h3>
      {is_pro ? (
        <div className="flex items-center gap-1 text-[15px] sm:pb-1 font-normal">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50001 10L9.16668 11.6667L12.5 8.33333M10 2.5C11.9466 4.22215 14.4871 5.11881 17.0834 5C17.4614 6.28585 17.577 7.63456 17.4235 8.96598C17.2699 10.2974 16.8503 11.5844 16.1895 12.7504C15.5288 13.9165 14.6403 14.9378 13.5771 15.7537C12.5138 16.5696 11.2973 17.1635 10 17.5C8.7027 17.1635 7.48626 16.5696 6.42298 15.7537C5.3597 14.9378 4.47128 13.9165 3.81052 12.7504C3.14976 11.5844 2.73014 10.2974 2.57659 8.96598C2.42304 7.63456 2.5387 6.28585 2.91669 5C5.51296 5.11881 8.0535 4.22215 10 2.5Z"
              stroke="#1DA743"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {intl.formatMessage({ id: "Ishonchli buyurtmachi" })}
        </div>
      ) : (
        <></>
      )}
      <TimeSinceJoin time_since_join={time_since_join} />
    </div>
  );
};
