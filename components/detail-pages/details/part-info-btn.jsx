import { LikeBtn } from "@/components/cards/details";
import { formatDateForCard } from "@/utils/funcs";
import React from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";

export default function PartInfoBtn({
  type = "tasks",
  published_date,
  id,
  is_favorite,
}) {
  if (type === "experts") {
    return <></>;
  }

  return (
    <div className="flex items-center justify-between py-6 sm:py-8">
      <div className="flex items-center gap-1 ">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66683 7.49984H13.3335M6.66683 10.8332H11.6668M3.3335 17.4998V6.6665C3.3335 6.00346 3.59689 5.36758 4.06573 4.89874C4.53457 4.4299 5.17045 4.1665 5.8335 4.1665H14.1668C14.8299 4.1665 15.4658 4.4299 15.9346 4.89874C16.4034 5.36758 16.6668 6.00346 16.6668 6.6665V11.6665C16.6668 12.3295 16.4034 12.9654 15.9346 13.4343C15.4658 13.9031 14.8299 14.1665 14.1668 14.1665H6.66683L3.3335 17.4998Z"
            stroke="#121212"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-primary text-sm font-medium">
          {formatDateForCard(published_date)}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <ShareBtn />
        <LikeBtn page="details" id={id} type={type} is_favorite={is_favorite} />
      </div>
    </div>
  );
}

export const ShareBtn = () => {
  const intl = useIntl();
  const currentUrl = encodeURIComponent(
    typeof window !== "undefined" ? window?.location?.href : ""
  );

  const shares = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Telegram" }),
      value: `https://t.me/share/url?url=${currentUrl}`,
      icon: "/images/telegram.svg",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Instagram" }),
      value: `https://www.instagram.com/`, // Instagram post ulashish imkoniyati yo'q
      icon: "/images/instagram.svg",
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Facebook" }),
      value: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      icon: "/images/facebook.svg",
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Copy link" }),
      value: currentUrl,
      icon: "/images/copy.svg",
    },
  ];

  const handleShare = (url, isCopy = false) => {
    if (isCopy) {
      navigator.clipboard.writeText(url);
      toast.success(intl.formatMessage({ id: "Muvaffaqiyatli nusxalandi." }));
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative group">
      <button type="button" className="flex items-center gap-1">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.25001 11.0833L12.75 13.9167M7.25001 8.91663L12.75 6.08329M7.5 10C7.5 8.61929 6.38071 7.5 5 7.5C3.61929 7.5 2.5 8.61929 2.5 10C2.5 11.3807 3.61929 12.5 5 12.5C6.38071 12.5 7.5 11.3807 7.5 10ZM17.5 15C17.5 13.6193 16.3807 12.5 15 12.5C13.6193 12.5 12.5 13.6193 12.5 15C12.5 16.3807 13.6193 17.5 15 17.5C16.3807 17.5 17.5 16.3807 17.5 15ZM17.5 5C17.5 3.61929 16.3807 2.5 15 2.5C13.6193 2.5 12.5 3.61929 12.5 5C12.5 6.38071 13.6193 7.5 15 7.5C16.3807 7.5 17.5 6.38071 17.5 5Z"
            stroke="#121212"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-primary font-medium sm:inline hidden text-[15px]">
          {intl.formatMessage({ id: "Ulashish" })}
        </span>
      </button>

      <div className="absolute top-full -right-5 sm:-left-5 w-[140px] px-[10px] py-3 flex flex-col gap-0 bg-white shadow_md rounded-xl opacity-0 invisible translate-y-5 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-transform duration-150">
        {shares.map((item) => (
          <button
            key={item.id}
            onClick={() => handleShare(item.value, item.id === 4)}
            className="flex items-center gap-1 px-2 py-2 text-[15px] text-primary hover:bg-main hover:bg-opacity-10 transition-colors duration-150 rounded-lg"
          >
            <img
              src={item.icon}
              alt={item.name}
              title={item.name}
              loading="lazy"
              className="w-4 h-4"
            />
            <span className="flex-1 text-start">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
