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

  const sections = [
    { idTitle: "offer.terms.title", idBody: "offer.terms.body" },
    { idTitle: "offer.legal.title", idBody: "offer.legal.body" },
    { idTitle: "offer.platform.title", idBody: "offer.platform.body" },
    { idTitle: "offer.accept.title", idBody: "offer.accept.body" },
    { idTitle: "offer.registration.title", idBody: "offer.registration.body" },
    { idTitle: "offer.howwork.title", idBody: "offer.howwork.body" },
    { idTitle: "offer.fees.title", idBody: "offer.fees.body" },
    { idTitle: "offer.acceptance.title", idBody: "offer.acceptance.body" },
    { idTitle: "offer.ip.title", idBody: "offer.ip.body" },
    { idTitle: "offer.disputes.title", idBody: "offer.disputes.body" },
    { idTitle: "offer.balance.title", idBody: "offer.balance.body" },
    { idTitle: "offer.prohibited.title", idBody: "offer.prohibited.body" },
    { idTitle: "offer.noncirc.title", idBody: "offer.noncirc.body" },
    { idTitle: "offer.privacy.title", idBody: "offer.privacy.body" },
    { idTitle: "offer.liability.title", idBody: "offer.liability.body" },
    { idTitle: "offer.law.title", idBody: "offer.law.body" },
    { idTitle: "offer.lang.title", idBody: "offer.lang.body" },
    {
      idTitle: "offer.notifications.title",
      idBody: "offer.notifications.body",
    },
    { idTitle: "offer.severability.title", idBody: "offer.severability.body" },
    { idTitle: "offer.contacts.title", idBody: "offer.contacts.body" },
  ];

  return (
    <>
      <Seo
        title={info?.seo_home_title}
        description={info?.data?.seo_home_description}
        body={info?.data?.seo_home_keywords}
      />
      <Wrapper>
        <div className="container">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold">
              {intl.formatMessage({ id: "offer.title" })}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {intl.formatMessage({ id: "offer.company" })}
            </p>
            <div className="mt-3 text-xs text-gray-500 flex justify-center gap-4">
              <span>{intl.formatMessage({ id: "offer.publishedDate" })}</span>
              <span>•</span>
              <span>{intl.formatMessage({ id: "offer.effectiveDate" })}</span>
            </div>
          </header>

          <section className="prose prose-sm max-w-none text-justify text-gray-700">
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: intl.formatMessage({ id: "offer.intro" }),
              }}
            />

            {sections.map((s) => (
              <article key={s.idBody} className="mb-4">
                <h3 className="text-lg font-semibold">
                  {intl.formatMessage({ id: s.idTitle })}
                </h3>
                <div
                  className="mt-2 text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: intl.formatMessage({ id: s.idBody }),
                  }}
                />
              </article>
            ))}

            <p className="mt-6 text-xs text-gray-500">
              {intl.formatMessage({ id: "offer.footer" })}
            </p>
          </section>
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
