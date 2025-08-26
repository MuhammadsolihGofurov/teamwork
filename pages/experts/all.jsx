import { MainBanner } from "@/components";
import Seo from "@/components/Seo/Seo";
import { Wrapper } from "@/components/Utils";
import { TopFilterBar } from "@/components/index/details";
import IndexFetchData from "@/components/index/index-fetch-data";
import { useParams } from "@/hooks/useParams";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

function page({ info }) {
  const router = useRouter();
  const { is_auth } = useSelector((state) => state.user);

  const { findParams } = useParams();

  const baseUrl = is_auth
    ? `/user/expert-list?expand=specialitySets.parent`
    : `/user/public-expert-list?expand=specialitySets.parent`;

  const url = useMemo(() => {
    const speciality_id = findParams("speciality_id");
    const experience = findParams("experience");
    const expert_level = findParams("expert_level");
    // const others = findParams("other");
    const page = findParams("page");

    return `${`/user/public-expert-list?expand=specialitySets.parent`}&per-page=5${
      speciality_id ? `&speciality_id=${speciality_id}` : ""
    }${
      expert_level && expert_level !== "all"
        ? `&expert_level=${expert_level}`
        : ""
    }${
      experience && experience !== "all" ? `&experience=${experience}` : ""
    }${`&page=${page ? page : 1}`}`;
  }, [router.query, is_auth]);

  const {
    data: tasks,
    isValidating,
    mutate,
  } = useSWR([url, router.locale], (url) =>
    fetcher(
      url,
      {
        headers: {
          "Accept-Language": router.locale,
        },
      },
      {},
      is_auth
    )
  );

  useEffect(() => {
    if (is_auth) {
      mutate();
    }
  }, [is_auth, mutate]);

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
        <TopFilterBar />
        <IndexFetchData
          type="experts"
          all_data={tasks?.data?.items}
          loading={isValidating}
          pagination={tasks?.data?._meta}
        />
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  const info = {
    seo_home_title: "Home for Experts all",
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
