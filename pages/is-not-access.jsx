import { useIntl } from "react-intl";
import Seo from "@/components/Seo/Seo";

export default function IsNotAccess() {
  const intl = useIntl();

  return (
    <>
      <Seo
        title="Access Denied"
        description="You are not authorized to access this page"
      />
      <div className="container">
        <div className="flex justify-center mx-auto items-center flex-col min-h-screen w-full sm:w-2/4 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-primary leading-6 sm:leading-7">
            {intl.formatMessage({ id: "error-access-denied" })}
          </h1>
          <p className="text-base font-normal text-primary text-opacity-70 pt-3 pb-5">
            {intl.formatMessage({ id: "please-login-to-access" })}
          </p>
          <button type="button" className="py-3 px-6 rounded-full bg-main text-white font-medium">
            {intl.formatMessage({ id: "Tizimga kirish" })}
          </button>
        </div>
      </div>
    </>
  );
}
