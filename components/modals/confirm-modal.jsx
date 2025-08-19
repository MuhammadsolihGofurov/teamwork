import { useModal } from "@/context/modal-provider";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

export default function ConfirmModal() {
  const { modal, closeModal } = useModal();
  const intl = useIntl();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (modal.isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
    }
  }, [modal.isOpen]);

  if (!modal.isOpen) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${
        visible ? "opacity-100 z-[1000]" : "opacity-0 z-[-1]"
      }`}
      role="dialog"
      aria-modal="true"
      onClick={closeModal}
    >
      <div
        className={`bg-white rounded-3xl px-5 pt-10 pb-7 border border-bg-2 w-11/12 xs:w-[400px] text-center relative transform transition-all duration-300 ${
          visible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center hover:bg-bg-1 rounded-sm transition-colors duration-150"
          onClick={closeModal}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="#364749"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h3 className="text-lg font-semibold text-primary pt-4 pb-2 leading-5">
          {intl.formatMessage({ id: modal?.props?.title })}
        </h3>
        <p className="text-sm font-normal text-opacity-65 text-primary">
          {intl.formatMessage({ id: modal?.props?.message })}
        </p>

        <div className="flex gap-2 justify-center pt-5">
          <button
            type="button"
            onClick={() => {
              modal?.props?.onConfirm();
              closeModal();
            }}
            className="px-5 py-2 w-[120px] bg-main font-medium text-white rounded-lg hover:bg-white border-2 border-main hover:text-main transition-colors duration-200"
          >
            {intl.formatMessage({ id: "Ha" })}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="px-5 py-2 w-[120px] bg-gray-400 font-medium text-white rounded-lg hover:bg-white border-2 border-gray-400 hover:text-gray-400 transition-colors duration-200"
          >
            {intl.formatMessage({ id: "Yo'q" })}
          </button>
        </div>
      </div>
    </div>
  );
}
