import { NextLink } from "@/components/Utils";
import { useModal } from "@/context/modal-provider";
import unPublished from "@/pages/profile/orders/un-published";
import {
  archiveOrder,
  deleteOrder,
  publishOrder,
} from "@/redux/slice/my-orders";
import {
  IN_PROGRESS,
  NOT_PUBLISHED,
  PUBLISHED,
  VERGE_OF_AGREEMENT,
} from "@/utils/data";
import {
  MyOrdersViewExpertsUrl,
  MyOrdersViewIdUrl,
  MyOrdersViewOffersUrl,
  TasksEditUrl,
} from "@/utils/router";
import React from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function MyOrderButtons({
  id,
  count_of_candidate,
  count_of_offer,
  card_type,
}) {
  const intl = useIntl();
  const { showModal } = useModal();
  const dispatch = useDispatch();
  const url = `${MyOrdersViewIdUrl}?task_id=${id}`;

  const deleteOrderFunc = (id) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    toast.promise(
      (async () => {
        await delay(500);
        return dispatch(deleteOrder(id));
      })(),
      {
        pending: intl.formatMessage({ id: "E'lon o'chirilmoqda..." }),
        success: intl.formatMessage({ id: "E'lon muvaffaqiyatli o'chirildi!" }),
        error: intl.formatMessage({
          id: "E'lonni o'chirishda xatolik yuz berdi.",
        }),
      }
    );
  };

  const stopOrderFunc = async (id) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    toast.promise(
      (async () => {
        await delay(500);
        return dispatch(unPublished(id));
      })(),
      {
        pending: intl.formatMessage({ id: "E'lon to'xtatilmoqda..." }),
        success: intl.formatMessage({
          id: "E'lon muvaffaqiyatli to'xtatildi!",
        }),
        error: intl.formatMessage({
          id: "E'lonni to'xtatishda xatolik yuz berdi.",
        }),
      }
    );
  };

  const updateOrderFunc = async (id) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    toast.promise(
      (async () => {
        await delay(500);
        return dispatch(publishOrder(id));
      })(),
      {
        pending: intl.formatMessage({ id: "E'lon chop etilmoqda..." }),
        success: intl.formatMessage({
          id: "E'lon muvaffaqiyatli chop etildi!",
        }),
        error: intl.formatMessage({
          id: "E'lonni chop etishda xatolik yuz berdi.",
        }),
      }
    );
  };

  const archiveOrderFunc = async (id) => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    toast.promise(
      (async () => {
        await delay(500);
        return dispatch(archiveOrder(id));
      })(),
      {
        pending: intl.formatMessage({ id: "E'lon arxivlanmoqda..." }),
        success: intl.formatMessage({
          id: "E'lon muvaffaqiyatli arxivlandi!",
        }),
        error: intl.formatMessage({
          id: "E'lonni arxivlashda xatolik yuz berdi.",
        }),
      }
    );
  };

  const buttons = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Tahrirlash" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.6665 4.66674H3.99984C3.64622 4.66674 3.30708 4.80721 3.05703 5.05726C2.80698 5.30731 2.6665 5.64645 2.6665 6.00007V12.0001C2.6665 12.3537 2.80698 12.6928 3.05703 12.9429C3.30708 13.1929 3.64622 13.3334 3.99984 13.3334H9.99984C10.3535 13.3334 10.6926 13.1929 10.9426 12.9429C11.1927 12.6928 11.3332 12.3537 11.3332 12.0001V11.3334M10.6665 3.3334L12.6665 5.3334M13.5898 4.39007C13.8524 4.12751 13.9999 3.77139 13.9999 3.40007C13.9999 3.02875 13.8524 2.67264 13.5898 2.41007C13.3273 2.14751 12.9712 2 12.5998 2C12.2285 2 11.8724 2.14751 11.6098 2.41007L5.99984 8.00007V10.0001H7.99984L13.5898 4.39007Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: `${TasksEditUrl}?task_id=${id}`,
      type: [NOT_PUBLISHED],
      isMobileName: false,
      color: "hover:text-main hover:border-main",
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Hujjatlar" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99967 2V4.66667C9.99967 4.84348 10.0699 5.01305 10.1949 5.13807C10.32 5.2631 10.4895 5.33333 10.6663 5.33333H13.333M9.99967 2H7.33301C6.97939 2 6.64025 2.14048 6.3902 2.39052C6.14015 2.64057 5.99967 2.97971 5.99967 3.33333V10C5.99967 10.3536 6.14015 10.6928 6.3902 10.9428C6.64025 11.1929 6.97939 11.3333 7.33301 11.3333H11.9997C12.3533 11.3333 12.6924 11.1929 12.9425 10.9428C13.1925 10.6928 13.333 10.3536 13.333 10V5.33333M9.99967 2L13.333 5.33333M10.6663 11.3333V12.6667C10.6663 13.0203 10.5259 13.3594 10.2758 13.6095C10.0258 13.8595 9.68663 14 9.33301 14H4.66634C4.31272 14 3.97358 13.8595 3.72353 13.6095C3.47348 13.3594 3.33301 13.0203 3.33301 12.6667V6C3.33301 5.64638 3.47348 5.30724 3.72353 5.05719C3.97358 4.80714 4.31272 4.66667 4.66634 4.66667H5.99967" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: url,
      type: [VERGE_OF_AGREEMENT],
      isMobileName: true,
      color: "hover:text-main hover:border-main",
    },
    {
      id: 3,
      name: intl.formatMessage({ id: "Takliflar:" }),
      icon: false,
      url: `${MyOrdersViewOffersUrl}?task_id=${id}`,
      count: count_of_offer,
      type: [PUBLISHED],
      isMobileName: true,
      color: "hover:text-main hover:border-main",
    },
    {
      id: 4,
      name: intl.formatMessage({ id: "Bajaruvchilar:" }),
      icon: false,
      url: `${MyOrdersViewExpertsUrl}?task_id=${id}`,
      count: count_of_candidate,
      type: [PUBLISHED, IN_PROGRESS],
      isMobileName: true,
      color: "hover:text-main hover:border-main",
    },
    {
      id: 5,
      name: intl.formatMessage({ id: "Yozishmalar" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99967 2V4.66667C9.99967 4.84348 10.0699 5.01305 10.1949 5.13807C10.32 5.2631 10.4895 5.33333 10.6663 5.33333H13.333M9.99967 2H7.33301C6.97939 2 6.64025 2.14048 6.3902 2.39052C6.14015 2.64057 5.99967 2.97971 5.99967 3.33333V10C5.99967 10.3536 6.14015 10.6928 6.3902 10.9428C6.64025 11.1929 6.97939 11.3333 7.33301 11.3333H11.9997C12.3533 11.3333 12.6924 11.1929 12.9425 10.9428C13.1925 10.6928 13.333 10.3536 13.333 10V5.33333M9.99967 2L13.333 5.33333M10.6663 11.3333V12.6667C10.6663 13.0203 10.5259 13.3594 10.2758 13.6095C10.0258 13.8595 9.68663 14 9.33301 14H4.66634C4.31272 14 3.97358 13.8595 3.72353 13.6095C3.47348 13.3594 3.33301 13.0203 3.33301 12.6667V6C3.33301 5.64638 3.47348 5.30724 3.72353 5.05719C3.97358 4.80714 4.31272 4.66667 4.66634 4.66667H5.99967" stroke="#222222" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: `tasks/edit/${id}`,
      count: 0,
      type: [IN_PROGRESS],
      isMobileName: true,
      color: "hover:text-main hover:border-main",
    },
    {
      id: 6,
      name: intl.formatMessage({ id: "To’xtatish" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: false,
      confirmModal: true,
      modalTitle: "E'lonni to'xtatishni istaysizmi?",
      modalBody:
        "E'lonni to'xtatasizmi?, uni qayta nashr etishingiz mumkin. Davom etishni xohlaysizmi?",
      modalFunc: stopOrderFunc,
      type: [PUBLISHED],
      isMobileName: false,
      color: "hover:text-main hover:border-main",
    },
    {
      id: 7,
      name: intl.formatMessage({ id: "Chop etish" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99967 2V4.66667C9.99967 4.84348 10.0699 5.01305 10.1949 5.13807C10.32 5.2631 10.4895 5.33333 10.6663 5.33333H13.333M9.99967 2H7.33301C6.97939 2 6.64025 2.14048 6.3902 2.39052C6.14015 2.64057 5.99967 2.97971 5.99967 3.33333V10C5.99967 10.3536 6.14015 10.6928 6.3902 10.9428C6.64025 11.1929 6.97939 11.3333 7.33301 11.3333H11.9997C12.3533 11.3333 12.6924 11.1929 12.9425 10.9428C13.1925 10.6928 13.333 10.3536 13.333 10V5.33333M9.99967 2L13.333 5.33333M10.6663 11.3333V12.6667C10.6663 13.0203 10.5259 13.3594 10.2758 13.6095C10.0258 13.8595 9.68663 14 9.33301 14H4.66634C4.31272 14 3.97358 13.8595 3.72353 13.6095C3.47348 13.3594 3.33301 13.0203 3.33301 12.6667V6C3.33301 5.64638 3.47348 5.30724 3.72353 5.05719C3.97358 4.80714 4.31272 4.66667 4.66634 4.66667H5.99967" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: false,
      confirmModal: true,
      modalTitle: "E'lonni chop etishni istaysizmi?",
      modalBody:
        "E'lonni chop etishdan oldin barcha ma'lumotlarni tekshirib chiqing. Agar davom etishni xohlasangiz, tasdiqlang.",
      modalFunc: updateOrderFunc,
      type: [NOT_PUBLISHED],
      isMobileName: false,
      color: "hover:text-blue hover:border-blue",
    },
    {
      id: 9,
      name: intl.formatMessage({ id: "Arxivlash" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.99967 2V4.66667C9.99967 4.84348 10.0699 5.01305 10.1949 5.13807C10.32 5.2631 10.4895 5.33333 10.6663 5.33333H13.333M9.99967 2H7.33301C6.97939 2 6.64025 2.14048 6.3902 2.39052C6.14015 2.64057 5.99967 2.97971 5.99967 3.33333V10C5.99967 10.3536 6.14015 10.6928 6.3902 10.9428C6.64025 11.1929 6.97939 11.3333 7.33301 11.3333H11.9997C12.3533 11.3333 12.6924 11.1929 12.9425 10.9428C13.1925 10.6928 13.333 10.3536 13.333 10V5.33333M9.99967 2L13.333 5.33333M10.6663 11.3333V12.6667C10.6663 13.0203 10.5259 13.3594 10.2758 13.6095C10.0258 13.8595 9.68663 14 9.33301 14H4.66634C4.31272 14 3.97358 13.8595 3.72353 13.6095C3.47348 13.3594 3.33301 13.0203 3.33301 12.6667V6C3.33301 5.64638 3.47348 5.30724 3.72353 5.05719C3.97358 4.80714 4.31272 4.66667 4.66634 4.66667H5.99967" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: false,
      confirmModal: true,
      modalTitle: "E'lonni arxivlashni istaysizmi?",
      modalBody:
        "E’lonni arxivlasangiz, mutaxassislar e'longa taklif qoldira olmaydi. Davom etishni xohlaysizmi?",
      modalFunc: archiveOrderFunc,
      type: [NOT_PUBLISHED],
      isMobileName: false,
      color: "hover:text-primary hover:border-primary",
    },
    {
      id: 8,
      name: intl.formatMessage({ id: "Elonni o’chirish" }),
      icon: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.66699 4.66667H13.3337M6.66699 7.33333V11.3333M9.33366 7.33333V11.3333M3.33366 4.66667L4.00033 12.6667C4.00033 13.0203 4.1408 13.3594 4.39085 13.6095C4.6409 13.8595 4.98004 14 5.33366 14H10.667C11.0206 14 11.3598 13.8595 11.6098 13.6095C11.8598 13.3594 12.0003 13.0203 12.0003 12.6667L12.667 4.66667M6.00033 4.66667V2.66667C6.00033 2.48986 6.07056 2.32029 6.19559 2.19526C6.32061 2.07024 6.49018 2 6.66699 2H9.33366C9.51047 2 9.68004 2.07024 9.80506 2.19526C9.93009 2.32029 10.0003 2.48986 10.0003 2.66667V4.66667" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          `,
      url: false,
      confirmModal: true,
      modalTitle: "E'lonni o'chirishni istaysizmi?",
      modalBody:
        "E’lonni o‘chirsangiz, uni qayta tiklab bo‘lmaydi. Davom etishni xohlaysizmi?",
      modalFunc: deleteOrderFunc,
      type: [NOT_PUBLISHED, PUBLISHED],
      isMobileName: false,
      color: "hover:text-some_red hover:border-some_red",
    },
  ];

  const filteredButtons = buttons.filter((button) =>
    button.type.includes(card_type)
  );

  const renderButton = (button) =>
    button.url ? (
      <NextLink
        key={button.name}
        url={button.url}
        className={`flex items-center justify-center gap-1 py-3 px-5 sm:py-4 sm:px-7 rounded-full border border-bg-3 text-sm group ${button.color} text-primary text-xs xs:text-base transition-colors duration-150`}
      >
        {button.icon && (
          <span dangerouslySetInnerHTML={{ __html: button.icon }} />
        )}
        <span className="flex-1">
          {button.name} {button.count}
        </span>
      </NextLink>
    ) : (
      <button
        key={button.name}
        onClick={() =>
          showModal({
            title: button.modalTitle,
            message: button.modalBody,
            onConfirm: () => button.modalFunc(id),
          })
        }
        className={`flex items-center justify-center gap-1 py-3 px-5 sm:py-4 sm:px-7 rounded-full border border-bg-3 text-sm group ${button.color} text-primary text-xs xs:text-base transition-colors duration-150`}
      >
        {button.icon && (
          <span dangerouslySetInnerHTML={{ __html: button.icon }} />
        )}
        <span className="flex-1">
          {button.name} {button.count}
        </span>
      </button>
    );

  return (
    <div className="flex flex-wrap items-center gap-1 w-full">
      {filteredButtons.map(renderButton)}
    </div>
  );
}
