import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import { ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { MyRatesMenu } from "@/utils/profile-menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyRates } from "@/redux/slice/my-orders";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CenterSavedData } from "@/components/profile/details/saved";
import { CenterRatesData } from "@/components/profile/details/rates";

function MyRatesNeutral({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { my_rates, my_rates_meta } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(
      fetchMyRates({
        locale: router.locale,
        page: router.query.page,
        rate: [4],
      })
    );
  }, [router.locale, router.query]);

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
      <ProfileWrapper
        breads={[
          {
            id: 1,
            name: intl.formatMessage({ id: "Shaxsiy ma’lumotlar" }),
            url: ProfileUrl,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={MyRatesMenu}
        isMenuShow={true}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile />
            <CenterInfoProfile
              page={"rates"}
              tabsMenu={MyRatesMenu}
              data={my_rates}
              pageDetails={"all"}
              pagination={my_rates_meta}
            />
            <RightInfoAll />
          </>
        ) : (
          <>
            <CenterRatesData
              data={my_rates}
              pageDetails={"all"}
              pagination={my_rates_meta}
            />
          </>
        )}
      </ProfileWrapper>

      {/* <MobileNavigation isReturn={true}/> */}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Rates Neutral",
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
export default withAuth(MyRatesNeutral);
