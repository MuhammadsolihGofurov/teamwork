import { useEffect, useRef } from "react";

export const useMessageReadObserver = ({ chatId, onSeen }) => {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.dataset.id;
            if (messageId) {
              onSeen(messageId);
            }
          }
        });
      },
      {
        threshold: 1.0,
      }
    );
  }, [chatId, onSeen]);

  const observe = (el) => {
    if (el && observer.current) {
      observer.current.observe(el);
    }
  };

  return { observe };
};
