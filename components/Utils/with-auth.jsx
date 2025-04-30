// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { LoginUrl } from "@/utils/router";
// import { toast } from "react-toastify";
// import { useIntl } from "react-intl";
// import { RemvoeUserFullInfo, setErrorNull } from "@/redux/slice/user";
// import {
//   PRIVATEAUTHKEY,
//   REGISTERASUSERTYPE,
//   REGISTERAUTHKEY,
//   REGISTERPHONENUMBER,
// } from "@/utils/data";

// const withAuth = (WrappedComponent) => {
//   return function AuthComponent(props) {
//     const { is_auth, error, loading } = useSelector((state) => state.user);
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const intl = useIntl();
//     const auth_key =
//       typeof window !== "undefined"
//         ? localStorage.getItem(PRIVATEAUTHKEY)
//         : null;

//     useEffect(() => {
//       if (!auth_key) {
//         toast.error(intl.formatMessage({ id: "error-access-with-auth-token" }));
//         dispatch(RemvoeUserFullInfo());

//         localStorage.removeItem(REGISTERAUTHKEY);
//         localStorage.removeItem(REGISTERASUSERTYPE);
//         localStorage.removeItem(REGISTERPHONENUMBER);
//         router.push(`/${LoginUrl}`);
//         setTimeout(() => {
//           dispatch(setErrorNull());
//         }, 500);
//       }
//     }, [auth_key]);

//     useEffect(() => {
//       if (error === 401) {
//         if (!is_auth) {
//           toast.error(
//             intl.formatMessage({ id: "error-access-with-auth-token" })
//           );
//           dispatch(RemvoeUserFullInfo(false));

//           localStorage.removeItem(REGISTERAUTHKEY);
//           localStorage.removeItem(REGISTERASUSERTYPE);
//           localStorage.removeItem(REGISTERPHONENUMBER);
//           router.push(`/${LoginUrl}`);
//           setTimeout(() => {
//             dispatch(setErrorNull());
//           }, 3000);
//         }
//       }
//     }, [router, error]);

//     return (
//       <>
//         <WrappedComponent {...props} />
//       </>
//     );
//   };
// };

// export default withAuth;

import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { LoginUrl } from "@/utils/router";
import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { RemvoeUserFullInfo, setErrorNull } from "@/redux/slice/user";
import {
  PRIVATEAUTHKEY,
  REGISTERASUSERTYPE,
  REGISTERAUTHKEY,
  REGISTERPHONENUMBER,
} from "@/utils/data";
import { useSocket } from "@/hooks/useSocket";
import { fetchMessages } from "@/redux/slice/my-chats";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const { is_auth, error, loading, user_info } = useSelector(
      (state) => state.user
    );
    const dispatch = useDispatch();
    const router = useRouter();
    const intl = useIntl();
    const auth_key =
      typeof window !== "undefined"
        ? localStorage.getItem(PRIVATEAUTHKEY)
        : null;

    useEffect(() => {
      if (!auth_key) {
        toast.error(intl.formatMessage({ id: "error-access-with-auth-token" }));
        dispatch(RemvoeUserFullInfo());

        localStorage.removeItem(REGISTERAUTHKEY);
        localStorage.removeItem(REGISTERASUSERTYPE);
        localStorage.removeItem(REGISTERPHONENUMBER);
        setTimeout(() => {
          dispatch(setErrorNull());
        }, 500);
        // router.push("/is-not-access");
      }
    }, [auth_key]);

    useEffect(() => {
      if (error === 401) {
        if (!is_auth) {
          toast.error(
            intl.formatMessage({ id: "error-access-with-auth-token" })
          );
          dispatch(RemvoeUserFullInfo(false));

          localStorage.removeItem(REGISTERAUTHKEY);
          localStorage.removeItem(REGISTERASUSERTYPE);
          localStorage.removeItem(REGISTERPHONENUMBER);
          setTimeout(() => {
            dispatch(setErrorNull());
          }, 3000);
          // router.push("/is-not-access");
        }
      }
    }, [router, error]);

    useSocket(user_info?.socket_key, (data) => {
      // console.error("Real-time message:", data);
      toast.info(
        `${intl.formatMessage({ id: "Yangi xabar" })}, ${data?.data?.sender?.full_name}`
      );
      // Optional: Redux dispatch to save message
      if (router.query.chat_id) {
        dispatch(fetchMessages({ locale: router.locale, id: router.query.chat_id }));
      }
    });

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
