import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Spinner, Heading, Text, Flex, Box, Stack } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { TextInput } from "../components/TextInput";
import { useSockets } from "../socket.context";
import { Page, teamColors } from "../constants";
import { StartPage } from "../components/StartPage";
import { GradePage } from "../components/GradePage";
import { useState } from "react";
import { Teams } from "../../../types";

const Index = () => {
    const { socket, questionGroupIndex, questionIndex, questions, teams, page } = useSockets();
    const [house, setHouse] = useState<keyof Teams | null>(null);
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];

    // If haven't chosen house
    if (house === null) {
        return (
            <>
                <Heading>Which House Are You?</Heading>
                <Button colorScheme="red" onClick={() => setHouse("graham")}>
                    Graham
                </Button>
                <Button colorScheme="yellow" onClick={() => setHouse("wesley")}>
                    Wesley
                </Button>
                <Button colorScheme="blue" onClick={() => setHouse("booth")}>
                    Booth
                </Button>
                <Button colorScheme="green" onClick={() => setHouse("elliot")}>
                    Elliot
                </Button>
            </>
        );
    }

    const team = teams[house];

    switch (page) {
        case Page.START:
            return <StartPage />;
        case Page.GRADE:
            return <GradePage grade={questionGroup.grade} />;
    }

    return (
        <>
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
                        <Heading>
                            <Latex>{currentQuestion.question}</Latex>
                        </Heading>
                        {currentQuestion.isMultiChoice ? (
                            <Stack direction="row">
                                {currentQuestion.answers.map((answer, i) => (
                                    <Button
                                        key={i}
                                        onClick={() => socket.emit("answer", i, house)}
                                        colorScheme={team.chosenAnswer === i ? "yellow" : undefined}
                                        fontSize="2em"
                                        p="1.3em"
                                    >
                                        <Latex>{answer}</Latex>
                                    </Button>
                                ))}
                            </Stack>
                        ) : (
                            <>
                                <TextInput
                                    submitFunction={answer => socket.emit("answer", answer, house)}
                                />
                                {team.chosenAnswer && (
                                    <Text display="flex">
                                        Submitted answer:{" "}
                                        <Text ml="1" color="yellow.300">
                                            {team.chosenAnswer}
                                        </Text>
                                    </Text>
                                )}
                            </>
                        )}
                    </Stack>
                )}
            </Flex>
        </>
    );
};

export default Index;
