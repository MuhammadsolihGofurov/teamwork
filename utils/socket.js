import { toast } from "react-toastify";

let socket = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 3000; // 3 sekund

let reconnectTimer = null;

export const connectSocket = (token, onMessageCallback) => {
  const url = `wss://php.teamwork.uz/socket?token=${token}`;
  socket = new WebSocket(url);

  socket.onopen = () => {
    reconnectAttempts = 0;
    // toast.success("🔌 Socket ulandi!");
    console.log("✅ WebSocket connected");
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 Message: ", data);

    // if (data?.type === "chat_new_message") {
    //   toast.info(`💬 Yangi xabar: ${data.content}`);
    // }

    if (onMessageCallback) {
      onMessageCallback(data);
    }
  };

  socket.onclose = () => {
    console.warn("❌ WebSocket closed");
    attemptReconnect(token, onMessageCallback);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
    socket?.close();
  };
};

const attemptReconnect = (token, onMessageCallback) => {
  if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
    reconnectAttempts++;
    reconnectTimer = setTimeout(() => {
    //   console.warn(`🔁 Reconnecting... (${reconnectAttempts})`);
      connectSocket(token, onMessageCallback);
    }, RECONNECT_INTERVAL);
  } else {
    toast.error("🚫 Socket ulanib bo‘lmadi.");
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket?.close();
    clearTimeout(reconnectTimer);
    socket = null;
  }
};

export const sendMessage = (message) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket?.send(JSON.stringify(message));
  } else {
    toast.warning("⛔ Xabar yuborilmadi. Socket ulanmagan.");
  }
};
