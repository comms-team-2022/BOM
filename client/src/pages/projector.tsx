import { Button, Heading, Spinner, Flex, Box, Text, VStack } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { PieChart, Pie, Cell } from "recharts";
import { TeamInfo } from "../../../types";
import { PageManager } from "../components/PageManager";
import { Timer } from "../components/Timer";
import { teamColors } from "../constants";
import { useSockets } from "../socket.context";

const Projector = () => {
    const { questionGroupIndex, questionIndex, questions, teams, time } = useSockets();
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const allTeams: TeamInfo[] = Object.values(teams);
    const questionFinished = teams.graham.isCorrect !== undefined;

    return (
        <PageManager grade={questionGroup.grade} teams={teams}>
            <Box px="4.2em" h="100vh">
                <Text textAlign="center" fontSize="3xl">
                    Grade {questionGroup.grade}
                </Text>

                <VStack justify="center" h="94%" spacing="6em">
                    <Heading fontSize="7xl" textAlign="center">
                        <Latex>{currentQuestion.question}</Latex>
                    </Heading>
                    {currentQuestion.isMultiChoice && (
                        <Flex w="100%" justifyContent="space-evenly">
                            {currentQuestion.answers.map((answer, i) => (
                                <Button
                                    key={i}
                                    fontSize="4xl"
                                    p="2em"
                                    colorScheme={
                                        questionFinished && i === currentQuestion.correctIndex
                                            ? "green"
                                            : undefined
                                    }
                                >
                                    <Latex>{answer}</Latex>
                                </Button>
                            ))}
                        </Flex>
                    )}
                    {questionFinished ? (
                        !currentQuestion.isMultiChoice && (
                            <Box textAlign="center">
                                <Heading fontSize="5xl" color="green.300">
                                    {currentQuestion.answer}
                                </Heading>
                            </Box>
                        )
                    ) : (
                        <Flex alignItems="center" justifyContent="space-evenly" w="100%">
                            <PieChart width={250} height={250}>
                                <Pie
                                    data={allTeams.map(team => ({
                                        name: team.house,
                                        value: Number(team.chosenAnswer !== undefined),
                                    }))}
                                    innerRadius={80}
                                    outerRadius={120}
                                    fill="#8884d8"
                                    paddingAngle={4}
                                    dataKey="value"
                                >
                                    {allTeams.map(team => (
                                        <Cell
                                            key={`cell-${team.house}`}
                                            fill={teamColors[team.house]}
                                        ></Cell>
                                    ))}
                                </Pie>
                            </PieChart>
                            <Timer time={time} size={11} fontSize={6} />
                        </Flex>
                    )}
                </VStack>

                {teams.graham.isCorrect && (
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        w="100%"
                        h="4em"
                        bg="red.400"
                        clipPath="polygon(4% 100%, 96% 100%, 100% 0, 0 0)"
                    />
                )}
                {teams.booth.isCorrect && (
                    <Box
                        position="fixed"
                        top="0"
                        right="0"
                        w="4.8em"
                        h="100%"
                        bg="blue.400"
                        clipPath="polygon(0 93.7%, 100% 100%, 100% 0, 0 6.3%)"
                    />
                )}
                {teams.elliot.isCorrect && (
                    <Box
                        position="fixed"
                        bottom="0"
                        right="0"
                        w="100%"
                        h="4em"
                        bg="green.400"
                        clipPath="polygon(0 100%, 100% 100%, 96% 0, 4% 0)"
                    />
                )}
                {teams.wesley.isCorrect && (
                    <Box
                        position="fixed"
                        bottom="0"
                        left="0"
                        w="4.8em"
                        h="100%"
                        bg="yellow.400"
                        clipPath="polygon(0 100%, 100% 93.7%, 100% 6.3%, 0 0)"
                    />
                )}
            </Box>
        </PageManager>
    );
};

export default Projector;
