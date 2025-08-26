import { useModal } from "@/context/modal-provider";
import { authAxios } from "@/utils/axios";
import React from "react";
import { useIntl } from "react-intl";
import { toast } from "react-toastify";

export default function EduResumeCard({ data }) {
  const intl = useIntl();
  const { showModal } = useModal();

  const deleteEduInfo = async (id) => {
    try {
      await authAxios.delete(`/resume-edu/delete?id=${id}`);
      toast.success(
        intl.formatMessage({ id: "Ma’lumot muvaffaqiyatli o‘chirildi!" })
      );
    } catch (error) {
      toast.error(intl.formatMessage({ id: "Xatolik" }));
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3 rounded-xl border border-bg-3 shadow-sm">
      <div className="flex flex-col gap-1">
        <h5 className="font-medium text-primary text-base">
          {data?.universty_name}
        </h5>
        <p className="text-sm text-secondary">
          {data?.field_of_study} • {data?.degree}
        </p>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {data?.begin_edu_year} - {data?.end_edu_year}
      </p>

      {/* buttons */}
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          role="button"
          onClick={() => showModal("edu-resume-update", { data: data })}
          className="hover:text-some_btn transition-colors duration-150"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.6665 4.66674H3.99984C3.64622 4.66674 3.30708 4.80721 3.05703 5.05726C2.80698 5.30731 2.6665 5.64645 2.6665 6.00007V12.0001C2.6665 12.3537 2.80698 12.6928 3.05703 12.9429C3.30708 13.1929 3.64622 13.3334 3.99984 13.3334H9.99984C10.3535 13.3334 10.6926 13.1929 10.9426 12.9429C11.1927 12.6928 11.3332 12.3537 11.3332 12.0001V11.3334M10.6665 3.3334L12.6665 5.3334M13.5898 4.39007C13.8524 4.12751 13.9999 3.77139 13.9999 3.40007C13.9999 3.02875 13.8524 2.67264 13.5898 2.41007C13.3273 2.14751 12.9712 2 12.5998 2C12.2285 2 11.8724 2.14751 11.6098 2.41007L5.99984 8.00007V10.0001H7.99984L13.5898 4.39007Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          role="button"
          onClick={() =>
            showModal("confirm", {
              title: "Ma'lumotni o'chirishni istaysizmi?",
              message:
                "Agar ushbu ma'lumotlarni o'chirsangiz, ma'lumotlarni tiklash uchun qayta qo'shishingiz kerak bo'ladi!",
              onConfirm: () => deleteEduInfo(data?.id),
            })
          }
          className="hover:text-some_red transition-colors duration-150"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66699 4.66667H13.3337M6.66699 7.33333V11.3333M9.33366 7.33333V11.3333M3.33366 4.66667L4.00033 12.6667C4.00033 13.0203 4.1408 13.3594 4.39085 13.6095C4.6409 13.8595 4.98004 14 5.33366 14H10.667C11.0206 14 11.3598 13.8595 11.6098 13.6095C11.8598 13.3594 12.0003 13.0203 12.0003 12.6667L12.667 4.66667M6.00033 4.66667V2.66667C6.00033 2.48986 6.07056 2.32029 6.19559 2.19526C6.32061 2.07024 6.49018 2 6.66699 2H9.33366C9.51047 2 9.68004 2.07024 9.80506 2.19526C9.93009 2.32029 10.0003 2.48986 10.0003 2.66667V4.66667"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
