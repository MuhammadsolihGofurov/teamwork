import { REGISTERPHONENUMBER } from "@/utils/data";
import { maskPhoneNumber } from "@/utils/funcs";
import React, { useRef } from "react";
import { useIntl } from "react-intl";

export default function SMSCode({ register, errors, setValue, watch }) {
  const intl = useIntl();
  const inputsRef = useRef([]);
  const phone_number =
    typeof window !== "undefined"
      ? localStorage.getItem(REGISTERPHONENUMBER)
      : null;

  const handleChange = (e, index) => {
    const value = e.target.value;
    setValue(`code[${index}]`, value);
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col gap-5 text-primary">
      <h2 className=" font-semibold text-lg">
        {intl.formatMessage({ id: "sendCodeTitle" })}
      </h2>
      <div className="flex flex-row gap-3 sm:gap-8">
        <div className="bg-white w-[66px] h-14 hidden xs:flex items-center justify-center rounded-full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 7H6M3 11H5M9.80005 7.5L12.782 10.78C13.047 11.0715 13.3669 11.308 13.7233 11.476C14.0797 11.6439 14.4657 11.74 14.8592 11.7588C15.2528 11.7775 15.6461 11.7186 16.0169 11.5853C16.3876 11.452 16.7285 11.247 17.02 10.982L20.3 8M9.01996 8.801L8.41996 14.801C8.39216 15.079 8.42292 15.3598 8.51027 15.6252C8.59762 15.8906 8.73962 16.1348 8.92711 16.342C9.11459 16.5492 9.34342 16.7148 9.59882 16.8281C9.85422 16.9414 10.1305 17 10.41 17H18.39C18.8859 17 19.3642 16.8157 19.7319 16.4829C20.0997 16.1501 20.3306 15.6925 20.38 15.199L20.98 9.199C21.0078 8.92097 20.977 8.64019 20.8896 8.37478C20.8023 8.10936 20.6603 7.86519 20.4728 7.65801C20.2853 7.45083 20.0565 7.28524 19.8011 7.17191C19.5457 7.05857 19.2694 7.00001 18.99 7H11.01C10.514 7.00002 10.0357 7.18432 9.66799 7.51712C9.30026 7.84993 9.06931 8.30749 9.01996 8.801Z"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex flex-row sm:justify-start justify-between w-full gap-1">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              className="xs:w-14 w-full h-12 xs:h-14 rounded-full bg-white text-center text-primary text-xl font-bold"
              maxLength={1}
              {...register(`code[${index}]`, {
                required: intl.formatMessage({ id: "RequiredSMSCode" }),
                pattern: {
                  value: /^[0-9]$/,
                  message: intl.formatMessage({ id: "isNotEqualsNumber" }),
                },
              })}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
          {errors?.code && (
            <p className="text-red-500 text-sm">{errors.code.message}</p>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-5 sm:gap-9">
        <button
          type="button"
          className="w-16 h-16 rounded-2xl bg-main flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 11C19.7554 9.24017 18.9391 7.60961 17.6766 6.35945C16.4142 5.10928 14.7758 4.30887 13.0137 4.0815C11.2516 3.85414 9.46362 4.21243 7.9252 5.1012C6.38678 5.98996 5.18325 7.35989 4.5 8.99995M4 4.99995V8.99995H8M4 13C4.24456 14.7598 5.06093 16.3903 6.32336 17.6405C7.58579 18.8907 9.22424 19.6911 10.9863 19.9184C12.7484 20.1458 14.5364 19.7875 16.0748 18.8988C17.6132 18.01 18.8168 16.6401 19.5 15M20 19V15H16M12 9V12M12 15H12.01"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="w-2/4">
          {intl.formatMessage({ id: "sendCodeBody" })}{" "}
          <span className="text-main font-semibold">
            {" "}
            {maskPhoneNumber(phone_number)}{" "}
          </span>{" "}
        </p>
      </div>
    </div>
  );
}
