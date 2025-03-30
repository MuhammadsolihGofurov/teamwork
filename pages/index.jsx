import { MainBanner } from "@/components";
import Seo from "@/components/Seo/Seo";
import { Wrapper } from "@/components/Utils";
import IndexFetchData from "@/components/index/index-fetch-data";
import { useParams } from "@/hooks/useParams";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";

function page({ info }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { findParams } = useParams();

  const url = useMemo(() => {
    const speciality_id = findParams("speciality_id");
    const budget_to = findParams("budget_to");
    const budget_from = findParams("budget_from");
    const others = findParams("other");
    const page = findParams("page");

    return `/task/published-list?expand=speciality.parent,owner.employer${
      speciality_id ? `&speciality_id=${speciality_id}` : ""
    }${budget_from ? `&budget_from=${budget_from}` : ""}${
      budget_to ? `&budget_to=${budget_to}` : ""
    }${others && others !== "all" ? `&other=${others}` : ""}${
      page ? `&page=${page}` : ""
    }&per-page=8`;
  }, [router.query]);

  const { data: tasks, isValidating } = useSWR([url, router.locale], (url) =>
    fetcher(url, {
      headers: {
        "Accept-Language": router.locale,
      },
    })
  );

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
        <MainBanner />
        <IndexFetchData
          type="tasks"
          all_data={tasks?.data?.items}
          loading={isValidating}
          pagination={tasks?.data?._meta}
          isAdvantages
        />
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  const info = {
    seo_home_title: "Home for Tasks",
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
