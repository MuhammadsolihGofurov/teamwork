import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import {
  CenterAgreementCreate,
  CenterMyTaskDetails,
} from "@/components/profile/details/orders";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  fetchOrderDetails,
  fetchOrderExperts,
  fetchOrderOfferDetails,
  fetchOrderOffers,
} from "@/redux/slice/my-orders-details";
import { authAxios } from "@/utils/axios";
import { METHOD_STATUS_EDIT } from "@/utils/data";
import fetcher from "@/utils/fetcher";
import { MySingleOrderMenu, ReturnToSoloOffer } from "@/utils/profile-menu";
import { MyOrdersUrl, MyOrdersViewOffersUrl, ProfileUrl } from "@/utils/router";
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

  // queries ====
  const task_id = router.query.task_id;
  const offer_id = router.query.offer_id;
  // queries ====

  const { order_offer_solo } = useSelector((state) => state.myOrdersDetails);

  useEffect(() => {
    dispatch(fetchOrderOfferDetails({ locale: router.locale, id: offer_id }));
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
        title={order_offer_solo?.task?.title}
        description={order_offer_solo?.task?.more_info}
        keywords={order_offer_solo?.task?.title}
      />
      <ProfileWrapper
        breads={[
          {
            id: 1,
            name: intl.formatMessage({ id: "Takliflar" }),
            url: `${MyOrdersViewOffersUrl}?task_id=${router.query.task_id}`,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={ReturnToSoloOffer}
        isMenuShow={false}
        tabsMenuQuery={`?task_id=${router.query.task_id}`}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile />
            <CenterInfoProfile
              page={"orders/agreement/create"}
              tabsMenu={ReturnToSoloOffer}
              data={order_offer_solo}
              method={METHOD_STATUS_EDIT}
              tabsMenuQuery={`?task_id=${router.query.task_id}`}
            />
            <RightInfoAll />
          </>
        ) : (
          <>
            <CenterAgreementCreate
              isMobile={isMobile}
              data={order_offer_solo}
              type="orders/agreement/create"
              method={METHOD_STATUS_EDIT}
            />
          </>
        )}
      </ProfileWrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Agreement Accept send to edit Expert",
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
