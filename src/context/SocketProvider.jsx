import { createContext } from "react";
import io from "socket.io-client";
const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const socket = io(import.meta.env.VITE_BASE_URL);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
