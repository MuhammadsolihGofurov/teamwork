import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import { ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { OrdersMenu, TasksMenu } from "@/utils/profile-menu";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import {
  ARCHIVED,
  IN_PROGRESS,
  IN_PROGRESS_TASK,
  MY_OFFERS_TO_ORDER,
  NOT_PUBLISHED,
  PUBLISHED,
  VERGE_OF_AGREEMENT,
} from "@/utils/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/redux/slice/my-orders";
import { useIsMobile } from "@/hooks/useIsMobile";
import { CenterDataWrapper } from "@/components/profile/details/orders";
import { fetchMyOffers, fetchMyTasks } from "@/redux/slice/my-tasks";

function MyOffers({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const {
    my_tasks,
    my_tasks_meta,
    my_offers,
    my_tasks_on_agreement,
    my_tasks_finished,
    my_tasks_canceled,
  } = useSelector((state) => state.myTasks);

  useEffect(() => {
    dispatch(fetchMyTasks({ locale: router.locale }));
    dispatch(fetchMyOffers({ locale: router.locale }));
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
            name: intl.formatMessage({ id: "Buyurtmalarim" }),
            url: ProfileUrl,
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={TasksMenu}
        isMenuShow={true}
        tabsMenuCounts={[
          my_tasks?.length,
          my_offers?.length,
          my_tasks_on_agreement?.length,
          my_tasks_finished?.length,
          my_tasks_canceled?.length,
        ]}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile />
            <CenterInfoProfile
              page={"orders/index"}
              tabsMenu={TasksMenu}
              data={my_offers}
              tabsMenuCounts={[
                my_tasks?.length,
                my_offers?.length,
                my_tasks_on_agreement?.length,
                my_tasks_finished?.length,
                my_tasks_canceled?.length,
              ]}
              card_type={MY_OFFERS_TO_ORDER}
            />
            <RightInfoAll />
          </>
        ) : (
          <>
            <CenterDataWrapper
              data={my_offers}
              page={"orders/index"}
              card_type={MY_OFFERS_TO_ORDER}
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

// Sahifani withAuth bilan himoyalash
export default withAuth(MyOffers);
