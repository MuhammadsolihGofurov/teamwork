import Seo from "@/components/Seo/Seo";
import { TaskDetailsSkeleton } from "@/components/Skeleton/details";
import { NextLink, RightInfoAll, Wrapper } from "@/components/Utils";
import { Breadcrumbs } from "@/components/custom";
import { TaskDetail } from "@/components/detail-pages";
import { MakeOfferModal } from "@/components/modals";
import axios from "@/utils/axios";
import { FaqsUrl, ProfileUrl, TasksUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const { data } = info;
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
        title={data?.title}
        description={data?.more_info}
        keywords={data?.title}
      />
      {loading ? (
        <TaskDetailsSkeleton />
      ) : (
        <Wrapper>
          <div className="container">
            <Breadcrumbs
              data={[
                {
                  id: 1,
                  name: intl.formatMessage({ id: "Topshiriqlar" }),
                  url: TasksUrl,
                },
                {
                  id: 2,
                  name: data?.title,
                  url: `tasks/${data?.id}`,
                  is_correct: true,
                },
              ]}
            />
            <div className="flex flex-row gap-8 py-5">
              <div className="w-full 2xl:w-[70%]">
                <TaskDetail data={data} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-10 items-start w-full lg:w-3/4 py-7 sm:py-10 px-3 sm:px-10">
                  <NextLink
                    url={ProfileUrl}
                    className="flex items-start gap-2 hover:text-main text-primary group transition-colors duration-150"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="pt-1"
                    >
                      <path
                        d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12M12 16C13.1046 16 14 15.1046 14 14C14 12.8954 13.1046 12 12 12M12 16V17.5M12 12V10.5M8.96894 12.25L10.2679 13M13.732 15L15.032 15.75M9.00003 15.803L10.285 15.03M13.715 12.97L15 12.197M10 3V7C10 7.26522 9.89464 7.51957 9.70711 7.70711C9.51957 7.89464 9.26522 8 9 8H5M10 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H7C6.46957 21 5.96086 20.7893 5.58579 20.4142C5.21071 20.0391 5 19.5304 5 19V8M10 3L5 8"
                        stroke="#121212"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-main transition-colors duration-150"
                      />
                    </svg>
                    <span className="flex-1">
                      {intl.formatMessage({
                        id: "Sozlamar bo’limida ma’lumotlaringizni  to’liq to’ldiring",
                      })}
                    </span>
                  </NextLink>
                  <NextLink
                    url={FaqsUrl}
                    className="flex items-center gap-2 hover:text-main text-primary group transition-colors duration-150"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 21L15 15M10 13V13.01M10 10C10.2517 10.0001 10.4994 9.93691 10.7202 9.81618C10.9411 9.69545 11.128 9.52108 11.2638 9.30914C11.3996 9.09719 11.4798 8.85449 11.4972 8.60339C11.5145 8.35228 11.4684 8.10085 11.3631 7.87225C11.2577 7.64365 11.0966 7.44523 10.8944 7.29527C10.6923 7.14532 10.4556 7.04864 10.2063 7.01415C9.95697 6.97966 9.70297 7.00847 9.46769 7.09792C9.23242 7.18736 9.02344 7.33458 8.86 7.526M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="#121212"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="group-hover:stroke-main transition-colors duration-150"
                      />
                    </svg>

                    <span className="flex-1">
                      {intl.formatMessage({
                        id: "menuFAQ",
                      })}
                    </span>
                  </NextLink>
                </div>
              </div>
              <RightInfoAll />
            </div>
          </div>
        </Wrapper>
      )}

      <MakeOfferModal />
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
      `/task/by-id?id=${params?.id}&expand=speciality.parent,owner.expert,owner.employer`,
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
