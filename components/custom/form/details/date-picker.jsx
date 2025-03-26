"use client";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";

const Datepicker = dynamic(() => import("react-tailwindcss-datepicker"), {
  ssr: false, // ✅ Serverda yuklanmaydi
});

export default function DatePickerUi({
  name,
  title,
  required,
  register = () => {},
  validation,
  noSelected = false,
  errors,
  control,
  page,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (page == "profile") {
    return (
      <label
        className="flex flex-col gap-1 data-picker relative z-[1]"
        htmlFor={name}
      >
        <span className="text-base font-medium text-primary pb-1">{title}</span>
        <span className="w-full relative z-0">
          {/* <span className="absolute top-2/4 -translate-y-2/4 right-6 z-[1]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2.25V5.25M6 2.25V5.25M3 8.25H15M8.25 11.25H9V13.5M4.5 3.75H13.5C14.3284 3.75 15 4.42157 15 5.25V14.25C15 15.0784 14.3284 15.75 13.5 15.75H4.5C3.67157 15.75 3 15.0784 3 14.25V5.25C3 4.42157 3.67157 3.75 4.5 3.75Z"
                stroke="#222222"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span> */}
          <Controller
            name={name}
            control={control}
            rules={validation}
            render={({ field }) => {
              return (
                <Datepicker
                  value={field.value}
                  asSingle={true}
                  useRange={false}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  disabled={noSelected}
                  lightMode={true}
                  primaryColor="blue"
                  inputClassName="w-full px-4 py-4 rounded-lg bg-bg-2 border border-bg-3 text-primary"
                />
              );
            }}
          />
        </span>
        {errors?.message && (
          <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
        )}
      </label>
    );
  }

  return (
    <label
      className="flex flex-col gap-2 data-picker relative z-[1]"
      htmlFor={name}
    >
      <span className="text-sm font-normal text-primary pl-6">{title}</span>
      <span className="w-full relative z-0">
        <span className="absolute top-2/4 -translate-y-2/4 left-6 z-[1]">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2.25V5.25M6 2.25V5.25M3 8.25H15M8.25 11.25H9V13.5M4.5 3.75H13.5C14.3284 3.75 15 4.42157 15 5.25V14.25C15 15.0784 14.3284 15.75 13.5 15.75H4.5C3.67157 15.75 3 15.0784 3 14.25V5.25C3 4.42157 3.67157 3.75 4.5 3.75Z"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <Controller
          name={name}
          control={control}
          rules={validation}
          render={({ field }) => (
            <Datepicker
              value={field.value}
              asSingle={true}
              useRange={false}
              onChange={(date) => {
                field.onChange(date);
              }}
              disabled={noSelected}
              lightMode={true}
              primaryColor="blue"
              inputClassName="w-full py-5 pl-[50px] pr-6 rounded-[32px] bg-white border-none text-primary"
            />
            // <Datepicker
            //   className="w-full"
            //   selected={field.value}
            //   onChange={field.onChange}
            //   disabled={noSelected}
            //   style={{
            //     padding: "20px 24px 20px 50px",
            //     borderRadius: "32px",
            //     background: "#fff",
            //     border: "none",
            //   }}
            // />
          )}
        />
      </span>
      {errors?.message && (
        <span className="text-sm text-red-500 pl-6">{errors?.message}</span>
      )}
    </label>
  );
}
