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

  return (
    <label className="flex flex-col gap-1 w-full">
      <span className="text-base font-medium text-primary pb-1">{title}</span>
      <textarea
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
        autoComplete="off"
        disabled={noSelected}
        className="rounded-lg p-4 border border-gray-300 bg-white w-full overflow-hidden placeholder:text-gray-400 text-gray-900 resize-none"
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
