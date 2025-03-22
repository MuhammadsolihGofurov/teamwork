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
