import React, { useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import axios from "axios";

export default function StatusChangeBtn({ status }) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async () => {
    if (!status) {
      toast.error(intl.formatMessage({ id: "Iltimos, statusni tanlang!" }));
      return;
    }

    if (status == 4) {
      toast.error(
        intl.formatMessage({ id: "Jamoa tanlash. Hali yakunlanmagan." })
      );
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/update-status", {
        status: status,
      });

      if (response.data.success) {
        toast.success(
          intl.formatMessage({ id: "Status muvaffaqiyatli o‘zgartirildi!" })
        );
      } else {
        toast.error(
          intl.formatMessage({
            id: "Xatolik yuz berdi, qaytadan urinib ko‘ring!",
          })
        );
      }
    } catch (error) {
      toast.error(intl.formatMessage({ id: "Serverda xatolik yuz berdi!" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleUpdateStatus}
      disabled={loading}
      className="py-2 sm:py-3 px-5 rounded-lg bg-main bg-opacity-10 text-main font-medium mx-1 border border-transparent hover:border-main transition-colors duration-200 sm:text-base text-sm"
    >
      {loading
        ? intl.formatMessage({ id: "Yuklanmoqda..." })
        : intl.formatMessage({ id: "Statusni o’zgartirish" })}
    </button>
  );
}
