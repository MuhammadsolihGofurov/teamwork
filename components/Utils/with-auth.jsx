import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginUrl } from "@/utils/router";
import { ToastContainer, toast } from "react-toastify";
import { useIntl } from "react-intl";
import { setErrorNull } from "@/redux/slice/user";
import { REGISTERAUTHKEY } from "@/utils/data";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const { is_auth, error, loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const intl = useIntl();
    const auth_key =
      typeof window !== "undefined"
        ? localStorage.getItem(REGISTERAUTHKEY)
        : null;

    useEffect(() => {
      if (!auth_key) {
        toast.error(intl.formatMessage({ id: "error-access-with-auth-token" }));

        router.push(`/${LoginUrl}`);
        setTimeout(() => {
          dispatch(setErrorNull());
        }, 500);
      }
    }, [auth_key]);

    useEffect(() => {
      if (error === 401) {
        if (!is_auth) {
          toast.error(
            intl.formatMessage({ id: "error-access-with-auth-token" })
          );

          router.push(`/${LoginUrl}`);
          setTimeout(() => {
            dispatch(setErrorNull());
          }, 3000);
        }
      }
    }, [router, error]);

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withAuth;
