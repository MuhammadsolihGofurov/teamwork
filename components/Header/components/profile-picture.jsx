import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

export default function ProfilePicture() {
  const { profilePercentage, user_info } = useSelector((state) => state.user);
  const percentage = Math.min(Math.max(profilePercentage, 0), 100);

  return (
    <span className="w-11 h-11 flex items-center justify-center bg-white rounded-full relative z-0">
      <svg className="absolute top-0 left-0 w-11 h-11" viewBox="0 0 36 36">
        {/* Orqa fon halqasi */}
        <circle
          className="text-bg-2"
          strokeWidth="2"
          fill="none"
          r="16"
          cx="18"
          cy="18"
          stroke="currentColor"
        />
        {/* Progress halqasi */}
        <circle
          className="text-main"
          strokeWidth="3"
          strokeDasharray="100" // Halqa uzunligi
          strokeDashoffset={0 - percentage} // Progressni soatga teskari harakatlantirish
          strokeLinecap="round"
          fill="none"
          r="16"
          cx="18"
          cy="18"
          stroke="currentColor"
          style={{
            transform: "rotate(-90deg)", // Starts from top
            transformOrigin: "center", // Ensures the center is the pivot
          }}
        />
      </svg>
      {user_info?.photoUrl ? (
        <Image
          src={user_info?.photoUrl ?? "/images/defaultAvatar.png"}
          title={user_info?.full_name || "User Avatar"}
          alt="Profile Image"
          role="img"
          loading="lazy"
          width={36}
          height={36}
          className="w-9 h-9 object-cover"
        />
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="9" cy="4.5" r="3" stroke="#222222" strokeWidth="1.5" />
          <path
            d="M15 13.125C15 14.989 15 16.5 9 16.5C3 16.5 3 14.989 3 13.125C3 11.261 5.68629 9.75 9 9.75C12.3137 9.75 15 11.261 15 13.125Z"
            stroke="#222222"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </span>
  );
}
