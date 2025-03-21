import React from "react";
import { useIntl } from "react-intl";

export default function File({ page = "register-info" }) {
  const intl = useIntl();
  // by default

  return (
    <div className="flex cursor-pointer itmes-start justify-start lg:w-2/4 gap-4 relative z-0">
      <div className="w-[100px] h-[100px] rounded-3xl bg-main flex items-center justify-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4H10C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5C9 5.53043 8.78929 6.03914 8.41421 6.41421C8.03914 6.78929 7.53043 7 7 7H5C4.46957 7 3.96086 7.21071 3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V11M15 6H21M18 3V9M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col pt-3">
        <h2 className="font-medium text-primary">
          {intl.formatMessage({ id: "Rasmdan yuklash" })}
        </h2>
        <p className="text-sm font-normal text-gray-400">
          .jpeg .png ~ 40 -300 kb
        </p>
      </div>
      <input
        type="file"
        className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer"
      />
    </div>
  );
}
