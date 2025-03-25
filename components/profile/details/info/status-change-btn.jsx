import React, { useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";
import axios from "axios";
import { ButtonSpinner } from "@/components/custom/loading";

export default function currentRoleChangeBtn({ currentRole }) {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);

  const handleUpdatecurrentRole = async () => {
    toast.error(intl.formatMessage({ id: "yet-has-not-working" }));
    // if (!currentRole) {
    //   toast.error(intl.formatMessage({ id: "Iltimos, currentRoleni tanlang!" }));
    //   return;
    // }

    // if (currentRole == 4) {
    //   toast.error(
    //     intl.formatMessage({ id: "Jamoa tanlash. Hali yakunlanmagan." })
    //   );
    //   return;
    // }

    // setLoading(true);

    // try {
    //   const response = await axios.post("/api/update-currentRole", {
    //     currentRole: currentRole,
    //   });

    //   if (response.data.success) {
    //     toast.success(
    //       intl.formatMessage({ id: "currentRole muvaffaqiyatli o‘zgartirildi!" })
    //     );
    //   } else {
    //     toast.error(
    //       intl.formatMessage({
    //         id: "Xatolik yuz berdi, qaytadan urinib ko‘ring!",
    //       })
    //     );
    //   }
    // } catch (error) {
    //   toast.error(intl.formatMessage({ id: "Serverda xatolik yuz berdi!" }));
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <button
      type="button"
      onClick={handleUpdatecurrentRole}
      disabled={loading}
      className="py-2 sm:py-3 px-5 rounded-lg bg-main bg-opacity-10 text-main font-medium mx-1 border border-transparent hover:border-main transition-colors duration-200 sm:text-base text-sm flex items-center justify-center"
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        intl.formatMessage({ id: "Statusni o’zgartirish" })
      )}
    </button>
  );
}
