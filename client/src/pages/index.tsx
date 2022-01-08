import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Spinner, Heading } from "@chakra-ui/react";
import { useSockets } from "../socket.context";

const Index = () => {
    const { socket, questionGroupIndex, questionIndex, questions, teams } = useSockets();
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
                <Button colorScheme="green" onClick={() => socket.emit("house_login", "eliot")}>
                    Eliot
                </Button>
            </>
        );

    if (team.isCorrect !== undefined) return team.isCorrect ? <CheckIcon /> : <CloseIcon />;

    return (
        <>
            <p>Grade {questionGroup.grade}</p>
            <Heading>{currentQuestion.question}</Heading>
            {currentQuestion.isMultiChoice
                ? currentQuestion.answers.map((answer, i) => (
                      <Button
                          key={i}
                          onClick={() => socket.emit("answer", i)}
                          colorScheme={team.chosenAnswer === i ? "yellow" : undefined}
                      >
                          {answer}
                      </Button>
                  ))
                : "non-multichoice not implemented"}
        </>
    );
};

export default Index;
