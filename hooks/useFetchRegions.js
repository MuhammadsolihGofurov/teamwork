import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function useFetchRegions(selectedId) {
  const [regions, setRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!selectedId) {
      setRegions([]);
      return;
    }

    const fetchRegions = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/region/list?country_id=${selectedId}`, {
          headers: {
            "Accept-Language": router.locale,
          },
        });

        if (!res.ok) {
          throw new Error("Ma'lumotlarni yuklab bo‘lmadi");
        }

        const data = await res.json();
        setRegions(data?.data?.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegions();
  }, [selectedId]); // ✅ selectedId o‘zgarganda useEffect qayta ishga tushadi

  return { regions, isLoading, error };
}
