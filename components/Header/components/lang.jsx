import { useRouter } from "next/router";
import React from "react";

export default function Lang() {
  const router = useRouter();
  return (
    <div className="lang sm:flex hidden items-center gap-2">
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
