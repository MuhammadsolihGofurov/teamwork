import React from "react";
import { Breadcrumbs } from "../custom";

export default function ProfileWrapper({
  children,
  breads,
  indexNum,
  tabsMenu,
  isMenuShow,
  tabsMenuCounts,
  tabsMenuQuery,
}) {
  return (
    <section className="4xl:mx-5 4xl:bg-bg-2 rounded-2xl mt-20 sm:mt-[100px] sm:py-3">
      <Breadcrumbs
        data={breads}
        isReturn={false}
        page="profile"
        indexNum={indexNum}
        tabsMenu={tabsMenu}
        isMenuShow={isMenuShow}
        tabsMenuCounts={tabsMenuCounts}
        tabsMenuQuery={tabsMenuQuery}
      />
      <div className="container">
        <Breadcrumbs data={breads} isReturn={false} />
        <main
          role="main"
          className="py-4 sm:py-5 flex flex-col sm:flex-row gap-4 2xl:gap-6 sm:items-start justify-between"
        >
          {children}
        </main>
      </div>
    </section>
  );
}
