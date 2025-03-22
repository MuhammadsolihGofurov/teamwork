import { GENDER_MALE } from "@/utils/data";
import React from "react";
import { useIntl } from "react-intl";

export default function Radio({
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
}) {
  const intl = useIntl();

  if (page === "gender") {
    const genders = [
      {
        id: 1,
        code: GENDER_MALE,
        title: intl.formatMessage({ id: "Erkak" }),
        icon: `
        <svg width="8" height="17" viewBox="0 0 8 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 15.5V12.5H1L2.5 8C2.5 7.80109 2.57902 7.61032 2.71967 7.46967C2.86032 7.32902 3.05109 7.25 3.25 7.25H4.75C4.94891 7.25 5.13968 7.32902 5.28033 7.46967C5.42098 7.61032 5.5 7.80109 5.5 8L7 12.5H5.5V15.5M5.5 2.75C5.5 3.57843 4.82843 4.25 4 4.25C3.17157 4.25 2.5 3.57843 2.5 2.75C2.5 1.92157 3.17157 1.25 4 1.25C4.82843 1.25 5.5 1.92157 5.5 2.75Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        `,
      },
      {
        id: 2,
        code: GENDER_MALE,
        title: intl.formatMessage({ id: "Ayol" }),
        icon: `<svg width="6" height="17" viewBox="0 0 6 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.5 15.5V11.75L0.75 11V8C0.75 7.80109 0.829018 7.61032 0.96967 7.46967C1.11032 7.32902 1.30109 7.25 1.5 7.25H4.5C4.69891 7.25 4.88968 7.32902 5.03033 7.46967C5.17098 7.61032 5.25 7.80109 5.25 8V11L4.5 11.75V15.5M4.5 2.75C4.5 3.57843 3.82843 4.25 3 4.25C2.17157 4.25 1.5 3.57843 1.5 2.75C1.5 1.92157 2.17157 1.25 3 1.25C3.82843 1.25 4.5 1.92157 4.5 2.75Z" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
      },
    ];

    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-normal text-primary pl-6">{title}</span>
        <div className="grid grid-cols-2 gap-1 bg-white rounded-full p-1">
          {genders?.map((gender) => (
            <label
              key={gender.id}
              className="gender__item flex items-center justify-center gap-2 cursor-pointer py-3 relative z-0 rounded-full transition-colors duration-200"
            >
              <input
                type="radio"
                name={name}
                value={gender?.code}
                className="absolute w-full h-full opacity-0 peer cursor-pointer"
                {...register(name, validation)}
              />
              <span
                className="gender__icon"
                dangerouslySetInnerHTML={{ __html: gender?.icon }}
              />
              <span className="gender__text peer-checked:text-white text-primary">{gender?.title}</span>

              <div className="absolute inset-0 rounded-full bg-bg-2 peer-checked:bg-primary transition-colors duration-200 -z-10"></div>
            </label>
          ))}
        </div>
        {errors?.message && (
          <span className="text-sm text-red-500 pl-6">{errors.message}</span>
        )}
      </div>
    );
  }

  return <div></div>;
}
