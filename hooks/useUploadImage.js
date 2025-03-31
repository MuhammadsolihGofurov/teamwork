import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { authAxios } from "@/utils/axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/redux/slice/user";

export const useUploadImage = ({ isReFetchData = false }) => {
  const intl = useIntl();
  const router = useRouter();
  const dispatch = useDispatch();

  const uploadImage = async (file, type) => {
    if (!file) {
      toast.error(intl.formatMessage({ id: "error-file-no-selected" }));
      return null;
    }

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error(intl.formatMessage({ id: "error-file-with-format" }));
      return null;
    }

    if (file.size > 300 * 1024) {
      toast.error(intl.formatMessage({ id: "error-file-with-size" }));
      return null;
    }

    const toastId = toast.loading(
      intl.formatMessage({ id: "pending-uploading-image" })
    );

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await authAxios.post(
        `/attachment/upload?type=${type}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(toastId, {
        render: intl.formatMessage({
          id:
            type === "profile_icon"
              ? "success-profile-picture-upload"
              : "success-picture-upload",
        }),
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      if (isReFetchData) {
        setTimeout(() => {
          dispatch(fetchUserData());
        }, 1000);
      }

      return response?.data?.data;
    } catch (error) {
      toast.update(toastId, {
        render:
          error.response?.data?.message ||
          intl.formatMessage({ id: "error-profile-picture-upload" }),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return null;
    }
  };

  return { uploadImage };
};
