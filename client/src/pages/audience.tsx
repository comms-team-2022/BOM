import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import Latex from "react-latex-next";
import { Teams } from "../../../types";
import { ChooseHouse } from "../components/ChooseHouse";
import { PageManager } from "../components/PageManager";
import { teamColors } from "../constants";
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
            <Flex w="100%" bg={teamColors[house]} p="6" justifyContent="space-between">
                <Text fontWeight="medium">Grade {questionGroup.grade}</Text>
                <Text textTransform="capitalize" fontWeight="medium">
                    {house}
                </Text>
            </Flex>
            <Flex h="91vh" justifyContent="center" alignItems="center">
                {team.isCorrect !== undefined ? (
                    team.isCorrect ? (
                        <CheckIcon boxSize="20em" bg="green" p="3em" borderRadius="10em" />
                    ) : (
                        <CloseIcon boxSize="20em" bg="red" p="3em" borderRadius="10em" />
                    )
                ) : (
                    <Stack textAlign="center" alignItems="center" spacing="5">
                        <Heading fontSize="7xl">
                            <Latex>{currentQuestion.question}</Latex>
                        </Heading>
                        {currentQuestion.isMultiChoice && (
                            <Stack direction="row">
                                {currentQuestion.answers.map((answer, i) => (
                                    <Button key={i} fontSize="2em" p="1.3em">
                                        <Latex>{answer}</Latex>
                                    </Button>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                )}
            </Flex>
        </PageManager>
    );
};

export default Audience;
