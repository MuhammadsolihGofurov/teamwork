import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { LeftInfoAll, RightInfoAll, Wrapper } from "@/components/Utils";
import { TasksCreateUrl, TasksEditUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Breadcrumbs } from "@/components/custom";
import WorkWithSkeleton from "@/components/Skeleton/create-edit-pages/work-with-skeleton";
import {
  TasksCreateForm,
  TasksEditForm,
} from "@/components/create-edit-pages/tasks";
import CreateTaskSkeleton from "@/components/Skeleton/create-edit-pages/create-task-skeleton";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

function TaskEditPage({ info }) {
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

  const { data: currentTask, isValidating } = useSWR(
    [
      `/task/my-task?id=${router.query.task_id}&expand=speciality.parent`,
      router.locale,
    ],
    (url) =>
      fetcher(
        url,
        {
          headers: {
            "Accept-Language": router.locale,
          },
        },
        {},
        true
      )
  );

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
                    url: TasksEditUrl,
                  },
                  {
                    id: 1,
                    name: intl.formatMessage({ id: "Qo’shimcha ma’lumotlar" }),
                    url: `${TasksEditUrl}#create-parts`,
                  },
                ]}
              />
              <div className="w-full 2xl:w-[54%]">
                <TasksEditForm oldData={currentTask?.data} />
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
    seo_home_title: "Task's Edit",
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
export default withAuth(TaskEditPage);
