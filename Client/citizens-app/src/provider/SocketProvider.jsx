// src/SocketProvider.jsx
import { createContext } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:5000"); // Replace with your server's URL

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
