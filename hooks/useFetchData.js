import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setSpecialitiesData } from "@/redux/slice/settings";

export function useFetchData(url, isAuth = false, isCollect = false, state) {
  const router = useRouter();
  const dispatch = useDispatch();

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

  // Redux'ga malumot jo'natishni useEffect ichiga olish
  useEffect(() => {
    if (isCollect && state && data?.data?.items) {
      switch (state) {
        case "speciality":
          dispatch(setSpecialitiesData(data?.data?.items));
          break;
        default:
          console.log("No matching case");
      }
    }
  }, [isCollect, state, data, dispatch]);

  return {
    data: data?.data || null,
    isLoading,
    error,
  };
}
