import React from "react";
import { useIntl } from "react-intl";

export default function ExpertHistory({ history }) {
  const intl = useIntl();
  return (
    <div className="flex flex-col gap-4 text-primary border-b border-bg-3 pb-7 sm:pb-0 sm:border-transparent">
      <h3 className="sm:hidden block font-semibold text-lg">
        {intl.formatMessage({ id: "Buyurtmalar tarixi" })}
      </h3>
      {history?.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <NextLink url={""} className="flex flex-col gap-3 group">
              <div className="w-full h-[225px] rounded-lg overflow-hidden full__image relative">
                <Image
                  src={"/images/left-banner.png"}
                  width={0}
                  height={0}
                  layout="responsive"
                  alt="title"
                  title="alt"
                  className="w-full h-full object-cover"
                />
                <div className="absolute right-1 bottom-1 w-11 h-11 rounded-lg bg-white flex items-center justify-center group-hover:border-main border border-white transition-colors duration-150">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7V16M17 7H8"
                      stroke="#121212"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="group-hover:stroke-main transition-colors duration-150"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="px-3 text-primary font-medium text-base">
                Ilova uchun yangi 2024 yil Design concept
              </h4>
              <div className="flex flex-wrap gap-2 px-3">
                <p className="rounded-full px-3 py-2 text-sm border border-bg-3 text-primary font-normal hover:border-primary transition-colors duration-150">
                  veb-dizayn
                </p>
              </div>
            </NextLink>
          </div>
          {/* slider yasash kerak mobile version uchun */}
        </>
      ) : (
        <p className="text-center text-sm sm:text-base text-opacity-80 text-primary">
          {intl.formatMessage({ id: "Ma'lumotlar mavjud emas." })}
        </p>
      )}
    </div>
  );
}
