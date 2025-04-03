import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import { ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { OrdersMenu } from "@/utils/profile-menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/slice/my-orders";

function MyOrdersArchive({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    orders,
    publishedOrders,
    unpublishedOrders,
    archivedOrders,
    inProgressOrders,
    vergeOfAgreementOrders,
    loading,
    error,
  } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(fetchOrders(router.locale));
  }, [router.locale]);

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
            name: intl.formatMessage({ id: "Topshiriqlarim" }),
            url: ProfileUrl,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={OrdersMenu}
        isMenuShow={true}
        tabsMenuCounts={[
          publishedOrders?.length,
          inProgressOrders?.length,
          vergeOfAgreementOrders?.length,
          unpublishedOrders?.length,
          archivedOrders?.length,
        ]}
      >
        <LeftInfoProfile />
        <CenterInfoProfile
          page={"orders/index"}
          tabsMenu={OrdersMenu}
          data={publishedOrders}
          tabsMenuCounts={[
            publishedOrders?.length,
            inProgressOrders?.length,
            vergeOfAgreementOrders?.length,
            unpublishedOrders?.length,
            archivedOrders?.length,
          ]}
        />
        <RightInfoAll />
      </ProfileWrapper>

      {/* <MobileNavigation isReturn={true}/> */}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Customer's orders",
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
export default withAuth(MyOrdersArchive);
