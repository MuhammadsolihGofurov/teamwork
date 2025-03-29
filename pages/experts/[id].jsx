import Seo from "@/components/Seo/Seo";
import { Wrapper } from "@/components/Utils";
import { Breadcrumbs } from "@/components/custom";
import axios from "@/utils/axios";
import { ExpertsUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const { data } = info;

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  return (
    <>
      <Seo
        title={data?.full_name}
        description={data?.more_info}
        body={data?.title}
      />
      {console.error(data)}
      <Wrapper>
        <div className="container">
          <Breadcrumbs
            data={[
              {
                id: 1,
                name: intl.formatMessage({ id: "Mutaxassis" }),
                url: ExpertsUrl,
              },
              {
                id: 2,
                name: data?.full_name,
                url: `experts/${data?.id}`,
                is_correct: true,
              },
            ]}
          />
        </div>
      </Wrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  // fetch product
  // const info = "salom";
  //   const info = {
  //     seo_home_title: "Home for Tasks",
  //     seo_home_keywords: "",
  //     seo_home_description: "",
  //   };
  const info = await axios
    .get(
      `/user/info?user_id=${params?.id}&expand=expert,expert.specialitySets.parent,employer.legalEntity,employer.physicalPerson`,
      {
        headers: {
          "Accept-Language": locale,
        },
      }
    )
    .then((res) => res?.data)
    .catch((err) => console.error(err));

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
