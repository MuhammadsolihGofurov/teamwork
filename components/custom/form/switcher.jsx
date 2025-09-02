"use client";

import React from "react";
import { useController, useForm } from "react-hook-form";

// Switcher component (28px x 16px) — works with react-hook-form
// Props:
// - name: string (required) — field name for RHF
// - control: control object from useForm() (required)
// - label: optional string or React node for the visible label
// - description: optional string or React node below the label
// - disabled: optional boolean
// - className: optional extra classes for wrapper

export default function Switcher({
  name,
  control,
  label,
  description,
  disabled = false,
  className = "",
}) {
  const {
    field: { value, onChange, onBlur, ref },
  } = useController({ name, control, defaultValue: false });

  const isOn = Boolean(value);

  return (
    <div className={`flex items-start justify-start gap-3 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          role="switch"
          id={name}
          aria-checked={isOn}
          aria-label={typeof label === "string" ? label : name}
          checked={isOn}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={onBlur}
          ref={ref}
          disabled={disabled}
          className="sr-only"
        />

        <button
          type="button"
          onClick={() => !disabled && onChange(!isOn)}
          disabled={disabled}
          aria-pressed={isOn}
          className={`relative w-8 h-5 rounded-full transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 flex-shrink-0
${isOn ? "bg-main" : "bg-gray-200"}
${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200
${isOn ? "translate-x-3" : "translate-x-0"}
`}
          />
        </button>
      </div>
      <div className="flex-1 min-w-0">
        {label && (
          <label
            onClick={() => !disabled && onChange(!isOn)}
            className={`block text-sm font-medium select-none cursor-pointer ${
              disabled ? "text-gray-400" : "text-gray-900"
            }`}
          >
            {label}
          </label>
        )}
        {description && (
          <p
            className={`text-xs leading-4 ${
              disabled ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
