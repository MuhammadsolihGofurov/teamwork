import axios from "@/utils/axios";
import { useRouter } from "next/router";
import { useState, useEffect, useCallback, useMemo } from "react";

export default function useFilterQuery(apiUrl, defaultFilters = {}) {
  const router = useRouter();
  const [filters, setFilters] = useState(defaultFilters);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Query yangilash funksiyasi
  const updateQuery = useCallback(
    (newFilters) => {
      setFilters((prev) => {
        const updatedFilters = { ...prev, ...newFilters };

        router.push(
          { pathname: router.pathname, query: updatedFilters },
          undefined,
          { shallow: true }
        );

        return updatedFilters;
      });
    },
    [router]
  );

  // ✅ Queryni tekshirish funksiyasi
  const checkQuery = useCallback(
    (key) => router.query[key] || null,
    [router.query]
  );

  // ✅ API chaqirish uchun query stringni optimallashtirish
  const queryString = useMemo(
    () => `${apiUrl}?${new URLSearchParams(filters).toString()}`,
    [apiUrl, JSON.stringify(filters)]
  );

  // ✅ API-dan ma'lumot olish (dependency optimallashtirilgan)
  useEffect(() => {
    if (!queryString) return;

    setIsLoading(true);
    axios
      .get(queryString)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [queryString]);

  // ✅ Query o'zgarganda filterlarni yangilash (cheksiz loop oldini olish)
  useEffect(() => {
    setFilters((prev) => ({ ...prev, ...router.query }));
  }, [JSON.stringify(router.query)]);

  return { filters, updateQuery, checkQuery, data, isLoading, error };
}
