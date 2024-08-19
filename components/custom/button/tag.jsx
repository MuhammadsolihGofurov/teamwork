import React from "react";

export default function TagButton({ type = "button", children, ...pageProps }) {
  return (
    <button
      type={type}
      className="bg-bg-2 rounded-full py-3 px-5 font-semibold text-primary text-sm border-2 border-bg-2 hover:border-main hover:text-main transition-colors duration-150"
      {...pageProps}
    >
      {children}
    </button>
  );
}
