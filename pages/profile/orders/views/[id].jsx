import Seo from "@/components/Seo/Seo";
import axios from "@/utils/axios";
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

      {/* 
      <MobileNavigatio isReturn={true}/> */}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
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
