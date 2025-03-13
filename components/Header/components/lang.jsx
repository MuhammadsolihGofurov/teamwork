import { useRouter } from "next/router";
import React from "react";

export default function Lang({ type = "main" }) {
  const router = useRouter();
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
