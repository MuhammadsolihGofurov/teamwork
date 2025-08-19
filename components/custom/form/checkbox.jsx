import React from "react";
import { Controller } from "react-hook-form";

export default function Checkbox({ control, name, label, rules }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={name}
            checked={field.value || false}
            onChange={(e) => field.onChange(e.target.checked)}
            className="w-4 h-4 border-gray-300 rounded accent-main"
          />
          <div className="flex flex-col">
            <label
              htmlFor={name}
              className="text-sm text-primary cursor-pointer"
            >
              {label}
            </label>
            {error && <p className="text-red-500 text-xs">{error.message}</p>}
          </div>
        </div>
      )}
    />
  );
}
