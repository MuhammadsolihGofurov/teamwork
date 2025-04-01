import { useRouter } from "next/router";
import React from "react";

export default function Lang({ type = "main" }) {
  const router = useRouter();

  if (type == "offcanvas") {
    return (
      <div className={`lang items-center flex bg-bg-2 rounded-full p-1 w-auto`}>
        <a
          href={`/uz/${router.asPath}`}
          title="uz"
          className={`w-10 h-10 flex rounded-full items-center justify-center ${
            router.locale == "uz" ? "bg-main text-white" : "text-primary"
          }`}
          locale={"uz"}
        >
          Uz
        </a>
        <a
          href={`/ru/${router.asPath}`}
          title="ru"
          className={`w-10 h-10 flex rounded-full items-center justify-center ${
            router.locale == "ru" ? "bg-main text-white" : "text-primary"
          }`}
          locale={"ru"}
        >
          Ru
        </a>
      </div>
    );
  }

  return (
    <div
      className={`lang ${
        type == "header" ? "sm:flex hidden" : "flex"
      } items-center gap-2`}
    >
      <a
        href={`/uz/${router.asPath}`}
        title="uz"
        className={`font-bold text-primary hover:text-main transition-colors duration-150 ${
          router.locale == "uz" ? "" : "opacity-50"
        }`}
        locale={"uz"}
      >
        Uz
      </a>
      <span>|</span>
      <a
        href={`/ru/${router.asPath}`}
        title="ru"
        className={`font-bold text-primary hover:text-main transition-colors duration-150 ${
          router.locale == "ru" ? "" : "opacity-50"
        }`}
        locale={"ru"}
      >
        Ru
      </a>
    </div>
  );
}
