import React from "react";

export default function PersonImages({
  images,
  type = "big",
  length,
  counter,
}) {
  return (
    <div className="flex items-center relative z-0 flex-wrap w-auto">
      {images?.slice(0, length)?.map((item, index) => (
        <img
          src={item?.img}
          alt={item?.title}
          title={item?.title}
          key={index}
          className={`${
            type == "big" ? "w-[60px] h-[60px] border-4" : "w-11 h-11 border-2"
          }  rounded-full object-cover  border-white -ml-4 first:ml-0`}
        />
      ))}
      <span className="text-xs font-semibold text-white bg-main py-[2px] px-2 rounded-full absolute -bottom-1 -right-4">
        {counter}
      </span>
    </div>
  );
}
