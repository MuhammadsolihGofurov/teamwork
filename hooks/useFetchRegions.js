import { useEffect, useState, useCallback } from "react";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export function useFetchRegions() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { country_id } = useSelector((state) => state.settings);

  const fetchData = useCallback(async () => {
    if (!country_id) return;

    // console.error("API chaqirilyapti: /region/list?country_id=" + country_id);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetcher(`/region/list?country_id=${country_id}`, {
        headers: {
          "Accept-Language": router.locale,
        },
      });

      setData(response?.data || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [country_id, router.locale]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}
