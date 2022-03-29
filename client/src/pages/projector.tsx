import { Button, Heading, Spinner, Flex, Box, Text } from "@chakra-ui/react";
import { PieChart, Pie, Cell } from "recharts";
import { Chart } from "../components/Chart";
import { teamColors } from "../constants";
import { useSockets } from "../socket.context";

const Projector = () => {
    const { questionGroupIndex, questionIndex, questions, teams, showChart } = useSockets();
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const allTeams = Object.values(teams);

    if (showChart) return <Chart teams={teams} />;

    return (
        <Box p="5" h="100vh">
            <Text textAlign="center" fontSize="3xl">
                Grade {questionGroup.grade}
            </Text>

            {allTeams[0]?.isCorrect !== undefined ? (
                allTeams.map(team => team.isCorrect && <div>poggers {team.house} was correct</div>)
            ) : (
                <Flex alignItems="center" justifyContent="center" h="96%" flexDirection="column">
                    <Heading fontSize="7xl">{currentQuestion.question}</Heading>
                    {currentQuestion.isMultiChoice &&
                        currentQuestion.answers.map((answer, i) => (
                            <Button key={i}>{answer}</Button>
                        ))}

                    <PieChart width={400} height={400}>
                        <Pie
                            data={allTeams.map(team => ({
                                name: team.house,
                                value: Number(team.chosenAnswer !== undefined),
                            }))}
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {allTeams.map(team => (
                                <Cell
                                    key={`cell-${team.house}`}
                                    // @ts-expect-error
                                    fill={teamColors[team.house]}
                                ></Cell>
                            ))}
                        </Pie>
                    </PieChart>

                    {allTeams.map(
                        team =>
                            team.chosenAnswer !== undefined && <div>{team.house} has answered</div>
                    )}
                </Flex>
            )}
        </Box>
    );
};

export default Projector;
