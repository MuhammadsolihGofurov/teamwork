import { useUploadImage } from "@/hooks/useUploadImage";
import React, { useState } from "react";
import { useEffect } from "react";
import { useIntl } from "react-intl";

export default function File({
  page = "register-info",
  onFileUpload,
  onFileUploadId,
  existingImage,
  type = "profile_icon",
  isReFetchData = false,
}) {
  const [preview, setPreview] = useState(existingImage);
  const { uploadImage } = useUploadImage({ isReFetchData: isReFetchData });
  const intl = useIntl();

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const uploadedImage = await uploadImage(selectedFile, type);
    // console.error(uploadedImage)
    if (uploadedImage) {
      setPreview(uploadedImage.name);
      onFileUpload(uploadedImage.name);
      onFileUploadId(uploadedImage.id);
    }
  };

  if (page == "passport") {
    return (
      <div
        className={`flex cursor-pointer p-1 rounded-xl border border-bg-3 bg-white w-full gap-4 relative z-0`}
      >
        <div className="w-full h-[80px] flex items-center justify-center p-2 border border-dashed border-bg-3 rounded-xl">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19M14 3H7C6.46957 3 5.96086 3.21071 5.58579 3.58579C5.21071 3.96086 5 4.46957 5 5V12M14 3L19 8M19 8V12M3 12H21M6 16V18M10 16V22M14 16V18M18 16V20"
              stroke="#222222"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-primary">
            {preview ??
              intl.formatMessage({ id: "Pasport nusxasini biriktiring" })}
          </span>
        </div>
        <input
          type="file"
          className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer border-transparent"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex cursor-pointer itmes-start justify-start ${
        page == "register-info" ? "lg:w-2/4" : "w-full"
      } gap-4 relative z-0`}
    >
      <div className="w-[100px] h-[100px] rounded-full bg-main flex items-center justify-center relative z-0">
        <img
          src={preview}
          alt=""
          title="profile-img"
          className="w-full h-full object-cover bg-main rounded-full"
        />
        <span className="absolute bottom-0 border-2 border-white right-0 w-8 h-8 flex items-center justify-center bg-main rounded-full">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4H10C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5C9 5.53043 8.78929 6.03914 8.41421 6.41421C8.03914 6.78929 7.53043 7 7 7H5C4.46957 7 3.96086 7.21071 3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9V18C3 18.5304 3.21071 19.0391 3.58579 19.4142C3.96086 19.7893 4.46957 20 5 20H19C19.5304 20 20.0391 19.7893 20.4142 19.4142C20.7893 19.0391 21 18.5304 21 18V11M15 6H21M18 3V9M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className="flex flex-col pt-3">
        <h2 className="font-medium text-primary">
          {intl.formatMessage({ id: "Rasmdan yuklash" })}
        </h2>
        <p className="text-sm font-normal text-gray-400">
          .jpeg .png ~ 40 -300 kb
        </p>
      </div>

      <input
        type="file"
        className="opacity-0 w-full h-full absolute top-0 left-0 cursor-pointer border-transparent"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
      />
    </div>
  );
}
