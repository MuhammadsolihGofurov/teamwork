import React, { useState } from "react";

export default function Password({
  type,
  placeholder,
  name,
  required,
  register = () => {},
  validation,
  noSelected = false,
  page = "default",
  title,
  errors,
}) {
  const [isPassword, setIsPassword] = useState(true);

  if (page == "register-info") {
    return (
      <label className="flex flex-col gap-2" htmlFor={name}>
        <span className="text-sm font-normal text-primary pl-6">{title}</span>
        <div className="flex flex-row gap-1 sm:w-auto w-full sm:bg-transparent bg-white rounded-full relative z-0">
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer transition-all duration-150 absolute top-2/4 -translate-y-2/4 right-5"
            onClick={() => setIsPassword((prev) => !prev)}
          >
            {isPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.49935 2.5L17.4993 17.5M8.81934 8.82248C8.50661 9.13499 8.33083 9.55894 8.33067 10.0011C8.33052 10.4432 8.506 10.8672 8.81851 11.18C9.13102 11.4927 9.55497 11.6685 9.99709 11.6687C10.4392 11.6688 10.8633 11.4933 11.176 11.1808M7.80185 4.47083C8.51636 4.26643 9.25618 4.16403 9.99935 4.16667C13.3327 4.16667 16.1102 6.11083 18.3327 10C17.6843 11.1342 16.9893 12.1033 16.2468 12.9067M14.4635 14.4575C13.1043 15.3742 11.6177 15.8333 9.99935 15.8333C6.66602 15.8333 3.88852 13.8892 1.66602 10C2.80685 8.00416 4.09352 6.52083 5.52602 5.54917"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99935 11.6666C10.9198 11.6666 11.666 10.9204 11.666 9.99996C11.666 9.07948 10.9198 8.33329 9.99935 8.33329C9.07887 8.33329 8.33268 9.07948 8.33268 9.99996C8.33268 10.9204 9.07887 11.6666 9.99935 11.6666Z"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3327 9.99996C16.1102 13.8891 13.3327 15.8333 9.99935 15.8333C6.66602 15.8333 3.88852 13.8891 1.66602 9.99996C3.88852 6.11079 6.66602 4.16663 9.99935 4.16663C13.3327 4.16663 16.1102 6.11079 18.3327 9.99996Z"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <input
            type={isPassword ? "password" : "text"}
            placeholder={placeholder}
            name={name}
            id={name}
            required={required}
            autoComplete="off"
            disabled={noSelected}
            className={`rounded-full border-transparent py-[18px] px-6 w-full placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25 border-2 ${
              errors ? "border-red-500" : "border-transparent"
            }`}
            {...register(name, validation)}
          />
        </div>
        {errors?.message ? (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        ) : (
          <></>
        )}
      </label>
    );
  }

  if (page == "profile") {
    return (
      <label className="flex flex-col gap-1" htmlFor={name}>
        <span className="text-base font-medium text-primary pb-1">{title}</span>
        <div className="flex flex-row gap-1 sm:w-auto w-full border-bg-3 bg-bg-2 rounded-lg relative z-0">
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer transition-all duration-150 absolute top-2/4 -translate-y-2/4 right-5"
            onClick={() => setIsPassword((prev) => !prev)}
          >
            {isPassword ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.49935 2.5L17.4993 17.5M8.81934 8.82248C8.50661 9.13499 8.33083 9.55894 8.33067 10.0011C8.33052 10.4432 8.506 10.8672 8.81851 11.18C9.13102 11.4927 9.55497 11.6685 9.99709 11.6687C10.4392 11.6688 10.8633 11.4933 11.176 11.1808M7.80185 4.47083C8.51636 4.26643 9.25618 4.16403 9.99935 4.16667C13.3327 4.16667 16.1102 6.11083 18.3327 10C17.6843 11.1342 16.9893 12.1033 16.2468 12.9067M14.4635 14.4575C13.1043 15.3742 11.6177 15.8333 9.99935 15.8333C6.66602 15.8333 3.88852 13.8892 1.66602 10C2.80685 8.00416 4.09352 6.52083 5.52602 5.54917"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99935 11.6666C10.9198 11.6666 11.666 10.9204 11.666 9.99996C11.666 9.07948 10.9198 8.33329 9.99935 8.33329C9.07887 8.33329 8.33268 9.07948 8.33268 9.99996C8.33268 10.9204 9.07887 11.6666 9.99935 11.6666Z"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.3327 9.99996C16.1102 13.8891 13.3327 15.8333 9.99935 15.8333C6.66602 15.8333 3.88852 13.8891 1.66602 9.99996C3.88852 6.11079 6.66602 4.16663 9.99935 4.16663C13.3327 4.16663 16.1102 6.11079 18.3327 9.99996Z"
                  stroke="#222222"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
          <input
            type={isPassword ? "password" : "text"}
            placeholder={placeholder}
            name={name}
            id={name}
            required={required}
            autoComplete="off"
            disabled={noSelected}
            className={`rounded-lg border p-4 w-full bg-bg-2 ${
              errors ? "border-red-500" : " border-bg-3"
            }`}
            {...register(name, validation)}
          />
        </div>
        {errors?.message ? (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        ) : (
          <></>
        )}
      </label>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-1 sm:w-auto w-full sm:bg-transparent bg-white rounded-full">
        <p
          className="w-[64px] small:w-[92px] h-[54px] flex items-center justify-center cursor-pointer transition-all duration-150"
          onClick={() => setIsPassword((prev) => !prev)}
        >
          {isPassword ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66602 9.16667V5.83333C6.66602 4.94928 7.0172 4.10143 7.64233 3.47631C8.26745 2.85119 9.11529 2.5 9.99935 2.5C10.8834 2.5 11.7313 2.85119 12.3564 3.47631C12.9815 4.10143 13.3327 4.94928 13.3327 5.83333V9.16667M5.83268 9.16667H14.166C15.0865 9.16667 15.8327 9.91286 15.8327 10.8333V15.8333C15.8327 16.7538 15.0865 17.5 14.166 17.5H5.83268C4.91221 17.5 4.16602 16.7538 4.16602 15.8333V10.8333C4.16602 9.91286 4.91221 9.16667 5.83268 9.16667ZM10.8327 13.3333C10.8327 13.7936 10.4596 14.1667 9.99935 14.1667C9.53911 14.1667 9.16602 13.7936 9.16602 13.3333C9.16602 12.8731 9.53911 12.5 9.99935 12.5C10.4596 12.5 10.8327 12.8731 10.8327 13.3333Z"
                stroke="#222222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 11V6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6M7 11H17C18.1046 11 19 11.8954 19 13V19C19 20.1046 18.1046 21 17 21H7C5.89543 21 5 20.1046 5 19V13C5 11.8954 5.89543 11 7 11ZM13 16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16Z"
                stroke="#364749"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </p>
        <input
          type={isPassword ? "password" : "text"}
          placeholder={placeholder}
          name={name}
          id={name}
          required={required}
          autoComplete="off"
          disabled={noSelected}
          className="rounded-full border-transparent py-1 px-6 flex-1 sm:min-w-[250px] placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25"
          {...register(name, validation)}
        />
      </div>
      {errors?.message ? (
        <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
      ) : (
        <></>
      )}
    </div>
  );
}
