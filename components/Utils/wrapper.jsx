import React from "react";

export default function Wrapper({ children }) {
  return (
    <main role="main" className="pt-20 sm:pt-[100px]">
      {children}
    </main>
  );
}
