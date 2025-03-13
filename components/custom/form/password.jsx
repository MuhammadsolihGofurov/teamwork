import React, { useState } from "react";

export default function Password({
  type,
  placeholder,
  name,
  required,
  register = () => {},
  validation,
  noSelected = false,
}) {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className="flex flex-row gap-1 sm:w-auto w-full sm:bg-transparent bg-white rounded-full">
      <p className="w-[64px] small:w-[92px] h-[54px] flex items-center justify-center cursor-pointer transition-all duration-150" onClick={() => setIsPassword(prev => !prev)}>
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
        className="rounded-full py-1 px-6 flex-1 sm:min-w-[250px] placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25"
        {...register(name, validation)}
      />
    </div>
  );
}
