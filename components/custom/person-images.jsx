import React from "react";

export default function PersonImages({
  images,
  type = "big",
  length,
  counter,
}) {
  return (
    <div className="flex items-center justify-center relative z-0 flex-wrap w-auto">
      {images?.slice(0, length)?.map((item, index) => {
        const isLast = index === images.length - 1;

        return (
          <div
            className={`relative ${type == "big" ? "-ml-3" : " -ml-4"}`}
            key={index}
          >
            <img
              src={item?.img}
              alt={item?.title}
              title={item?.title}
              className={`${
                type == "big"
                  ? "w-[60px] h-[60px] border"
                  : "w-11 h-11 border-2"
              }  rounded-full object-cover  border-white  first:ml-0`}
            />
            {isLast ? (
              <span className="text-xs font-semibold text-white bg-main py-[2px] px-2 rounded-full absolute -bottom-1 -right-4">
                {counter}
              </span>
            ) : (
              <> </>
            )}
          </div>
        );
      })}
    </div>
  );
}
