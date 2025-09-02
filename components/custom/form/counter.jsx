"use client";

import React from "react";
import { useController, useForm } from "react-hook-form";

export default function Counter({
  name,
  control,
  label,
  description,
  min = 0,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  disabled = false,
  className = "",
}) {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({ name, control, defaultValue: min });

  const current = typeof value === "number" ? value : Number(value) || 0;

  const increment = () => {
    if (disabled) return;
    const next = Math.min(current + step, max);
    onChange(next);
  };

  const decrement = () => {
    if (disabled) return;
    const next = Math.max(current - step, min);
    onChange(next);
  };

  const onInputChange = (e) => {
    const v = e.target.value;
    const n = v === "" ? "" : Number(v);
    if (v === "" || !Number.isNaN(n)) {
      if (v === "") onChange("");
      else onChange(Math.min(Math.max(n, min), max));
    }
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || current <= min}
        className={`w-14 h-14 flex items-center justify-center rounded-full border transition disabled:opacity-60 disabled:cursor-not-allowed`}
        aria-label="decrement"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.33301 8H12.6663"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <input
        ref={ref}
        value={value === "" ? "" : current}
        onChange={onInputChange}
        onBlur={onBlur}
        disabled={disabled}
        inputMode="numeric"
        className="w-14 text-center px-2 py-1 outline-none text-2xl"
        aria-label={typeof label === "string" ? label : name}
      />

      <button
        type="button"
        onClick={increment}
        disabled={disabled || current >= max}
        className={`w-14 h-14 flex items-center justify-center rounded-full border transition disabled:opacity-60 disabled:cursor-not-allowed`}
        aria-label="increment"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99967 3.33203V12.6654M3.33301 7.9987H12.6663"
            stroke="#222222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
