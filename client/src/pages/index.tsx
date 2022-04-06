import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Spinner, Heading, Text, Flex, Box, Stack } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { TextInput } from "../components/TextInput";
import { useSockets } from "../socket.context";
import { Page, teamColors } from "../constants";
import { StartPage } from "../components/StartPage";
import { GradePage } from "../components/GradePage";

const Index = () => {
    const { socket, questionGroupIndex, questionIndex, questions, teams, page } = useSockets();
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const team = teams[socket.id];

    // If haven't chosen house
    if (!team)
        return (
            <>
                <Heading>What Team Are You?</Heading>
                <Button colorScheme="red" onClick={() => socket.emit("house_login", "graham")}>
                    Graham
                </Button>
                <Button colorScheme="yellow" onClick={() => socket.emit("house_login", "wesley")}>
                    Wesley
                </Button>
                <Button colorScheme="blue" onClick={() => socket.emit("house_login", "booth")}>
                    Booth
                </Button>
                <Button colorScheme="green" onClick={() => socket.emit("house_login", "elliot")}>
                    Elliot
                </Button>
            </>
        );

    switch (page) {
        case Page.START:
            return <StartPage />;
        case Page.GRADE:
            return <GradePage grade={questionGroup.grade} />;
    }

    return (
        <>
            <Flex
                w="100%"
                bg={teamColors[team.house as keyof typeof teamColors]}
                p="6"
                justifyContent="space-between"
            >
                <Text fontWeight="medium">Grade {questionGroup.grade}</Text>
                <Text textTransform="capitalize" fontWeight="medium">
                    {team.house}
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
                                        onClick={() => socket.emit("answer", i)}
                                        colorScheme={team.chosenAnswer === i ? "yellow" : undefined}
                                    >
                                        <Latex>{answer}</Latex>
                                    </Button>
                                ))}
                            </Stack>
                        ) : (
                            <>
                                <TextInput
                                    submitFunction={answer => socket.emit("answer", answer)}
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
