import { toast } from "react-toastify";
import { useIntl } from "react-intl";
import { authAxios } from "@/utils/axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { fetchUserData } from "@/redux/slice/user";

export const useUploadImage = () => {
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

      toast.success(intl.formatMessage({ id: "success-profile-picture-upload" }));
      if (type == "profile_icon") {
        dispatch(fetchUserData());
      }
      return response.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          intl.formatMessage({ id: "error-profile-picture-upload" })
      );
      return null;
    }
  };

  return { uploadImage };
};
