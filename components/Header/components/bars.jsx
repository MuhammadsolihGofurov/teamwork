import { setToggleMenuOffcanvas } from "@/redux/slice/settings";
import React from "react";
import { useDispatch } from "react-redux";

export default function Bars() {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(setToggleMenuOffcanvas());
  };

  return (
    <button
      type="button"
      className="sm:hidden block p-1"
      onClick={() => handleToggle()}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 7L4 7"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 12L4 12"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 17L4 17"
          stroke="#222222"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
