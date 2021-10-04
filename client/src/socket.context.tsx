// Taken from around here https://www.youtube.com/watch?v=a_xo-SbIfUQ&t=1151s
// Basically this allows for the socket information to be available to all components

import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { SOCKET_URL } from "../config/default";
import { questionGroup } from "./types";

interface SocketContext {
  // TODO: Replace DefaultEventsMap with actual events
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  questions: questionGroup[];
  questionGroupIndex: number;
  questionIndex: number;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<SocketContext>({
  socket,
  questions: [],
  questionGroupIndex: 0,
  questionIndex: 0,
});

const SocketsProvider: React.FC = props => {
  const [questions, setQuestions] = useState<questionGroup[]>([]);
  // Current index in questions array
  const [questionGroupIndex, setQuestionsIndex] = useState(0);
  // Current index of questions within the current questionGroup
  const [questionIndex, setQuestionIndex] = useState(0);

  // Should only be called once ever
  socket.on("questions", value => setQuestions(value));

  return (
    <SocketContext.Provider
      value={{ socket, questions, questionGroupIndex, questionIndex }}
      {...props}
    />
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
