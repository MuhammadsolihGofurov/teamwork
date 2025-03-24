import React from "react";
import { LogOut, MenuLinksBox, PictureBox, UserNameBox } from "./details";

export default function LeftInfoProfile() {
  return (
    <div
      id="left-info-profile"
      className="w-full sm:w-1/5 flex flex-col gap-2"
    >
      <PictureBox />
      <UserNameBox />
      <MenuLinksBox />
      <LogOut />
    </div>
  );
}
