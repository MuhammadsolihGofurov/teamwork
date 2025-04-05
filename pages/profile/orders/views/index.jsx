import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import { CenterMyTaskDetails } from "@/components/profile/details/orders";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  fetchOrderDetails,
  fetchOrderExperts,
  fetchOrderOffers,
} from "@/redux/slice/my-orders-details";
import { authAxios } from "@/utils/axios";
import fetcher from "@/utils/fetcher";
import { MySingleOrderMenu } from "@/utils/profile-menu";
import { MyOrdersUrl, ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";

function page({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();

  const { order_details, loading, error, order_offers, order_experts } =
    useSelector((state) => state.myOrdersDetails);

  useEffect(() => {
    dispatch(
      fetchOrderDetails({ locale: router.locale, id: router.query.task_id })
    );
    dispatch(
      fetchOrderOffers({ locale: router.locale, id: router.query.task_id })
    );
    dispatch(
      fetchOrderExperts({ locale: router.locale, id: router.query.task_id })
    );
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
        title={order_details?.title}
        description={order_details?.more_info}
        keywords={order_details?.title}
      />
      <ProfileWrapper
        breads={[
          {
            id: 1,
            name: intl.formatMessage({ id: "Buyurtmalarim" }),
            url: MyOrdersUrl,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={MySingleOrderMenu}
        isMenuShow={true}
        tabsMenuQuery={`?task_id=${router.query.task_id}`}
        tabsMenuCounts={[
          "none",
          order_offers?.length,
          order_experts?.length,
          "none",
        ]}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile />
            <CenterInfoProfile
              page={"orders/details"}
              tabsMenu={MySingleOrderMenu}
              data={order_details}
              tabsMenuQuery={`?task_id=${router.query.task_id}`}
              tabsMenuCounts={[
                "none",
                order_offers?.length,
                order_experts?.length,
                "none",
              ]}
            />
            <RightInfoAll />
          </>
        ) : (
          <>
            <CenterMyTaskDetails isMobile={isMobile} data={order_details} />
          </>
        )}
      </ProfileWrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Customer's orders un published",
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

export default page;
