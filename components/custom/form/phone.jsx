import React from "react";
import PhoneCode from "./details/phone-code";
import InputMask from "react-input-mask";

export default function PhoneInput({
  code,
  setCode,
  type,
  placeholder,
  name,
  required,
  register = () => {},
  validation,
  noSelected = false,
  page,
  title,
  errors,
}) {
  if (page == "info") {
    return (
      <label htmlFor={name} className="flex flex-col gap-2 w-full">
        <span className="text-sm font-normal text-primary pl-6">{title}</span>
        <div className="flex flex-row gap-1 bg-white rounded-full w-full">
          <PhoneCode setCode={setCode} page={page} />
          <InputMask
            mask="99 999-99-99"
            maskChar="_"
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            required={required}
            autoComplete="off"
            disabled={noSelected}
            className="rounded-full py-[18px] border-transparent px-4 w-full placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25"
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
      <label htmlFor={name} className="flex flex-col gap-1 w-full">
        <span className="text-base font-medium text-primary pb-1">{title}</span>
        <div className="flex flex-row items-center gap-1 bg-bg-2 border border-bg-3 rounded-lg">
          <PhoneCode setCode={setCode} page={page} />
          <InputMask
            mask="99 999-99-99"
            maskChar="_"
            type={type}
            placeholder={placeholder}
            name={name}
            id={name}
            required={required}
            autoComplete="off"
            disabled={noSelected}
            className="p-4 bg-bg-2 border-none w-full text-primary rounded-lg"
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
    <div className="flex flex-row gap-1 sm:w-auto w-full sm:bg-transparent bg-white rounded-full">
      <PhoneCode setCode={setCode} />
      <InputMask
        mask="99 999-99-99"
        maskChar="_"
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
        autoComplete="off"
        disabled={noSelected}
        className="rounded-full py-1 px-6 flex-1 border-transparent w-full sm:min-w-[250px] placeholder:font-medium placeholder:text-primary placeholder:text-opacity-25"
        {...register(name, validation)}
      />
    </div>
  );
}
