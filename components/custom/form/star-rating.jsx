import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Star } from "lucide-react";

export default function StarRating({ control, name, rules, defaultValue = 0 }) {
  const [hovered, setHovered] = useState(0);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => field.onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-10 h-10 transition-colors duration-200 ${
                  (hovered || field.value) >= star
                    ? "fill-main text-main"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    />
  );
}
