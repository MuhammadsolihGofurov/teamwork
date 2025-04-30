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
import {
  fetchChats,
  fetchChatSolo,
  fetchMessages,
} from "@/redux/slice/my-chats";
import CenterInfoWrapper from "@/components/profile/center-wrapper";
import {
  MessageBody,
  MessageHeader,
  MessageSend,
} from "@/components/profile/details/chats";
import { EXPERT } from "@/utils/data";
import { connectSocket } from "@/utils/socket";
import { useSocket } from "@/hooks/useSocket";

function MyChatSolo({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { chats, solo_chat, loading, messages } = useSelector(
    (state) => state.myChats
  );
  const { current_user_type, user_info } = useSelector((state) => state.user);
  const chat_id = router.query.chat_id;

  useEffect(() => {
    dispatch(fetchChats({ locale: router.locale, type: current_user_type }));
    dispatch(fetchChatSolo({ locale: router.locale, id: chat_id }));
    dispatch(fetchMessages({ locale: router.locale, id: chat_id }));
  }, [router.locale, current_user_type, chat_id]);

  useEffect(() => {
    const hash = router.asPath.split("#")[1];
    if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  }, [router.asPath]);


  const user_data = solo_chat?.creator
    ? solo_chat?.creator
    : solo_chat?.partner?.expert;

  const currentInfo = {
    full_name: user_data?.full_name,
    photo_url: user_data?.photo?.url,
    is_online: user_data?.is_online,
    loading: loading,
    text: solo_chat?.title,
    task_id: solo_chat?.task_id,
  };

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
        page="chats"
        user_data={currentInfo}
      >
        {!isMobile ? (
          <>
            <LeftInfoProfile page="chats" chats={chats} />
            <CenterInfoWrapper>
              <div className="flex flex-col border border-bg-3 rounded-lg overflow-hidden">
                <MessageHeader user_data={currentInfo} />
                <MessageBody messages={messages} task_id={solo_chat?.task_id} />
                <MessageSend />
              </div>
            </CenterInfoWrapper>
            <RightInfoAll />
          </>
        ) : (
          <>
            <div className="flex flex-col rounded-lg overflow-hidden">
              <MessageBody messages={messages} task_id={solo_chat?.task_id} />
              <MessageSend />
            </div>
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
