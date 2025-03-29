import React, { useState } from "react";
import axios from "axios";
import { authAxios } from "@/utils/axios";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";

export default function LikeBtn({
  id,
  is_favorite,
  type = "tasks",
  page = "default",
}) {
  const [isFavorite, setIsFavorite] = useState(is_favorite);
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const toggleLike = async () => {
    if (loading) return;
    setLoading(true);

    const url =
      type === "experts"
        ? `/user/add-expert-to-favourites?expert_id=${id}&action=${
            isFavorite ? 0 : 1
          }`
        : `/user/add-task-to-favourites?task_id=${id}&action=${
            isFavorite ? 0 : 1
          }`;

    try {
      const response = await authAxios.get(url);
      toast.success(response?.data?.message);
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (page == "details") {
    return (
      <button
        type="button"
        title="like"
        className={`group/button flex items-center gap-1 hover:text-main transition-colors font-medium duration-150 ${
          is_favorite ? "text-main" : "text-primary"
        }`}
        onClick={toggleLike}
        disabled={loading}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2501 10.4766L10.0001 16.6666L3.75009 10.4766C3.33784 10.0754 3.01312 9.59325 2.79638 9.06043C2.57963 8.52762 2.47556 7.9557 2.4907 7.38068C2.50585 6.80567 2.63989 6.24002 2.88439 5.71935C3.12888 5.19868 3.47853 4.73428 3.91133 4.35539C4.34412 3.97649 4.85068 3.69131 5.3991 3.5178C5.94752 3.3443 6.52593 3.28622 7.09789 3.34724C7.66986 3.40825 8.223 3.58703 8.72248 3.87233C9.22196 4.15762 9.65696 4.54324 10.0001 5.0049C10.3447 4.54659 10.7802 4.16434 11.2793 3.88207C11.7785 3.59981 12.3305 3.42361 12.9009 3.3645C13.4712 3.3054 14.0477 3.36465 14.5941 3.53856C15.1405 3.71247 15.6451 3.9973 16.0764 4.37521C16.5077 4.75311 16.8563 5.21597 17.1004 5.73481C17.3446 6.25365 17.479 6.81731 17.4953 7.39049C17.5117 7.96368 17.4095 8.53406 17.1952 9.06594C16.9809 9.59783 16.6592 10.0798 16.2501 10.4816"
            stroke="#222"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`group-hover/button:stroke-main transition-colors duration-150 ${
              isFavorite ? "fill-main stroke-main" : "stroke-primary"
            }`}
          />
        </svg>

        <span className="sm:inline hidden">
          {intl.formatMessage({ id: "Saralangan" })}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      title="like"
      className="group/button"
      onClick={toggleLike}
      disabled={loading}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.4998 12.5719L11.9998 19.9999L4.49981 12.5719C4.00512 12.0905 3.61546 11.5119 3.35536 10.8726C3.09527 10.2332 2.97037 9.54688 2.98855 8.85687C3.00673 8.16685 3.16758 7.48807 3.46097 6.86327C3.75436 6.23847 4.17395 5.68119 4.6933 5.22651C5.21265 4.77184 5.82052 4.42962 6.47862 4.22141C7.13673 4.01321 7.83082 3.94352 8.51718 4.01673C9.20354 4.08995 9.86731 4.30449 10.4667 4.64684C11.0661 4.98919 11.5881 5.45193 11.9998 6.00593C12.4133 5.45595 12.9359 4.99725 13.5349 4.65854C14.1339 4.31982 14.7963 4.10838 15.4807 4.03745C16.1652 3.96652 16.8569 4.03763 17.5126 4.24632C18.1683 4.45502 18.7738 4.79681 19.2914 5.2503C19.8089 5.70379 20.2272 6.25922 20.5202 6.88182C20.8132 7.50443 20.9746 8.18082 20.9941 8.86864C21.0137 9.55647 20.8911 10.2409 20.6339 10.8792C20.3768 11.5174 19.9907 12.0958 19.4998 12.5779"
          stroke="#BABABA"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`group-hover/button:stroke-main transition-colors duration-150 ${
            isFavorite ? "fill-main stroke-main" : "stroke-[#bababa]"
          }`}
        />
      </svg>
    </button>
  );
}
