import Seo from "@/components/Seo/Seo";
import { RegWrapper, Wrapper } from "@/components/Utils";
import LeftBanner from "@/components/login-register/left-banner";
import RightForm from "@/components/login-register/right-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function page({ info }) {
  const router = useRouter();
  const dispatch = useDispatch();

  // const { data: services } = useSWR(["services", router.locale], (url) =>
  //   fetcher(url, {
  //     headers: {
  //       "Accept-Language": router.locale,
  //     },
  //   })
  // );

  // useEffect(() => {
  //   dispatch(setServices(services?.data));
  // }, [services?.data]);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  return (
    <>
      <Seo
        title={info?.seo_home_title}
        description={info?.data?.seo_home_description}
        body={info?.data?.seo_home_keywords}
      />
      <RegWrapper>
        <LeftBanner
          height="h-[720px]"
          data={[
            { id: 1, image: "/images/left-banner.png", title: "testlash" },
            { id: 1, image: "/images/left-banner.png", title: "testlash" },
          ]}
        />
        <RightForm page="register-as-details" />
      </RegWrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  const info = {
    seo_home_title: "Register as Details",
    seo_home_keywords: "",
    seo_home_description: "",
  };
  // const info = await axios
  //   .get(`seo`, {
  //     headers: {
  //       "Accept-Language": locale,
  //     },
  //   })
  //   .then((res) => res?.data)
  //   .catch((err) => console.error(err));

  if (!info) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      info: info,
    },
  };
}

export default page;
