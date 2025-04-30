import { connectSocket, disconnectSocket } from "@/utils/socket";
import { useEffect } from "react";

export const useSocket = (token, onMessageCallback) => {
  useEffect(() => {
    if (token) {
      connectSocket(token, onMessageCallback);
    }

    return () => {
      disconnectSocket();
    };
  }, [token]);
};
