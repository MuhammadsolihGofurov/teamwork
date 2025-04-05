import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import { ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { MySavedMenu } from "@/utils/profile-menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchSavedExperts } from "@/redux/slice/my-orders";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CenterSavedData } from "@/components/profile/details/saved";

function MySavedExperts({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { saved_experts, saved_experts_meta } = useSelector(
    (state) => state.myOrders
  );

  useEffect(() => {
    dispatch(
      fetchSavedExperts({ locale: router.locale, page: router.query.page })
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
        tabsMenu={MySavedMenu}
        isMenuShow={true}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile />
            <CenterInfoProfile
              page={"saved"}
              tabsMenu={MySavedMenu}
              data={saved_experts}
              pageDetails={"experts"}
              pagination={saved_experts_meta}
            />
            <RightInfoAll />
          </>
        ) : (
          <>
            <CenterSavedData
              data={saved_experts}
              pageDetails={"experts"}
              pagination={saved_experts_meta}
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
    seo_home_title: "Saved Experts",
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
export default withAuth(MySavedExperts);
