import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { ProfileWrapper, RightInfoAll } from "@/components/Utils";
import { CenterInfoProfile, LeftInfoProfile } from "@/components/profile";
import { ChatsUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "@/hooks/useIsMobile";
import { fetchChats, fetchChatSolo } from "@/redux/slice/my-chats";

function MyChatSolo({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { chats } = useSelector((state) => state.myChats);
  const { current_user_type } = useSelector((state) => state.user);
  const chat_id = router.query.chat_id;

  useEffect(() => {
    dispatch(fetchChats({ locale: router.locale, type: current_user_type }));
    dispatch(fetchChatSolo({ locale: router.locale, id: chat_id }));
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
            name: intl.formatMessage({ id: "Chatlar" }),
            url: ChatsUrl,
          },
        ]}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile page="chats" chats={chats} />
            <CenterInfoProfile page={"chats"} data={"none"} />
            <RightInfoAll />
          </>
        ) : (
          <>
            <LeftInfoProfile page="chats" chats={chats} isMobile={isMobile} />
          </>
        )}
      </ProfileWrapper>

      {/* <MobileNavigation isReturn={true}/> */}
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Chats Index",
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
export default withAuth(MyChatSolo);
