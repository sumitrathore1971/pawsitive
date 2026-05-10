import { io } from "socket.io-client";

let socket;

export const getSocket = (token) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8080", {
      autoConnect: false,
      transports: ["websocket"],
      auth: token ? { token } : undefined,
    });
  }
  return socket;
};

export const connectSocket = (token) => {
  const instance = getSocket(token);
  if (token) instance.auth = { token };
  if (!instance.connected) instance.connect();
  return instance;
};

export const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
};
