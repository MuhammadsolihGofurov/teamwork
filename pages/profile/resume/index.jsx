import { withAuth } from "@/components";
import Seo from "@/components/Seo/Seo";
import { MobileNavigation, ProfileWrapper, RightInfoAll } from "@/components/Utils";
import {
  CenterInfoProfile,
  LeftInfoProfile,
  RightInfoProfile,
} from "@/components/profile";
import { LogOut, MenuLinksBox, PictureBox } from "@/components/profile/details";
import {
  AdditionalInfoChanges,
  BioInfoChanges,
  InfoPhysicalChanges,
  InfoTopBanner,
} from "@/components/profile/details/info";
import { InfoMenu, ResumeMenu } from "@/utils/profile-menu";
import { ProfileUrl } from "@/utils/router";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useIsMobile } from "@/hooks/useIsMobile"; // Hook'ni import qilamiz
import { EduResumeForm } from "@/components/profile/details/resume";

function ProfilePage({ info }) {
  const router = useRouter();
  const intl = useIntl();
  const isMobile = useIsMobile();

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
            is_correct: true,
          },
        ]}
        indexNum={0}
        tabsMenu={ResumeMenu}
        isMenuShow={true}
      >
        {!isMobile ? (
          <>
            {/* Desktop view */}
            <LeftInfoProfile />
            <CenterInfoProfile page={"resume-edu"} tabsMenu={ResumeMenu} />
            <RightInfoAll />
          </>
        ) : (
          <>
            {/* Mobile view */}
            <EduResumeForm isMobile={isMobile} />
          </>
        )}
      </ProfileWrapper>

      {/* <MobileNavigation isReturn={true}/> */}

    </>
  );
}

export async function getServerSideProps({ params, locale }) {
  const info = {
    seo_home_title: "Profile resume for expert ",
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
