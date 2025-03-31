import React from "react";
import DatePickerUi from "./details/date-picker";

export default function Input({
  type,
  placeholder,
  name,
  title,
  required,
  register = () => {},
  validation,
  noSelected = false,
  page,
  errors,
  control,
  icon = "",
}) {
  if (page == "register-info") {
    return (
      <label className="flex flex-col gap-2" htmlFor={name}>
        <span className="text-sm font-normal text-primary pl-6">{title}</span>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          required={required}
          autoComplete="off"
          disabled={noSelected}
          className="rounded-full bg-white py-[18px] px-6 text-primary placeholder:text-primary placeholder:text-opacity-40 border-transparent placeholder:text-sm"
          {...register(name, validation)}
        />
        {errors?.message ? (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        ) : (
          <></>
        )}
      </label>
    );
  }

  if (page == "address") {
    return (
      <label className="flex flex-col gap-2" htmlFor={name}>
        <span className="text-sm font-normal text-primary pl-6">{title}</span>
        <span className="relative z-0 w-full">
          <span className="absolute top-2/4 -translate-y-2/4 left-6">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5 4.5V4.5075M7.875 3.5625L6.75 3M6.75 3L2.25 5.25V15L6.75 12.75M6.75 3V12.75M6.75 12.75L11.25 15M11.25 15L15.75 12.75V11.25M11.25 15V11.25M13.5 9.74998L10.875 5.99998C10.6223 5.54325 10.4931 5.0285 10.5003 4.50657C10.5074 3.98465 10.6506 3.47362 10.9157 3.02398C11.1808 2.57434 11.5586 2.20164 12.0119 1.94272C12.4651 1.6838 12.978 1.54761 13.5 1.54761C14.022 1.54761 14.5349 1.6838 14.9881 1.94272C15.4414 2.20164 15.8192 2.57434 16.0843 3.02398C16.3494 3.47362 16.4926 3.98465 16.4997 4.50657C16.5069 5.0285 16.3777 5.54325 16.125 5.99998L13.5 9.74998Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            required={required}
            autoComplete="off"
            disabled={noSelected}
            className="rounded-full bg-white py-[18px] pr-6 pl-12 text-primary placeholder:text-primary placeholder:text-opacity-40 border-transparent placeholder:text-sm w-full"
            {...register(name, validation)}
          />
        </span>
        {errors?.message ? (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        ) : (
          <></>
        )}
      </label>
    );
  }

  if (page == "register-as-details") {
    return (
      <DatePickerUi
        type={type}
        placeholder={placeholder}
        name={name}
        title={title}
        required={required}
        register={register}
        validation={validation}
        noSelected={noSelected}
        errors={errors}
        control={control}
      />
    );
  }

  if (page == "profile") {
    return (
      <label className="flex flex-col gap-1" htmlFor={name}>
        <span className="text-base font-medium text-primary pb-1">{title}</span>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          required={required}
          autoComplete="off"
          disabled={noSelected}
          className="p-4 rounded-lg bg-bg-2 border border-bg-3 text-primary max-h-[58px] min-h-[58px]"
          {...register(name, validation)}
        />
        {errors?.message ? (
          <span className="text-sm text-red-500">{errors?.message}</span>
        ) : (
          <></>
        )}
      </label>
    );
  }

  if (page == "with-border") {
    return (
      <label className="flex flex-col gap-1" htmlFor={name}>
        <span className="text-sm font-semibold text-primary pb-1 pl-3">
          {title}
        </span>
        <span className="flex w-full relative">
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            required={required}
            autoComplete="off"
            disabled={noSelected}
            className="p-4 pl-9 rounded-lg border w-full border-bg-3 text-primary max-h-[54px] min-h-[54px]"
            {...register(name, validation)}
          />
          <img
            src={icon}
            alt={name}
            title={name}
            className="absolute top-2/4 left-3 -translate-y-2/4"
          />
          {name == "price" ? (
            <span className="absolute top-2/4 right-3 -translate-y-2/4 text-primary text-opacity-40">
              UZS
            </span>
          ) : (
            <></>
          )}
        </span>
        {errors?.message ? (
          <span className="text-sm text-red-500">{errors?.message}</span>
        ) : (
          <></>
        )}
      </label>
    );
  }

  return (
    <label className="flex flex-row gap-1 sm:w-auto w-full sm:bg-transparent bg-white rounded-full">
      <span>{title}</span>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
        autoComplete="off"
        disabled={noSelected}
        className="rounded-full py-1 px-6 flex-1 border-transparent sm:min-w-[250px] placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25"
        {...register(name, validation)}
      />
    </label>
  );
}
