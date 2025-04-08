import { Rates } from "@/components/Utils";
import Image from "next/image";
import React, { useState } from "react";

export default function ProfileRate({ rate, full_name, path }) {
  const [imgSrc, setImgSrc] = useState(path ?? "/images/default.png");

  return (
    <>
      <div className="w-16 small:w-[90px] h-16 small:h-[90px] overflow-hidden full__image rounded-full">
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
      </div>
      <p className="text-sm">{rate || 0}</p>
      <Rates current_rate={rate} />
    </>
  );
}
