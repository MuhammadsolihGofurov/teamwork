import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import {
  LeftInfoAll,
  RightInfoAll,
  Wrapper,
} from "@/components/Utils";
import { ExpertsUrl, WorkWithUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useIsMobile } from "@/hooks/useIsMobile"; // Hook'ni import qilamiz
import { TaskDetailsSkeleton } from "@/components/Skeleton/details";
import { Breadcrumbs } from "@/components/custom";
import { WorkWithForm } from "@/components/create-edit-pages/experts";
import WorkWithSkeleton from "@/components/Skeleton/create-edit-pages/work-with-skeleton";

function WorkWith({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const query = router.query;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (!router.query.user_id) {
    router.push(`/${ExpertsUrl}`);
    return null;
  }

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
        description={info?.seo_home_description}
        body={info?.seo_home_keywords}
      />
      {loading ? (
        <WorkWithSkeleton />
      ) : (
        <Wrapper>
          <div className="container">
            <Breadcrumbs
              data={[
                {
                  id: 1,
                  name: intl.formatMessage({ id: "Mutaxassislar" }),
                  url: ExpertsUrl,
                },
                {
                  id: 2,
                  name: query?.full_name,
                  url: `experts/${query?.user_id}`,
                  is_correct: false,
                },
                {
                  id: 3,
                  name: intl.formatMessage({ id: "Ishga yo'llash" }),
                  url: `experts/${query?.user_id}`,
                  is_correct: true,
                },
              ]}
            />
            <div className="flex flex-row items-start gap-8 py-5">
              <LeftInfoAll
                data={[
                  {
                    id: 1,
                    name: intl.formatMessage({ id: "Asosiy ma’lumotlar" }),
                    url: WorkWithUrl,
                  },
                ]}
              />
              <div className="w-full 2xl:w-[54%]">
                <WorkWithForm />
              </div>
              <RightInfoAll />
            </div>
          </div>
        </Wrapper>
      )}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Work with ",
    seo_home_keywords: "",
    seo_home_description: "",
  };

  if (!info) {
    return {
      notFound: true,
    };
  }

  return {
    props: { info },
  };
}

// Sahifani withAuth bilan himoyalash
export default withAuth(WorkWith);
