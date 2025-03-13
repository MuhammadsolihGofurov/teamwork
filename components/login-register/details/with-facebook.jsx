import React from "react";

export default function WithFacebook({ anyClass }) {
  return (
    <a href="#" className={`w-[135px] sm:w-[54px] h-[54px] gap-2 text-white rounded-full bg-facebook flex items-center justify-center ${anyClass}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.3598 5.27996H17.7598C18.0247 5.27996 18.2398 5.06492 18.2398 4.79996V1.5662C18.2398 1.31468 18.0463 1.1054 17.7958 1.08764C17.0321 1.0334 15.5402 0.959961 14.4674 0.959961C11.5198 0.959961 9.59977 2.72636 9.59977 5.9366V9.11996H6.23977C5.97481 9.11996 5.75977 9.335 5.75977 9.59996V12.96C5.75977 13.2249 5.97481 13.44 6.23977 13.44H9.59977V22.56C9.59977 22.8249 9.81481 23.04 10.0798 23.04H13.4398C13.7047 23.04 13.9198 22.8249 13.9198 22.56V13.44H17.3863C17.6311 13.44 17.8366 13.2561 17.8634 13.0128L18.2369 9.65276C18.2686 9.3686 18.0458 9.11996 17.7598 9.11996H13.9198V6.71996C13.9198 5.9246 14.5644 5.27996 15.3598 5.27996Z"
          fill="white"
        />
      </svg>
      <span className="sm:hidden inline">Facebook</span>
    </a>
  );
}
