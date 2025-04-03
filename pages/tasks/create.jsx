import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { LeftInfoAll, RightInfoAll, Wrapper } from "@/components/Utils";
import { TasksCreateUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Breadcrumbs } from "@/components/custom";
import WorkWithSkeleton from "@/components/Skeleton/create-edit-pages/work-with-skeleton";
import { TasksCreateForm } from "@/components/create-edit-pages/tasks";
import CreateTaskSkeleton from "@/components/Skeleton/create-edit-pages/create-task-skeleton";

function TaskCreate({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
        <CreateTaskSkeleton />
      ) : (
        <Wrapper>
          <div className="container">
            <Breadcrumbs
              title={intl.formatMessage({ id: "addAd" })}
              data={[
                {
                  id: 1,
                  name: intl.formatMessage({ id: "addAd" }),
                  url: TasksCreateUrl,
                },
              ]}
            />
            <div className="flex flex-row items-start gap-8 py-5">
              <LeftInfoAll
                data={[
                  {
                    id: 1,
                    name: intl.formatMessage({ id: "Asosiy ma’lumotlar" }),
                    url: TasksCreateUrl,
                  },
                  {
                    id: 1,
                    name: intl.formatMessage({ id: "Qo’shimcha ma’lumotlar" }),
                    url: `${TasksCreateUrl}#create-parts`,
                  },
                ]}
              />
              <div className="w-full 2xl:w-[54%]">
                <TasksCreateForm />
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
export default withAuth(TaskCreate);
