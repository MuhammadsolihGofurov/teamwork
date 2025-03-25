import { NextLink } from "@/components/Utils";
import { EXPERT, CUSTOMER } from "@/utils/data";
import {
  InfoUrl,
  MyOrdersUrl,
  MyTasksUrl,
  PortfolioTeamworkUrl,
  SavedTasksUrl,
  VacancyUrl,
} from "@/utils/router";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

export default function MenuLinksBox({ isMobile = false }) {
  const intl = useIntl();
  const { user_info, loading } = useSelector((state) => state.user);
  const router = useRouter();
  const currentRouter = router?.pathname?.split("/")?.[2];

  const links = [
    {
      id: 0,
      name: intl.formatMessage({ id: "Buyurtmalarim" }),
      role: CUSTOMER,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33398 2V4.66667C9.33398 4.84348 9.40422 5.01305 9.52925 5.13807C9.65427 5.2631 9.82384 5.33333 10.0007 5.33333H12.6673M9.33398 2H4.66732C4.3137 2 3.97456 2.14048 3.72451 2.39052C3.47446 2.64057 3.33398 2.97971 3.33398 3.33333V12.6667C3.33398 13.0203 3.47446 13.3594 3.72451 13.6095C3.97456 13.8595 4.3137 14 4.66732 14H11.334C11.6876 14 12.0267 13.8595 12.2768 13.6095C12.5268 13.3594 12.6673 13.0203 12.6673 12.6667V5.33333M9.33398 2L12.6673 5.33333M9.33398 7.33333H7.66732C7.4021 7.33333 7.14775 7.43869 6.96021 7.62623C6.77267 7.81376 6.66732 8.06812 6.66732 8.33333C6.66732 8.59855 6.77267 8.8529 6.96021 9.04044C7.14775 9.22798 7.4021 9.33333 7.66732 9.33333H8.33398C8.5992 9.33333 8.85356 9.43869 9.04109 9.62623C9.22863 9.81376 9.33398 10.0681 9.33398 10.3333C9.33398 10.5986 9.22863 10.8529 9.04109 11.0404C8.85356 11.228 8.5992 11.3333 8.33398 11.3333H6.66732M8.00065 11.3333V12M8.00065 6.66667V7.33333" stroke="#222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: MyOrdersUrl,
      is_mobile: false,
    },
    {
      id: 1,
      name: intl.formatMessage({ id: "Topshiriqlarim" }),
      role: EXPERT,
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.33333 2V4.66667C9.33333 4.84348 9.40357 5.01305 9.5286 5.13807C9.65362 5.2631 9.82319 5.33333 10 5.33333H12.6667M9.33333 2H4.66667C4.31304 2 3.97391 2.14048 3.72386 2.39052C3.47381 2.64057 3.33333 2.97971 3.33333 3.33333V5.33333M9.33333 2L12.6667 5.33333M12.6667 5.33333V12.6667C12.6667 13.0203 12.5262 13.3594 12.2761 13.6095C12.0261 13.8595 11.687 14 11.3333 14H8M3 11.3333L2 14.6667L4 13.6667L6 14.6667L5 11.3333M6 9.33333C6 10.4379 5.10457 11.3333 4 11.3333C2.89543 11.3333 2 10.4379 2 9.33333C2 8.22876 2.89543 7.33333 4 7.33333C5.10457 7.33333 6 8.22876 6 9.33333Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: MyTasksUrl,
      is_mobile: false,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Vakansiyalar" }),
      role: "all",
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33333 4.66667V3.33333C5.33333 2.97971 5.47381 2.64057 5.72386 2.39052C5.97391 2.14048 6.31304 2 6.66667 2H9.33333C9.68696 2 10.0261 2.14048 10.2761 2.39052C10.5262 2.64057 10.6667 2.97971 10.6667 3.33333V4.66667M8 8V8.00667M2 8.66667C3.86105 9.60446 5.91602 10.093 8 10.093C10.084 10.093 12.1389 9.60446 14 8.66667M3.33333 4.66667H12.6667C13.403 4.66667 14 5.26362 14 6V12C14 12.7364 13.403 13.3333 12.6667 13.3333H3.33333C2.59695 13.3333 2 12.7364 2 12V6C2 5.26362 2.59695 4.66667 3.33333 4.66667Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: VacancyUrl,
      is_mobile: true,
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Shaxsiy ma’lumotlar" }),
      role: "all",
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.99968 13.8385C3.79669 13.7213 3.62819 13.5527 3.51115 13.3496C3.39411 13.1465 3.33266 12.9162 3.33301 12.6818V3.34847C3.33301 2.99485 3.47348 2.65571 3.72353 2.40566C3.97358 2.15561 4.31272 2.01514 4.66634 2.01514H9.33301L12.6663 5.34847V12.6818C12.6663 13.0354 12.5259 13.3746 12.2758 13.6246C12.0258 13.8747 11.6866 14.0151 11.333 14.0151H10.6663M7.33301 3.34847H6.66634M8.66634 4.6818H7.99967M7.33301 6.01514H6.66634M8.66634 7.34847H7.99967M7.33301 8.6818H6.66634M8.66634 10.0151H7.99967M7.33301 11.3485C7.68663 11.3485 8.02577 11.4889 8.27582 11.739C8.52587 11.989 8.66634 12.3282 8.66634 12.6818V14.0151C8.66634 14.1919 8.5961 14.3615 8.47108 14.4865C8.34605 14.6116 8.17649 14.6818 7.99967 14.6818H6.66634C6.48953 14.6818 6.31996 14.6116 6.19494 14.4865C6.06991 14.3615 5.99967 14.1919 5.99967 14.0151V12.6818C5.99967 12.3282 6.14015 11.989 6.3902 11.739C6.64025 11.4889 6.97939 11.3485 7.33301 11.3485Z" stroke="#222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: InfoUrl,
      is_mobile: false,
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Hisob kitoblar" }),
      role: "all",
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.33398 2V4.66667C9.33398 4.84348 9.40422 5.01305 9.52925 5.13807C9.65427 5.2631 9.82384 5.33333 10.0007 5.33333H12.6673M9.33398 2H4.66732C4.3137 2 3.97456 2.14048 3.72451 2.39052C3.47446 2.64057 3.33398 2.97971 3.33398 3.33333V12.6667C3.33398 13.0203 3.47446 13.3594 3.72451 13.6095C3.97456 13.8595 4.3137 14 4.66732 14H11.334C11.6876 14 12.0267 13.8595 12.2768 13.6095C12.5268 13.3594 12.6673 13.0203 12.6673 12.6667V5.33333M9.33398 2L12.6673 5.33333M9.33398 7.33333H7.66732C7.4021 7.33333 7.14775 7.43869 6.96021 7.62623C6.77267 7.81376 6.66732 8.06812 6.66732 8.33333C6.66732 8.59855 6.77267 8.8529 6.96021 9.04044C7.14775 9.22798 7.4021 9.33333 7.66732 9.33333H8.33398C8.5992 9.33333 8.85356 9.43869 9.04109 9.62623C9.22863 9.81376 9.33398 10.0681 9.33398 10.3333C9.33398 10.5986 9.22863 10.8529 9.04109 11.0404C8.85356 11.228 8.5992 11.3333 8.33398 11.3333H6.66732M8.00065 11.3333V12M8.00065 6.66667V7.33333" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
      url: "",
      is_mobile: true,
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "Saralanganlar" }),
      role: "all",
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.9999 8.89659L7.99987 13.8486L2.99988 8.89659C2.67008 8.57566 2.4103 8.18993 2.23691 7.76368C2.06351 7.33743 1.98025 6.87989 1.99237 6.41988C2.00448 5.95987 2.11172 5.50735 2.30731 5.09081C2.50291 4.67428 2.78263 4.30276 3.12887 3.99964C3.4751 3.69652 3.88035 3.46838 4.31908 3.32958C4.75782 3.19077 5.22055 3.14431 5.67812 3.19312C6.1357 3.24193 6.57821 3.38496 6.97779 3.61319C7.37738 3.84143 7.72537 4.14992 7.99987 4.51925C8.27556 4.1526 8.62397 3.8468 9.02328 3.62099C9.42258 3.39518 9.8642 3.25422 10.3205 3.20693C10.7768 3.15965 11.2379 3.20705 11.6751 3.34618C12.1122 3.48531 12.5159 3.71317 12.8609 4.0155C13.2059 4.31782 13.4848 4.68811 13.6802 5.10318C13.8755 5.51825 13.983 5.96918 13.9961 6.42773C14.0091 6.88628 13.9274 7.34258 13.756 7.76809C13.5845 8.19359 13.3271 8.57914 12.9999 8.90059" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: SavedTasksUrl,
      is_mobile: true,
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "Portfolio" }),
      role: EXPERT,
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33333 5.1818V3.84847C5.33333 3.49485 5.47381 3.15571 5.72386 2.90566C5.97391 2.65561 6.31304 2.51514 6.66667 2.51514H9.33333C9.68696 2.51514 10.0261 2.65561 10.2761 2.90566C10.5262 3.15571 10.6667 3.49485 10.6667 3.84847V5.1818M8 8.51514V8.5218M2 9.1818C3.86105 10.1196 5.91602 10.6081 8 10.6081C10.084 10.6081 12.1389 10.1196 14 9.1818M3.33333 5.1818H12.6667C13.403 5.1818 14 5.77876 14 6.51514V12.5151C14 13.2515 13.403 13.8485 12.6667 13.8485H3.33333C2.59695 13.8485 2 13.2515 2 12.5151V6.51514C2 5.77876 2.59695 5.1818 3.33333 5.1818Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: PortfolioTeamworkUrl,
      is_mobile: true,
    },
    {
      id: 7,
      name: intl.formatMessage({ id: "Resume" }),
      role: EXPERT,
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.00065 14.3233C3.79767 14.2061 3.62917 14.0375 3.51213 13.8344C3.39508 13.6314 3.33364 13.401 3.33399 13.1667V3.83333C3.33399 3.47971 3.47446 3.14057 3.72451 2.89052C3.97456 2.64048 4.3137 2.5 4.66732 2.5H9.33399L12.6673 5.83333V13.1667C12.6673 13.5203 12.5268 13.8594 12.2768 14.1095C12.0267 14.3595 11.6876 14.5 11.334 14.5H10.6673M7.33398 3.83333H6.66732M8.66732 5.16667H8.00065M7.33398 6.5H6.66732M8.66732 7.83333H8.00065M7.33398 9.16667H6.66732M8.66732 10.5H8.00065M7.33398 11.8333C7.68761 11.8333 8.02674 11.9738 8.27679 12.2239C8.52684 12.4739 8.66732 12.813 8.66732 13.1667V14.5C8.66732 14.6768 8.59708 14.8464 8.47206 14.9714C8.34703 15.0964 8.17746 15.1667 8.00065 15.1667H6.66732C6.49051 15.1667 6.32094 15.0964 6.19591 14.9714C6.07089 14.8464 6.00065 14.6768 6.00065 14.5V13.1667C6.00065 12.813 6.14113 12.4739 6.39118 12.2239C6.64122 11.9738 6.98036 11.8333 7.33398 11.8333Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: "",
      is_mobile: true,
    },
    {
      id: 8,
      name: intl.formatMessage({ id: "Sharhlar" }),
      role: "all",
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33366 6.51506H10.667M5.33366 9.18172H9.33366M2.66699 14.5151V5.84839C2.66699 5.31796 2.87771 4.80925 3.25278 4.43418C3.62785 4.0591 4.13656 3.84839 4.66699 3.84839H11.3337C11.8641 3.84839 12.3728 4.0591 12.7479 4.43418C13.1229 4.80925 13.3337 5.31796 13.3337 5.84839V9.84839C13.3337 10.3788 13.1229 10.8875 12.7479 11.2626C12.3728 11.6377 11.8641 11.8484 11.3337 11.8484H5.33366L2.66699 14.5151Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: "",
      is_mobile: true,
    },
    {
      id: 9,
      name: intl.formatMessage({ id: "Jamoam" }),
      role: EXPERT,
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.33366 15.1818V11.8485L2.66699 11.1818V8.51514C2.66699 8.33833 2.73723 8.16876 2.86225 8.04373C2.98728 7.91871 3.15685 7.84847 3.33366 7.84847H6.00033C6.17714 7.84847 6.34671 7.91871 6.47173 8.04373C6.59675 8.16876 6.66699 8.33833 6.66699 8.51514V11.1818L6.00033 11.8485V15.1818M10.0003 15.1818V12.5151H8.66699L10.0003 8.51514C10.0003 8.33833 10.0706 8.16876 10.1956 8.04373C10.3206 7.91871 10.4902 7.84847 10.667 7.84847H12.0003C12.1771 7.84847 12.3467 7.91871 12.4717 8.04373C12.5968 8.16876 12.667 8.33833 12.667 8.51514L14.0003 12.5151H12.667V15.1818M6.00033 3.84847C6.00033 4.58485 5.40337 5.1818 4.66699 5.1818C3.93061 5.1818 3.33366 4.58485 3.33366 3.84847C3.33366 3.11209 3.93061 2.51514 4.66699 2.51514C5.40337 2.51514 6.00033 3.11209 6.00033 3.84847ZM12.667 3.84847C12.667 4.58485 12.07 5.1818 11.3337 5.1818C10.5973 5.1818 10.0003 4.58485 10.0003 3.84847C10.0003 3.11209 10.5973 2.51514 11.3337 2.51514C12.07 2.51514 12.667 3.11209 12.667 3.84847Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: "",
      is_mobile: true,
    },
    {
      id: 10,
      name: intl.formatMessage({ id: "Sozlamalar" }),
      role: EXPERT,
      icon: `<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.99968 13.8385C3.79669 13.7213 3.62819 13.5527 3.51115 13.3496C3.39411 13.1465 3.33266 12.9162 3.33301 12.6818V3.34847C3.33301 2.99485 3.47348 2.65571 3.72353 2.40566C3.97358 2.15561 4.31272 2.01514 4.66634 2.01514H9.33301L12.6663 5.34847V12.6818C12.6663 13.0354 12.5259 13.3746 12.2758 13.6246C12.0258 13.8747 11.6866 14.0151 11.333 14.0151H10.6663M7.33301 3.34847H6.66634M8.66634 4.6818H7.99967M7.33301 6.01514H6.66634M8.66634 7.34847H7.99967M7.33301 8.6818H6.66634M8.66634 10.0151H7.99967M7.33301 11.3485C7.68663 11.3485 8.02577 11.4889 8.27582 11.739C8.52587 11.989 8.66634 12.3282 8.66634 12.6818V14.0151C8.66634 14.1919 8.5961 14.3615 8.47108 14.4865C8.34605 14.6116 8.17649 14.6818 7.99967 14.6818H6.66634C6.48953 14.6818 6.31996 14.6116 6.19494 14.4865C6.06991 14.3615 5.99967 14.1919 5.99967 14.0151V12.6818C5.99967 12.3282 6.14015 11.989 6.3902 11.739C6.64025 11.4889 6.97939 11.3485 7.33301 11.3485Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `,
      url: "",
      is_mobile: false,
    },
  ];

  const filteredLinks = links.filter(
    (link) => link.role === "all" || link.role === user_info?.type?.value
  );

  if (loading) {
    return (
      <div
        className={` sm:p-6 flex  sm:border-bg-3 sm:border rounded-lg bg-white gap-1 sm:gap-5 flex-col w-full`}
      >
        {Array.from({ length: 7 }).map((item, index) => {
          return (
            <div className="flex w-full items-center gap-2 sm:px-0 sm:py-0 px-5 py-3 border border-bg-3 rounded-lg sm:border-none" key={index}>
              <Skeleton width={24} height={24} />
              <Skeleton width={120} height={10} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`sm:p-6 ${
        isMobile ? "sm:hidden flex " : "sm:flex hidden  "
      }   bg-white gap-1 sm:gap-5 flex-col  items-start sm:border-bg-3 sm:border rounded-lg w-full`}
    >
      {filteredLinks?.map((link) => {
        const isCorrect = currentRouter == link?.url?.split("/")?.[1];

        return (
          <NextLink
            url={link?.url}
            key={link?.name}
            className={` items-center relative z-0 px-5 py-3 sm:py-0 sm:px-0 border sm:border-none border-bg-3 w-full rounded-lg ${
              link?.is_mobile ? "flex" : " sm:flex hidden"
            } gap-2 ${
              isCorrect ? "text-main" : "text-primary"
            }  font-medium text-sm group hover:text-main transition-colors duration-200`}
          >
            <span className="w-4 flex items-center justify-center">
              <span
                className={`group-hover:text-main ${
                  isCorrect ? "text-main" : "text-primary"
                } transition-colors duration-200`}
                dangerouslySetInnerHTML={{
                  __html: link?.icon.replace(
                    /stroke="[^"]*"/g,
                    'stroke="currentColor"'
                  ),
                }}
              />
            </span>
            <span>{link?.name}</span>

            {/* Arrow */}
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-2/4 -translate-y-2/4 right-5 sm:hidden block"
            >
              <path
                d="M6.75 5L11.25 9.5L6.75 14"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NextLink>
        );
      })}
    </div>
  );
}
