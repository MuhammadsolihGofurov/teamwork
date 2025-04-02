import React from "react";
import { LogOut, MenuLinksBox, PictureBox, UserNameBox } from "./details";

export default function LeftInfoProfile({ isMobile = false }) {
  return (
    <div
      id="left-info-profile"
      className={`w-full sm:w-2/6 2xl:w-[21%] ${
        isMobile ? "sm:hidden flex" : "sm:flex hidden"
      } flex-col gap-2 `}
    >
      <PictureBox />
      <UserNameBox />
      <MenuLinksBox />
      <LogOut />
    </div>
  );
}
