import React from "react";
import LogoMain from "./logo";
import Menu from "./menu";
import { Lang } from "../components";
import RightBtns from "./right-btn";
import ProfileBox from "../components/profile-box";
import Bars from "../components/bars";

export default function MainHeader() {
  return (
    <div className="container flex justify-between items-center">
      <Bars />
      <Menu type="header" />
      <LogoMain />
      <Lang type="header" />
      <RightBtns />
      <ProfileBox />
    </div>
  );
}
