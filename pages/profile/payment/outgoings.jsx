import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import {
  MobileNavigation,
  ProfileWrapper,
  RightInfoAll,
} from "@/components/Utils";
import {
  CenterInfoProfile,
  LeftInfoProfile,
  RightInfoProfile,
} from "@/components/profile";
import {
  LogOut,
  MenuLinksBox,
  PaymentBox,
  PaymentTable,
  PictureBox,
} from "@/components/profile/details";
import { InfoTopBanner } from "@/components/profile/details/info";
import { InfoMenu, PaymentMenu } from "@/utils/profile-menu";
import { ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { useIsMobile } from "@/hooks/useIsMobile"; // Hook'ni import qilamiz
import { useParams } from "@/hooks/useParams";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const isMobile = useIsMobile();

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);

  const { findParams } = useParams();

  const url = useMemo(() => {
    const type = findParams("type");
    const date_to = findParams("date_to");
    const date_from = findParams("date_from");
    const amount_from = findParams("amount_from");
    const amount_to = findParams("amount_to");
    const page = findParams("page");

    return `/user-balance/list?${type ? `&type=${type}` : ""}${
      date_from ? `&date_from=${date_from}` : ""
    }${date_to ? `&date_to=${date_to}` : ""}${
      amount_from ? `&amount_from=${amount_from}` : ""
    }${amount_to ? `&amount_to=${amount_to}` : ""}${
      page ? `&page=${page}` : ""
    }&per-page=4`;
  }, [router.query]);

  const { data: payments, isValidating } = useSWR([url, router.locale], (url) =>
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
        description={info?.data?.seo_home_description}
        body={info?.data?.seo_home_keywords}
      />
      <ProfileWrapper
        breads={[
          {
            id: 1,
            name: intl.formatMessage({ id: "profile" }),
            url: ProfileUrl,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={PaymentMenu}
        isMenuShow={false}
      >
        {!isMobile ? (
          <>
            {/* Desktop view */}
            <LeftInfoProfile />
            <CenterInfoProfile
              page={"payment"}
              tabsMenu={PaymentMenu}
              data={payments?.data?.items}
              pagination={payments?.data?._meta}
            />
            <RightInfoAll />
          </>
        ) : (
          <>
            {/* Mobile view */}
            <PictureBox isMobile />
            <PaymentBox isMobile />
            <PaymentTable
              data={payments?.data?.items}
              pagination={payments?.data?._meta}
            />
            <MenuLinksBox isMobile />
            <LogOut isMobile />
          </>
        )}
      </ProfileWrapper>

      {/* <MobileNavigation isReturn={true}/> */}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Payments Outgoings",
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
export default withAuth(page);
