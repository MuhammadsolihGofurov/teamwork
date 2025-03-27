import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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

  if (isCollect && state) {
    switch (state) {
      case "speciality":
        dispatch(setSpecialitiesData(data?.data?.items));
        break;
      case "anotherValue":
        // Do something else
        console.log("Matched anotherValue");
        break;
      default:
        // Handle the default case
        console.log("No matching case");
    }
  }

  return {
    data: data?.data || null,
    isLoading,
    error,
  };
}
