import React from "react";

export default function Rates({ current_rate, isBig = false }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => {
        const filledStars = Math.floor(current_rate || 0);
        const isFilled = index < filledStars;
        return (
          <svg
            key={index}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={` ${isBig ? "w-4 h-4" : "w-3 h-3"} `}
          >
            <path
              d="M5.99992 8.87498L2.91392 10.4975L3.50342 7.06098L1.00342 4.62748L4.45342 4.12748L5.99642 1.00098L7.53942 4.12748L10.9894 4.62748L8.48942 7.06098L9.07892 10.4975L5.99992 8.87498Z"
              fill={isFilled ? "#98BE00" : "#DDDDDD"}
              stroke={isFilled ? "#98BE00" : "#DDDDDD"}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      })}
    </div>
  );
}
