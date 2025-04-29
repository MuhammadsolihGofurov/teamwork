import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import CenterWrapper from "@/components/profile/center-wrapper";
import { MenuTabs, PaymentBox } from "@/components/profile/details";
import {
  CenterAgreementCreate,
  CenterMyTaskDetails,
} from "@/components/profile/details/orders";
import { MyOffersEdit } from "@/components/profile/details/tasks";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  fetchOrderDetails,
  fetchOrderExperts,
  fetchOrderOfferDetails,
  fetchOrderOffers,
} from "@/redux/slice/my-orders-details";
import { fetchMyOfferSolo } from "@/redux/slice/my-tasks";
import { authAxios } from "@/utils/axios";
import { METHOD_STATUS_EDIT } from "@/utils/data";
import fetcher from "@/utils/fetcher";
import {
  MySingleOrderMenu,
  ReturnToOffers,
  ReturnToSoloOffer,
} from "@/utils/profile-menu";
import { MyOrdersUrl, MyOrdersViewOffersUrl, MyTasksOffersUrl, ProfileUrl } from "@/utils/router";
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
  const offer_id = router.query.offer_id;
  // queries ====

  const { my_offer_details } = useSelector((state) => state.myTasks);

  useEffect(() => {
    dispatch(fetchMyOfferSolo({ locale: router.locale, offer_id }));
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
        title={my_offer_details?.task?.title}
        description={my_offer_details?.task?.more_info}
        keywords={my_offer_details?.task?.title}
      />
      <ProfileWrapper
        breads={[
          {
            id: 1,
            name: intl.formatMessage({ id: "Takliflar" }),
            url: `${MyTasksOffersUrl}`,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={ReturnToOffers}
        isMenuShow={false}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile />
            {/* <CenterInfoProfile
              page={"orders/agreement/create"}
              tabsMenu={ReturnToSoloOffer}
              data={my_offer_details}
              method={METHOD_STATUS_EDIT}
            /> */}
            <CenterWrapper isMobile={isMobile}>
              <PaymentBox />
              <MenuTabs data={ReturnToOffers} />
              <MyOffersEdit data={my_offer_details} />
            </CenterWrapper>
            <RightInfoAll />
          </>
        ) : (
          <>
            <MyOffersEdit data={my_offer_details} />
          </>
        )}
      </ProfileWrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Offer edit",
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
