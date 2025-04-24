import Image from "next/image";
import React, { useState } from "react";

export default function LeftInfoProfilePicture({ path, full_name, is_online }) {
  const [imgSrc, setImgSrc] = useState(path ?? "/images/default.png");
  return (
    <span className="relative w-10 h-10">
      <span className="w-10 h-10 rounded-full overflow-hidden full__image">
        <Image
          src={imgSrc}
          title={full_name}
          alt=""
          width={0}
          height={0}
          className="w-full h-full object-cover"
          layout="responsive"
          onError={() => setImgSrc("/images/defaultAvatar.png")}
        />
      </span>
      {/* is_online */}
      <span
        className={`w-[6px] h-[6px] rounded-full ${
          is_online ? "bg-main" : "bg-bg-3"
        } absolute right-0 -bottom-[2px]`}
      ></span>
    </span>
  );
}
