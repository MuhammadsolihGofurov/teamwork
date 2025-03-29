import { NextLink } from "@/components/Utils";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

export default function ChangeLink({ isMobileVersion = false, data = [] }) {
  const intl = useIntl();
  const router = useRouter();

  const renderLinks = () =>
    data?.map(({ url, name }) => (
      <NextLink
        key={name}
        url={url}
        className={`text-sm sm:text-base font-medium text-primary rounded-full hover:text-main transition-colors duration-150 px-2 py-[13px] ${
          router.pathname === `/${url}` ? "bg-bg-2" : "bg-white"
        }`}
      >
        {name}
      </NextLink>
    ));

  const addButton = (
    <button
      type="button"
      className="px-3 small:px-5 w-full sm:w-auto h-14 rounded-full border border-bg-3 bg-white flex items-center justify-center text-sm gap-1 font-medium"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 3.75V14.25M3.75 9H14.25"
          stroke="#222222"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="lg:hidden inline">
        {intl.formatMessage({ id: "Qo’shish" })}
      </span>
    </button>
  );

  return (
    <div className="flex items-center gap-1">
      <div
        className={`flex items-center p-[3px] rounded-full border border-bg-3 bg-white ${
          isMobileVersion ? "" : "lg:border-transparent"
        }`}
      >
        {renderLinks()}
      </div>
      {addButton}
    </div>
  );
}
