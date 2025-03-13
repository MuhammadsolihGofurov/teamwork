import React from "react";

export default function RegWrapper({ children }) {
  return (
    <section className="sm:bg-white bg-bg-2">
      <div className="container">
        <main role="main" className="pt-20 sm:pt-[100px] pb-14 flex flex-row gap-4">
          {children}
        </main>
      </div>
    </section>
  );
}
