import React from "react";

export default function Title({ children, width }) {
  return (
    <h1
      role="heading"
      title={children}
      className={`text-[22px] font-semibold text-primary ${
        width == "full" ? "w-full text-start sm:text-center lg:text-start" : ""
      }`}
    >
      {children}
    </h1>
  );
}
