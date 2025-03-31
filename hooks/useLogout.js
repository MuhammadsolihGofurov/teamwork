import {
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { LoginUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useState } from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";

export default function useLogout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const intl = useIntl();

  const logOut = async () => {
    setLoading(true);
    try {
      // Redux orqali user ma'lumotlarini tozalash

      // LocalStorage / cookies tozalash
      localStorage.removeItem(REGISTERAUTHKEY);
      localStorage.removeItem(REGISTERASUSERTYPE);
      localStorage.removeItem(REGISTERPHONENUMBER);

      toast.success(intl.formatMessage({ id: "success-log-out" }));

      // Login sahifasiga redirect qilish
      setTimeout(() => {
        router.push(`/${LoginUrl}`);
      }, 500);
    } catch (error) {
      // console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { logOut, loading };
}
