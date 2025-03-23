import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";

export function useFetchData(url, isAuth = false) {
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    url ? [url, router.locale] : null,
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        isAuth
      )
  );

  return {
    data: data?.data || null,
    isLoading,
    error,
  };
}
