import React from "react";
import { PictureBox, UserNameBox } from "./details";

export default function LeftInfoProfile() {
  return (
    <section id="left-info-profile" className="w-full sm:w-1/5 flex flex-col gap-2">
      <PictureBox />
      <UserNameBox />
    </section>
  );
}
