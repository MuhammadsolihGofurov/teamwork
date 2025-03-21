import React from "react";

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
          className="rounded-full bg-white py-[18px] px-6 text-primary placeholder:text-primary placeholder:text-opacity-40 placeholder:text-sm"
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
        className="rounded-full py-1 px-6 flex-1 sm:min-w-[250px] placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25"
        {...register(name, validation)}
      />
    </label>
  );
}
