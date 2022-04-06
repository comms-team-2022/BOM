import { Button, Heading, Spinner, Flex, Box, Text, VStack } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { PieChart, Pie, Cell } from "recharts";
import { TeamInfo } from "../../../types";
import { Chart } from "../components/Chart";
import { GradePage } from "../components/GradePage";
import { StartPage } from "../components/StartPage";
import { Page, teamColors } from "../constants";
import { useSockets } from "../socket.context";

const Projector = () => {
    const { questionGroupIndex, questionIndex, questions, teams, page } = useSockets();
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const allTeams: TeamInfo[] = Object.values(teams);

    switch (page) {
        case Page.START:
            return <StartPage />;
        case Page.GRADE:
            return <GradePage grade={questionGroup.grade} />;
        case Page.CHART:
            return <Chart teams={teams} />;
    }

    const questionFinished = teams.graham.isCorrect !== undefined;

    return (
        <Box p="5" h="100vh">
            <Text textAlign="center" fontSize="3xl">
                Grade {questionGroup.grade}
            </Text>

            <VStack justify="center" h="97%" spacing="3em">
                <Heading fontSize="7xl" textAlign="center">
                    <Latex>{currentQuestion.question}</Latex>
                </Heading>
                {currentQuestion.isMultiChoice && (
                    <Flex w="100%" justifyContent="space-evenly">
                        {currentQuestion.answers.map((answer, i) => (
                            <Button key={i} fontSize="4xl" p="2em">
                                <Latex>{answer}</Latex>
                            </Button>
                        ))}
                    </Flex>
                )}
                {questionFinished ? (
                    allTeams.map(
                        team => team.isCorrect && <div>poggers {team.house} was correct</div>
                    )
                ) : (
                    <PieChart width={200} height={200}>
                        <Pie
                            data={allTeams.map(team => ({
                                name: team.house,
                                value: Number(team.chosenAnswer !== undefined),
                            }))}
                            innerRadius={60}
                            outerRadius={80}
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
                )}
            </VStack>
        </Box>
    );
};

export default Projector;
