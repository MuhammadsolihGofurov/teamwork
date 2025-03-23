import React from "react";
import { Breadcrumbs } from "../custom";

export default function ProfileWrapper({ children, breads }) {
  return (
    <section className="4xl:mx-5 6xl:bg-bg-2 rounded-2xl mt-[100px] py-3">
      <div className="container">
        <Breadcrumbs data={breads} isReturn={false} />
        <main role="main" className="py-5 flex flex-row gap-4">
          {children}
        </main>
      </div>
    </section>
  );
}
