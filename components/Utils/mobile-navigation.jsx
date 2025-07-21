import {
  ChatsUrl,
  MyPaymentUrl,
  MyTasksUrl,
  SavedExpertsUrl,
  SavedTasksUrl,
  SoloChatUrl,
} from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import { NextLink } from ".";

export default function MobileNavigation() {
  const router = useRouter();
  const intl = useIntl();

  const handleBack = () => {
    router.back();
  };

  const isReturnUnUsePath = [
    "/",
    `/${SavedTasksUrl}`,
    `/${MyTasksUrl}`,
    `/${ChatsUrl}`,
    // `/${SoloChatUrl}`
  ];
  const isReturn = !isReturnUnUsePath.includes(router.pathname);

  const links = [
    {
      id: 1,
      name: "Home",
      is_return: isReturn,
      url: ``,
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.16667 10H2.5L10 2.5L17.5 10H15.8333" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.16667 10V15.8333C4.16667 16.2754 4.34226 16.6993 4.65482 17.0118C4.96738 17.3244 5.39131 17.5 5.83333 17.5H14.1667C14.6087 17.5 15.0326 17.3244 15.3452 17.0118C15.6577 16.6993 15.8333 16.2754 15.8333 15.8333V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M11.6667 10H8.33333V13.3333H11.6667V10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      is_return_icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.16602 10H15.8327M4.16602 10L9.16602 15M4.16602 10L9.16602 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
    {
      id: 2,
      name: "My Favorites",
      url: SavedTasksUrl,
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.2491 10.4766L9.99911 16.6666L3.74911 10.4766C3.33687 10.0754 3.01215 9.59325 2.7954 9.06043C2.57866 8.52762 2.47458 7.9557 2.48973 7.38068C2.50487 6.80567 2.63891 6.24002 2.88341 5.71935C3.1279 5.19868 3.47756 4.73428 3.91035 4.35539C4.34314 3.97649 4.8497 3.69131 5.39812 3.5178C5.94654 3.3443 6.52495 3.28622 7.09692 3.34724C7.66889 3.40825 8.22203 3.58703 8.72151 3.87233C9.22099 4.15762 9.65599 4.54324 9.99911 5.0049C10.3437 4.54659 10.7792 4.16434 11.2784 3.88207C11.7775 3.59981 12.3295 3.42361 12.8999 3.3645C13.4703 3.3054 14.0467 3.36465 14.5931 3.53856C15.1395 3.71247 15.6441 3.9973 16.0754 4.37521C16.5067 4.75311 16.8553 5.21597 17.0995 5.73481C17.3436 6.25365 17.4781 6.81731 17.4944 7.39049C17.5107 7.96368 17.4085 8.53406 17.1942 9.06594C16.98 9.59783 16.6582 10.0798 16.2491 10.4816" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
    {
      id: 3,
      name: "My Payments",
      url: MyPaymentUrl,
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.666 2.5V5.83333C11.666 6.05435 11.7538 6.26631 11.9101 6.42259C12.0664 6.57887 12.2783 6.66667 12.4993 6.66667H15.8327M11.666 2.5H5.83268C5.39065 2.5 4.96673 2.67559 4.65417 2.98816C4.34161 3.30072 4.16602 3.72464 4.16602 4.16667V15.8333C4.16602 16.2754 4.34161 16.6993 4.65417 17.0118C4.96673 17.3244 5.39065 17.5 5.83268 17.5H14.166C14.608 17.5 15.032 17.3244 15.3445 17.0118C15.6571 16.6993 15.8327 16.2754 15.8327 15.8333V6.66667M11.666 2.5L15.8327 6.66667M11.666 9.16667H9.58268C9.25116 9.16667 8.93322 9.29836 8.6988 9.53278C8.46438 9.7672 8.33268 10.0851 8.33268 10.4167C8.33268 10.7482 8.46438 11.0661 8.6988 11.3006C8.93322 11.535 9.25116 11.6667 9.58268 11.6667H10.416C10.7475 11.6667 11.0655 11.7984 11.2999 12.0328C11.5343 12.2672 11.666 12.5851 11.666 12.9167C11.666 13.2482 11.5343 13.5661 11.2999 13.8005C11.0655 14.035 10.7475 14.1667 10.416 14.1667H8.33268M9.99935 14.1667V15M9.99935 8.33333V9.16667" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
    {
      id: 4,
      name: "My Tasks",
      url: MyTasksUrl,
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.6667 2.5V5.83333C11.6667 6.05435 11.7545 6.26631 11.9107 6.42259C12.067 6.57887 12.279 6.66667 12.5 6.66667H15.8333M11.6667 2.5H5.83333C5.39131 2.5 4.96738 2.67559 4.65482 2.98816C4.34226 3.30072 4.16667 3.72464 4.16667 4.16667V6.66667M11.6667 2.5L15.8333 6.66667M15.8333 6.66667V15.8333C15.8333 16.2754 15.6577 16.6993 15.3452 17.0118C15.0326 17.3244 14.6087 17.5 14.1667 17.5H10M3.75 14.1667L2.5 18.3333L5 17.0833L7.5 18.3333L6.25 14.1667M7.5 11.6667C7.5 13.0474 6.38071 14.1667 5 14.1667C3.61929 14.1667 2.5 13.0474 2.5 11.6667C2.5 10.286 3.61929 9.16667 5 9.16667C6.38071 9.16667 7.5 10.286 7.5 11.6667Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
       `,
    },
    {
      id: 5,
      name: "My Chats",
      url: ChatsUrl,
      icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 11.2499C8.33333 13.3333 11.6667 13.3333 13.75 11.2499M14.835 14.4098C14.835 14.4098 14.8992 14.364 15.0017 14.2856C16.5375 13.0981 17.5 11.3773 17.5 9.46146C17.5 5.88979 14.1417 2.99146 10.0017 2.99146C5.86 2.99146 2.5 5.88979 2.5 9.46146C2.5 13.0348 5.85833 15.8331 10 15.8331C10.3533 15.8331 10.9333 15.8098 11.74 15.7631C12.7917 16.4465 14.3267 17.0073 15.67 17.0073C16.0858 17.0073 16.2817 16.6656 16.015 16.3173C15.61 15.8206 15.0517 15.0256 14.835 14.4098Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
    },
  ];

  return (
    <div className="sm:hidden fixed bottom-3 left-0 px-2 w-full z-[999]">
      <div className="p-1 w-full flex justify-between bg-primary bg-opacity-5 backdrop-blur-xl rounded-full">
        {links?.map((item) => {
          const itemUrl = item?.is_return ? item?.is_return : item?.url;
          const is_correct = router.pathname == `/${item?.url}`;
          const isActive = is_correct || item?.is_return;

          if (item?.is_return) {
            return (
              <button
                type="button"
                key={item?.name}
                onClick={() => handleBack()}
                className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${
                  isActive ? "bg-main" : ""
                }`}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: item?.is_return_icon }}
                  className={`${item?.is_return ? "inline" : "hidden"} ${
                    isActive ? "text-white" : "text-primary"
                  }`}
                />
              </button>
            );
          }

          return (
            <NextLink
              url={itemUrl}
              key={item?.name}
              className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${
                isActive ? "bg-main" : ""
              }`}
            >
              <span
                dangerouslySetInnerHTML={{ __html: item?.icon }}
                className={`${item?.is_return ? "hidden" : "inline"} ${
                  isActive ? "text-white" : "text-primary"
                }`}
              />
              <span
                dangerouslySetInnerHTML={{ __html: item?.is_return_icon }}
                className={`${item?.is_return ? "inline" : "hidden"} ${
                  isActive ? "text-white" : "text-primary"
                }`}
              />
            </NextLink>
          );
        })}
      </div>
    </div>
  );
}
