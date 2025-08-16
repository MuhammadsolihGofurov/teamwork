import { useIntl } from "react-intl";
import { MainHeader } from "./main";

export default function Header() {
  const intl = useIntl();
  return (
    // <header className="py-3 sm:py-5 fixed top-0 left-0 right-0 w-full z-[100] bg-white sm:border-0 border-b border-black border-opacity-10">
    <header className="pb-5 fixed top-0 left-0 right-0 w-full z-[100] bg-white sm:border-0 border-b border-black border-opacity-10">
      <a href="https://old.teamwork.uz" target="_blank" className="flex items-center justify-center text-white font-medium gap-2 pb-2 pt-2 bg-main mb-1">
        <span>{intl.formatMessage({ id: "Avvalgi talqinga qaytish" })}</span>
        <span className="rotate-180 inline-block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            className="icon2"
          >
            <path
              fill="currentColor"
              d="M19.59 12L15 7.41v2.46l-.86.13c-4.31.61-7.23 2.87-8.9 6.33c2.32-1.64 5.2-2.43 8.76-2.43h1v2.69m-2-1.69v.02c-4.47.21-7.67 1.82-10 5.08c1-5 4-10 11-11V5l7 7l-7 7v-4.1c-.33 0-.66.01-1 .02Z"
            ></path>
          </svg>
        </span>
      </a>
      <MainHeader />
    </header>
  );
}
