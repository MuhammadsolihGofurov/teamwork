import React from "react";
import LogoMain from "./logo";
import RightBtns from "./right-btns";
import MainBars from "./bars";

export default function MainHeader() {
  return (
    <div className="container flex justify-between items-center">
      <LogoMain />
      <RightBtns />
      <div className="lg:hidden block">
        <MainBars />
      </div>
    </div>
  );
}
