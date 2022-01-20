import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import { TeamCorrect } from "../../../types";
import { Chart } from "../components/Chart";
import { TextInput } from "../components/TextInput";
import { useSockets } from "../socket.context";

const Admin = () => {
    const { socket, teams, questionGroupIndex, questionIndex, questions, showChart } = useSockets();
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [teamCorrect, setTeamCorrect] = useState<TeamCorrect>({});

    // Only called on first load
    useEffect(() => {
        socket.on("admin_login_success", () => setLoginSuccess(true));
    }, []);

    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const allAnswered = Object.values(teams).every(team => team.chosenAnswer !== undefined);

    if (loginSuccess)
        return (
            <>
                <Heading mb="5">Admin Page</Heading>

                <Button onClick={() => socket.emit("admin_toggle_chart")}>
                    {showChart ? "Hide" : "Show"} Chart on Projector
                </Button>
                {showChart && <Chart teams={teams} />}

                <p>Grade {questionGroup.grade}</p>
                <Heading>{currentQuestion.question}</Heading>
                {currentQuestion.isMultiChoice
                    ? currentQuestion.answers.map((answer, i) => (
                          <Button
                              key={i}
                              colorScheme={currentQuestion.correctIndex === i ? "green" : undefined}
                          >
                              {answer}
                          </Button>
                      ))
                    : currentQuestion.answer}
                <br />
                <br />
                {Object.values(teams)[0]?.isCorrect === undefined ? (
                    <Button
                        colorScheme={allAnswered ? "green" : "red"}
                        onClick={() => {
                            socket.emit("admin_finish_question", teamCorrect);
                            setTeamCorrect({});
                        }}
                    >
                        finish question
                    </Button>
                ) : (
                    <Button colorScheme="purple" onClick={() => socket.emit("admin_next_question")}>
                        next question
                    </Button>
                )}

                {Object.keys(teams).map(id => {
                    const team = teams[id];
                    const chosenAnswer = team.chosenAnswer;

                    let colour;
                    let answer = "None";
                    if (currentQuestion.isMultiChoice) {
                        if (chosenAnswer === currentQuestion.correctIndex) colour = "green.700";
                        else if (chosenAnswer !== undefined) colour = "red.700";

                        if (chosenAnswer !== undefined)
                            answer = currentQuestion.answers[chosenAnswer as number];
                    } else {
                        if (teamCorrect[id]) colour = "green.700";
                        else if (teamCorrect[id] !== undefined) colour = "red.700";

                        if (chosenAnswer !== undefined) answer = team.chosenAnswer as string;
                    }

                    return (
                        <Box borderWidth="thin" my="3" p="3" key={id} bgColor={colour}>
                            <Heading>{team.house}</Heading>
                            <p>Id: {id}</p>
                            <p>Score: {team.score}</p>
                            <p>Answer: {answer}</p>
                            {!currentQuestion.isMultiChoice && (
                                <>
                                    <Button
                                        colorScheme="green"
                                        onClick={() =>
                                            setTeamCorrect({ ...teamCorrect, [id]: true })
                                        }
                                    >
                                        Correct
                                    </Button>
                                    <Button
                                        colorScheme="red"
                                        onClick={() =>
                                            setTeamCorrect({ ...teamCorrect, [id]: false })
                                        }
                                    >
                                        Incorrect
                                    </Button>
                                </>
                            )}
                        </Box>
                    );
                })}
            </>
        );

    return (
        <TextInput
            submitFunction={password => socket.emit("admin_login", password)}
            placeholder="password"
            type="password"
        />
    );
};

export default Admin;
