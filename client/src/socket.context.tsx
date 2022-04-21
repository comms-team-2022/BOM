// Taken from around here https://www.youtube.com/watch?v=a_xo-SbIfUQ&t=1151s
// Basically this allows for the socket information to be available to all components

import { createContext, useContext, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { SOCKET_URL } from "../config/default";
import { QuestionGroup, Teams } from "../../types";
import { Page } from "./constants";

interface SocketContext {
    // TODO: Replace DefaultEventsMap with actual events
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    questions: QuestionGroup[];
    questionGroupIndex: number;
    questionIndex: number;
    teams: Teams;
    page: Page;
    time: number | null;
}

const DEFAULT_TEAM_INFO: Teams = {
    graham: { score: 0, house: "graham" },
    wesley: { score: 0, house: "wesley" },
    elliot: { score: 0, house: "elliot" },
    booth: { score: 0, house: "booth" },
};

const socket = io(SOCKET_URL);

const SocketContext = createContext<SocketContext>({
    socket,
    questions: [],
    questionGroupIndex: 0,
    questionIndex: 0,
    teams: DEFAULT_TEAM_INFO,
    page: Page.START,
    time: null,
});

const SocketsProvider: React.FC = props => {
    const [questions, setQuestions] = useState<QuestionGroup[]>([]);
    socket.on("questions", value => setQuestions(value));
    // Current index in questions array
    const [questionGroupIndex, setQuestionGroupIndex] = useState(0);
    socket.on("question_group_index", value => setQuestionGroupIndex(value));
    // Current index of questions within the current questionGroup
    const [questionIndex, setQuestionIndex] = useState(0);
    socket.on("question_index", value => setQuestionIndex(value));
    // Information about all of the teams
    const [teams, setTeams] = useState<Teams>(DEFAULT_TEAM_INFO);
    socket.on("teams", value => setTeams(value));

    const [page, setPage] = useState(Page.START);
    socket.on("page", value => setPage(value));

    const [time, setTime] = useState<number | null>(null);
    socket.on("update_time", value => setTime(value));

    socket.on("next_question", (teams, questionIndex, questionGroupIndex) => {
        setTeams(teams);
        setQuestionIndex(questionIndex);
        setQuestionGroupIndex(questionGroupIndex);
    });

    return (
        <SocketContext.Provider
            value={{ socket, questions, questionGroupIndex, questionIndex, teams, page, time }}
            {...props}
        />
    );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
