import React from "react";

export default function Button({
  type = "button",
  className,
  children,
  title,
  state,
  ...pageProps
}) {
  const home_btn =
    state == "greenBtnHome"
      ? "bg-main border-main hover:bg-white hover:text-main"
      : "bg-primary border-primary hover:bg-white hover:text-primary";

  if (state == "greenBtnHome" || state == "darkBtnHome") {
    return (
      <ButtonWrapper
        type={type}
        className={`${home_btn} py-3 px-8 rounded-full text-base sm:text-lg text-white font-semibold transition-colors duration-150 border-2`}
        title={title}
        {...pageProps}
      >
        {children}
      </ButtonWrapper>
    );
  }

  if (state == "tag") {
    return (
      <ButtonWrapper
        type={type}
        className="bg-bg-2 rounded-full py-3 px-5 font-semibold text-primary text-sm border-2 border-bg-2 hover:border-main hover:text-main transition-colors duration-150"
        title={title}
        {...pageProps}
      >
        {children}
      </ButtonWrapper>
    );
  }

  return (
    <ButtonWrapper
      type={type}
      className={"bg-bg-2 py-3 px-5 rounded-full"}
      title={title}
      {...pageProps}
    >
      {children}
    </ButtonWrapper>
  );
}

function ButtonWrapper({
  type,
  className,
  state,
  children,
  title,
  ...pageProps
}) {
  return (
    <button type={type} className={className} title={title} {...pageProps}>
      {children}
    </button>
  );
}
