import { MainBanner } from "@/components";
import Seo from "@/components/Seo/Seo";
import { MobileNavigation, Wrapper } from "@/components/Utils";
import IndexFetchData from "@/components/index/index-fetch-data";
import { useParams } from "@/hooks/useParams";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import useSWR from "swr";

function page({ info }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const intl = useIntl();

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
      <Wrapper>
        <div className="container">
          <h1>{intl.formatMessage({ id: "Security title" })}</h1>
          <p>{intl.formatMessage({ id: "Security body" })}</p>
        </div>
      </Wrapper>

      {/* <MobileNavigation /> */}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  const info = {
    seo_home_title: "Terms",
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
