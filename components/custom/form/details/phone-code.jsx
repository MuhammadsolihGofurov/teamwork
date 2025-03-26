import React, { useState, useEffect, useRef } from "react";

export default function PhoneCode({ setCode, page }) {
  const [active, setActive] = useState("998");
  const [openClass, setOpenClass] = useState(false);
  const menuRef = useRef(null);

  const data = [
    { id: 1, name: "998" },
    { id: 2, name: "996" },
    { id: 3, name: "1" },
  ];

  const handleClickAndSetActive = (id) => {
    setActive(id);
    setOpenClass(false); // Element tanlanganda menyuni yopish
    setCode(id);
  };

  const handleClickAndOpenMenu = () => {
    setOpenClass((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenClass(false);
      }
    };

    if (openClass) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [openClass]);

  if (page == "info") {
    return (
      <div
        className={`h-[60px] p-[3px] bg-white rounded-full flex items-center justify-center relative z-10`}
        ref={menuRef}
      >
        {/* current */}
        <button
          role="button"
          type="button"
          className="w-[64px] small:w-[85px] bg-bg-2 rounded-full h-full"
          onClick={handleClickAndOpenMenu}
        >
          {"+" + active}
        </button>

        {/* all codes */}
        <div
          className={`absolute top-full flex gap-1 flex-col w-full bg-white rounded-3xl p-1 transition-transform duration-100 z-10 ${
            openClass
              ? "visible opacity-100 translate-y-0 transition-transform duration-150"
              : "invisible opacity-0 translate-y-3 transition-transform duration-150"
          }`}
        >
          {data.map((item, index) => (
            <button
              type="button"
              key={index + item.name}
              className={`w-full h-[42px] border ${
                item.name === active ? "border-main" : "border-bg-1"
              } bg-bg-2 rounded-full`}
              onClick={() => handleClickAndSetActive(item.name)}
            >
              {"+" + item.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (page == "profile") {
    return (
      <div
        className={`h-[54px] p-[3px] bg-white rounded-lg flex items-center justify-center relative z-10`}
        ref={menuRef}
      >
        {/* current */}
        <button
          role="button"
          type="button"
          className="w-[64px] small:w-[85px] rounded-full h-full"
          onClick={handleClickAndOpenMenu}
        >
          {"+" + active}
        </button>

        {/* all codes */}
        <div
          className={`absolute top-full flex gap-1 flex-col w-full bg-white rounded-lg shadow-md p-1 transition-transform duration-100 z-10 ${
            openClass
              ? "visible opacity-100 translate-y-0 transition-transform duration-150"
              : "invisible opacity-0 translate-y-3 transition-transform duration-150"
          }`}
        >
          {data.map((item, index) => (
            <button
              type="button"
              key={index + item.name}
              className={`w-full h-[42px] border ${
                item.name === active ? "border-main" : "border-bg-1"
              } bg-bg-2 rounded-lg`}
              onClick={() => handleClickAndSetActive(item.name)}
            >
              {"+" + item.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-[54px] p-[3px] bg-white rounded-full flex items-center justify-center relative z-10`}
      ref={menuRef}
    >
      {/* current */}
      <button
        role="button"
        type="button"
        className="w-[64px] small:w-[85px] bg-bg-2 rounded-full h-full"
        onClick={handleClickAndOpenMenu}
      >
        {"+" + active}
      </button>

      {/* all codes */}
      <div
        className={`absolute top-full flex gap-1 flex-col w-full bg-white rounded-3xl p-1 transition-transform duration-100 z-10 ${
          openClass
            ? "visible opacity-100 translate-y-0 transition-transform duration-150"
            : "invisible opacity-0 translate-y-3 transition-transform duration-150"
        }`}
      >
        {data.map((item, index) => (
          <button
            type="button"
            key={index + item.name}
            className={`w-full h-[42px] border ${
              item.name === active ? "border-main" : "border-bg-1"
            } bg-bg-2 rounded-full`}
            onClick={() => handleClickAndSetActive(item.name)}
          >
            {"+" + item.name}
          </button>
        ))}
      </div>
    </div>
  );
}
