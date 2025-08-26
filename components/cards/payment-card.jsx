import { formatDateForPayment, thousandSeperate } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";

export default function PaymentCard({ data }) {
  const intl = useIntl();
  return (
    <tr className="bg-white rounded-lg p-3 border flex items-center gap-4 justify-between border-bg-2 mb-2">
      <td className="w-8">
        {data?.type?.value == 1 ? (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="16"
              r="15.5"
              transform="rotate(180 16 16)"
              fill="white"
              stroke="#FF9533"
            />
            <path
              d="M18.666 18.668L13.3327 13.3346M18.666 18.668H13.866M18.666 18.668V13.868"
              stroke="#FF9533"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="15.5" fill="white" stroke="#98BE00" />
            <path
              d="M13.334 13.332L18.6673 18.6654M13.334 13.332H18.134M13.334 13.332V18.132"
              stroke="#98BE00"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </td>
      <td className="w-1/5 text-primary">
        <p className="text-primary text-sm">
          {thousandSeperate(data?.value || 0)}{" "}
          {intl.formatMessage({ id: "so'm" })}
        </p>
      </td>
      <td className="w-1/5">
        <p className="text-primary text-sm">
          {formatDateForPayment(data?.created_at)}
        </p>
      </td>
      <td className="w-2/5">
        <p className="text-primary text-sm line-clamp-1">
          {data?.reason?.label}
        </p>
      </td>
      <td>
        <button type="button">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.4">
              <path
                d="M7.99967 8.66602C8.36786 8.66602 8.66634 8.36754 8.66634 7.99935C8.66634 7.63116 8.36786 7.33268 7.99967 7.33268C7.63148 7.33268 7.33301 7.63116 7.33301 7.99935C7.33301 8.36754 7.63148 8.66602 7.99967 8.66602Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99967 13.3327C8.36786 13.3327 8.66634 13.0342 8.66634 12.666C8.66634 12.2978 8.36786 11.9993 7.99967 11.9993C7.63148 11.9993 7.33301 12.2978 7.33301 12.666C7.33301 13.0342 7.63148 13.3327 7.99967 13.3327Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.99967 3.99935C8.36786 3.99935 8.66634 3.70087 8.66634 3.33268C8.66634 2.96449 8.36786 2.66602 7.99967 2.66602C7.63148 2.66602 7.33301 2.96449 7.33301 3.33268C7.33301 3.70087 7.63148 3.99935 7.99967 3.99935Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </td>
    </tr>
  );
}
