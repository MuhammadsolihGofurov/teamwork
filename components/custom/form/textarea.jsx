import React, { useState, useEffect } from "react";

export default function Textarea({
  placeholder,
  name,
  title,
  required,
  register,
  validation,
  noSelected = false,
  errors,
  page,
  minHeight,
  hint,
}) {
  const [height, setHeight] = useState("auto");

  const handleInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  useEffect(() => {
    const textarea = document.getElementById(name);
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, []);

  if (page == "with-border") {
    return (
      <label className="flex flex-col gap-1 w-full">
        {title ? (
          <span className="text-sm font-semibold text-primary pb-1 pl-3">
            {title}
          </span>
        ) : (
          <></>
        )}
        <textarea
          placeholder={placeholder}
          name={name}
          id={name}
          required={required}
          autoComplete="off"
          disabled={noSelected}
          className={`rounded-lg p-4 border ${
            minHeight ? minHeight : "min-h-[150px]"
          } border-gray-300 bg-white w-full overflow-hidden placeholder:text-gray-400 text-gray-900 resize-none`}
          {...register(name, validation)}
          style={{ height }}
          onInput={handleInput}
        />
        {errors?.message && (
          <span className="text-red-500">{errors.message}</span>
        )}
      </label>
    );
  }

  if (page == "with-bg") {
    return (
      <label className="flex flex-col gap-1 w-full">
        {title ? (
          <span className="text-sm font-semibold text-primary pb-1 pl-3">
            {title}
          </span>
        ) : (
          <></>
        )}
        <textarea
          placeholder={placeholder}
          name={name}
          id={name}
          required={required}
          autoComplete="off"
          disabled={noSelected}
          className={`rounded-lg p-4 border ${
            minHeight ? minHeight : "min-h-[150px]"
          } border-bg-3  bg-bg-2 w-full overflow-hidden placeholder:text-gray-400 text-gray-900 resize-none`}
          {...register(name, validation)}
          style={{ height }}
          onInput={handleInput}
        />
        {errors?.message && (
          <span className="text-red-500">{errors.message}</span>
        )}
      </label>
    );
  }

  return (
    <label className="flex flex-col gap-1 w-full">
      {title ? (
        <span className="text-base font-medium text-primary pb-1">{title}</span>
      ) : (
        <></>
      )}
      <textarea
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
        autoComplete="off"
        disabled={noSelected}
        className={`rounded-lg p-4 border ${
          minHeight ? minHeight : "min-h-[150px]"
        } border-gray-300 bg-white w-full overflow-hidden placeholder:text-gray-400 text-gray-900 resize-none`}
        {...register(name, validation)}
        style={{ height }}
        onInput={handleInput}
      />
      {hint ? (
        <span
          className={`text-sm  pt-3 ${
            errors?.message ? "text-red-500" : "text-main"
          }`}
        >
          {errors?.message ?? hint}
        </span>
      ) : (
        errors?.message && (
          <span className="text-red-500">{errors.message}</span>
        )
      )}
    </label>
  );
}
