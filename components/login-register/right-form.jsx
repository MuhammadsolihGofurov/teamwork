import React from "react";
import { useIntl } from "react-intl";
import {
  ForgotPasswordForm,
  LoginForm,
  RegisterAsDetails,
  RegisterAsForm,
  RegisterInfo,
  RegisterSMSCode,
} from "..";

export default function RightForm({ page = "login" }) {
  const intl = useIntl();

  if (page === "register-as-details") {
    return (
      <RightFormWrapper type="part">
        <RegisterAsDetails page={page} />
      </RightFormWrapper>
    );
  }

  if (page === "sms-code") {
    return (
      <RightFormWrapper type="part">
        <RegisterSMSCode page={page} />
      </RightFormWrapper>
    );
  }

  if (page === "register-info") {
    return (
      <RightFormWrapper type="part">
        <RegisterInfo page={page} />
      </RightFormWrapper>
    );
  }

  if (page === "register") {
    return (
      <RightFormWrapper type="part">
        <RegisterAsForm />
      </RightFormWrapper>
    );
  }

  if (page === "forgot-password") {
    return (
      <RightFormWrapper type="part">
        <ForgotPasswordForm />
      </RightFormWrapper>
    );
  }

  // by default "login" qaytaradi.
  return (
    <RightFormWrapper>
      <LoginForm />
    </RightFormWrapper>
  );
}

export function RightFormWrapper({ children, type = "default" }) {
  return (
    <div
      className={`sm:bg-bg-2  rounded-xl w-full sm:h-auto sm:min-h-0 min-h-screen lg:w-3/5 ${
        type == "part"
          ? "sm:py-16 pt-24 pb-10 sm:px-20"
          : "sm:py-16 pt-5 pb-10 sm:px-20"
      }`}
    >
      {children}
    </div>
  );
}
