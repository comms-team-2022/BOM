import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Spinner, Heading, Text, Flex, Stack } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { TextInput } from "../components/TextInput";
import { useSockets } from "../socket.context";
import { teamColors } from "../constants";
import { useState } from "react";
import { Teams } from "../../../types";
import { ChooseHouse } from "../components/ChooseHouse";
import { PageManager } from "../components/PageManager";
import { Timer } from "../components/Timer";

const Index = () => {
    const { socket, questionGroupIndex, questionIndex, questions, teams, time } = useSockets();
    const [house, setHouse] = useState<keyof Teams | null>(null);
    if (questions.length === 0) return <Spinner />;

    // If haven't chosen house
    if (house === null) return <ChooseHouse setHouse={setHouse} />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const team = teams[house];

    return (
        <PageManager grade={questionGroup.grade} teams={teams}>
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
                        {time !== 0 &&
                            (currentQuestion.isMultiChoice ? (
                                <Stack direction="row">
                                    {currentQuestion.answers.map((answer, i) => (
                                        <Button
                                            key={i}
                                            onClick={() => socket.emit("answer", i, house)}
                                            colorScheme={
                                                team.chosenAnswer === i ? "yellow" : undefined
                                            }
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
                                        submitFunction={answer =>
                                            socket.emit("answer", answer, house)
                                        }
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
                            ))}
                        <Timer time={time} size={7} fontSize={4} />
                    </Stack>
                )}
            </Flex>
        </PageManager>
    );
};

export default Index;
