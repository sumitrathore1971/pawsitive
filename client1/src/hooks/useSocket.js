import { useEffect, useRef } from "react";
import { connectSocket, disconnectSocket } from "@/services/socket";

export default function useSocket(token) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return undefined;
    socketRef.current = connectSocket(token);
    return () => disconnectSocket();
  }, [token]);

  return socketRef.current;
}
