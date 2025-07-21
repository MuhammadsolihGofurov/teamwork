import {
  fetchMessages,
  toggleReplyFor,
  toggleSendMessage,
} from "@/redux/slice/my-chats";
import { authAxios } from "@/utils/axios";
import { sendMessage } from "@/utils/socket";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

export default function MessageSend() {
  const [reqLoading, setReqLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const intl = useIntl();
  const { reply_for } = useSelector((state) => state.myChats);

  const chat_id = router.query.chat_id;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      text: "",
    },
  });

  const submitFn = async (data) => {
    if (!data.text.trim()) return;

    try {
      setReqLoading(true);

      const message = {
        // type: "chat_new_message",
        content: data.text,
        reply_for: reply_for?.id,
        // created_at: new Date().toISOString(),
      };

      const response = await authAxios.post(
        `/chat/send-message?chat_id=${chat_id}`,
        message
      );

      //   sendMessage(message); // WebSocket orqali yuborish
      reset();
    } catch (error) {
      console.error("Xatolik:", error);
    } finally {
      dispatch(toggleReplyFor(null));
      dispatch(fetchMessages({ locale: router.locale, id: chat_id }));
      setReqLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitFn)}
      className="flex items-center flex-col gap-2 pb-5 border border-bg-3 sm:border-t-bg-3 rounded-lg sm:rounded-none sm:border-t bg-white"
    >
      <div className="w-full flex items-center gap-2 pt-5 px-5">
        <button className="" type="button">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 4.99996L6.50001 11.5C6.10218 11.8978 5.87869 12.4374 5.87869 13C5.87869 13.5626 6.10218 14.1021 6.50001 14.5C6.89783 14.8978 7.4374 15.1213 8.00001 15.1213C8.56262 15.1213 9.10218 14.8978 9.50001 14.5L16 7.99996C16.7957 7.20432 17.2427 6.12518 17.2427 4.99996C17.2427 3.87475 16.7957 2.79561 16 1.99996C15.2044 1.20432 14.1252 0.757324 13 0.757324C11.8748 0.757324 10.7957 1.20432 10 1.99996L3.50001 8.49996C2.30653 9.69344 1.63605 11.3121 1.63605 13C1.63605 14.6878 2.30653 16.3065 3.50001 17.5C4.69348 18.6934 6.31218 19.3639 8.00001 19.3639C9.68784 19.3639 11.3065 18.6934 12.5 17.5L19 11"
              stroke="#222222"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <textarea
          type="text"
          {...register("text", { required: true })}
          placeholder={intl.formatMessage({ id: "Matningizni yozing" })}
          className="flex-1 border w-full h-10 rounded px-3 py-2 outline-none focus:outline-none border-none resize-none scroll__none"
          disabled={reqLoading}
          required={true}
        />
        <button
          type="submit"
          disabled={reqLoading || !isValid}
          className="text-white px-4 py-2 rounded cursor-pointer"
        >
          <span className={`${reqLoading ? "opacity-50" : "opacity-100"}`}>
            <svg
              width="22"
              height="17"
              viewBox="0 0 22 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6842 6.37225L8.45352 0.760329C6.45607 -0.237791 4.30682 1.81474 5.21382 3.85425L6.85018 7.53384C7.12373 8.14894 7.12373 8.85106 6.85018 9.46616L5.21382 13.1458C4.30682 15.1853 6.45607 17.2378 8.45352 16.2397L19.6842 10.6278C21.4386 9.75107 21.4386 7.24893 19.6842 6.37225Z"
                fill="#00B952"
                className="fill-main"
              />
              <path
                d="M7.5 8.49999H11M1 6.49999H3M1 10.5H3M8.45352 0.760329L19.6842 6.37225C21.4386 7.24893 21.4386 9.75107 19.6842 10.6278L8.45352 16.2397C6.45607 17.2378 4.30682 15.1853 5.21382 13.1458L6.85018 9.46616C7.12373 8.85106 7.12373 8.14894 6.85018 7.53384L5.21382 3.85425C4.30682 1.81474 6.45607 -0.237791 8.45352 0.760329Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}
