import { useModal } from "@/context/modal-provider";
import { authAxios } from "@/utils/axios";
import { CUSTOMER, EXPERT } from "@/utils/data";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ChangeRoles() {
  const intl = useIntl();
  const { user_info } = useSelector((state) => state.user);
  const { showModal } = useModal();
  const router = useRouter();

  const roles = [
    {
      id: 1,
      name: intl.formatMessage({ id: "Ish beruvchi" }),
      code: CUSTOMER,
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "Mutaxassis" }),
      code: EXPERT,
    },
  ];

  const handleChangeRole = async (role) => {
    const toastId = toast.loading(
      intl.formatMessage({ id: "pending-role-change" })
    );

    try {
      const response = await authAxios.post(`/user/change-type?type=${role}`);

      toast.update(toastId, {
        render: intl.formatMessage({ id: "success-role-change" }),
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push(router.pathname);
      }, 500);
    } catch (error) {
      toast.update(toastId, {
        render:
          error.response?.data?.message ||
          intl.formatMessage({ id: "error-role-change" }),
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="grid grid-cols-2 w-full rounded-lg overflow-hidden m-1 mt-0">
      {roles?.map((role) => {
        const isCurrent = user_info?.type?.value == role?.code;
        return (
          <button
            type="button"
            className={`p-2 font-medium text-sm ${
              isCurrent
                ? "bg-main bg-opacity-15 text-main"
                : "bg-bg-2 text-primary"
            }`}
            disabled={isCurrent}
            key={role?.name}
            onClick={() => {
              showModal({
                title: "RoleChangeTitle",
                message: "RoleChangeBody",
                onConfirm: () => handleChangeRole(role?.code),
              });
            }}
          >
            {role?.name}
          </button>
        );
      })}
    </div>
  );
}
