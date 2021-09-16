// Taken from around here https://www.youtube.com/watch?v=a_xo-SbIfUQ&t=1151s
// Basically this allows for the socket information to be available to
// all components

import { createContext, useContext } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../config/default";

const socket = io(SOCKET_URL);

const SocketContext = createContext({ socket });

const SocketsProvider: React.FC = props => {
  return <SocketContext.Provider value={{ socket }} {...props} />;
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
