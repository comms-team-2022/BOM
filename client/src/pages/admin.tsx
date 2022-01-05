import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";
import { useSockets } from "../socket.context";

const Admin = () => {
    const { socket, teams, questionGroupIndex, questionIndex, questions } = useSockets();
    const [password, setPassword] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    // Only called on first load
    useEffect(() => {
        socket.on("admin_login_success", () => setLoginSuccess(true));
    }, []);

    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];

    if (loginSuccess)
        return (
            <>
                <Heading mb="5">Admin Page</Heading>
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
                    : "non-multichoice not implemented"}
                <Button
                    /* TODO: Make green when all teams have answered*/ colorScheme="red"
                    onClick={() => socket.emit("admin_next_question")}
                >
                    next question
                </Button>
                {Object.keys(teams).map(id => {
                    const chosenAnswer = teams[id].chosenAnswer;

                    return (
                        <Box borderWidth="thin" my="3" p="3" key={id}>
                            <Heading>{teams[id].house}</Heading>
                            <p>Id: {id}</p>
                            <p>Score: {teams[id].score}</p>
                            <p>
                                Answer:{" "}
                                {chosenAnswer !== undefined
                                    ? currentQuestion.isMultiChoice &&
                                      currentQuestion.answers[chosenAnswer]
                                    : "None"}
                            </p>
                        </Box>
                    );
                })}
            </>
        );

    return (
        <>
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                onClick={() => {
                    socket.emit("admin_login", password);
                    setPassword("");
                }}
            >
                Submit
            </Button>
        </>
    );
};

export default Admin;
