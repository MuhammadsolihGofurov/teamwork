// useSocket.js
import { connectSocket, disconnectSocket } from "@/utils/socket";
import { useEffect } from "react";

export const useSocket = (token, onMessageCallback) => {
  useEffect(() => {
    if (!token) return;

    // avval eski ulanishni tozalash
    disconnectSocket();

    // yangi ulanish
    connectSocket(token, onMessageCallback);

    // cleanup
    return () => {
      disconnectSocket();
    };
  }, [token, onMessageCallback]); // token yoki callback o‘zgarsa qayta ishlaydi
};
