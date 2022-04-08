import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { Teams } from "../../../types";
import { ChooseHouse } from "../components/ChooseHouse";
import { PageManager } from "../components/PageManager";
import { useSockets } from "../socket.context";

const Audience = () => {
    const [house, setHouse] = useState<keyof Teams | null>(null);
    const { questionGroupIndex, questionIndex, questions, teams } = useSockets();
    if (questions.length === 0) return <Spinner />;

    if (house === null) return <ChooseHouse setHouse={setHouse} />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];

    return <PageManager teams={teams} grade={questionGroup.grade}></PageManager>;
};

export default Audience;
