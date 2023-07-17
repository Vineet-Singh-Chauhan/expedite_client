import { createContext, useState } from "react";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";
const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const socket = io(import.meta.env.VITE_BASE_URL);
  const { user } = useAuth();
  const [socketConnected, setSocketConnected] = useState(false);
  socket.on("connection", () => {
    setSocketConnected(true);
  });

  socket.emit("setup", user);
  return (
    <SocketContext.Provider value={{ socket, socketConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
