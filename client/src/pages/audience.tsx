import { Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { useState } from "react";
import Latex from "react-latex-next";
import { Teams } from "../../../types";
import { ChooseHouse } from "../components/ChooseHouse";
import { CorrectIcon } from "../components/CorrectIcon";
import { MultiChoice } from "../components/MultiChoice";
import { PageManager } from "../components/PageManager";
import { TeamHeader } from "../components/TeamHeader";
import { useSockets } from "../socket.context";

const Audience = () => {
    const [house, setHouse] = useState<keyof Teams | null>(null);
    const { questionGroupIndex, questionIndex, questions, teams } = useSockets();
    if (questions.length === 0) return <Spinner />;

    if (house === null) return <ChooseHouse setHouse={setHouse} />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const team = teams[house];

    // I did a lot of copy pasting. Probably should make it better but idk

    return (
        <PageManager teams={teams} grade={questionGroup.grade}>
            <TeamHeader grade={questionGroup.grade} house={house} />
            <Flex h="91vh" justifyContent="center" alignItems="center">
                {team.isCorrect !== undefined ? (
                    <CorrectIcon isCorrect={team.isCorrect} />
                ) : (
                    <Stack textAlign="center" alignItems="center" spacing="5" p="5em">
                        <Heading fontSize="7xl">
                            <Latex>{currentQuestion.question}</Latex>
                        </Heading>
                        <MultiChoice question={currentQuestion} fontSize="4xl" />
                    </Stack>
                )}
            </Flex>
        </PageManager>
    );
};

export default Audience;
