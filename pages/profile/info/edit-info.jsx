import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { ProfileWrapper } from "@/components/Utils";
import {
  CenterInfoProfile,
  LeftInfoProfile,
  RightInfoProfile,
} from "@/components/profile";
import { LogOut, MenuLinksBox } from "@/components/profile/details";
import { CUSTOMER, EXPERT } from "@/utils/data";
import { InfoMenu } from "@/utils/profile-menu";
import {
  AdditionInfoUrl,
  BioInfoUrl,
  InfoEditUrl,
  InfoUrl,
  LegalInfoUrl,
  PhysicalInfoUrl,
  ProfileUrl,
} from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";

function ProfilePage({ info }) {
  const router = useRouter();
  const intl = useIntl();

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
            name: intl.formatMessage({ id: "profile" }),
            url: ProfileUrl,
            is_correct: false,
          },
          {
            id: 2,
            name: intl.formatMessage({ id: "profile tahrirlash" }),
            url: InfoEditUrl,
            is_correct: true,
          },
        ]}
        indexNum={1}
        tabsMenu={InfoMenu}
        isMenuShow={true}
      >
        {/* Desktop view */}
        <LeftInfoProfile />
        <CenterInfoProfile page={"info"} tabsMenu={InfoMenu} />
        <RightInfoProfile />

        {/* Mobile view */}
      </ProfileWrapper>
    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Profile Edit Info",
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
export default withAuth(ProfilePage);
