import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Button, Spinner, Heading, Text } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { TextInput } from "../components/TextInput";
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
                <Button colorScheme="green" onClick={() => socket.emit("house_login", "elliot")}>
                    Elliot
                </Button>
            </>
        );

    if (team.isCorrect !== undefined) {
        return team.isCorrect ? <CheckIcon /> : <CloseIcon />;
    }

    return (
        <>
            <p>{team.house}</p>
            <p>Grade {questionGroup.grade}</p>
            <Heading>
                <Latex>{currentQuestion.question}</Latex>
            </Heading>
            {currentQuestion.isMultiChoice ? (
                currentQuestion.answers.map((answer, i) => (
                    <Button
                        key={i}
                        onClick={() => socket.emit("answer", i)}
                        colorScheme={team.chosenAnswer === i ? "yellow" : undefined}
                    >
                        <Latex>{answer}</Latex>
                    </Button>
                ))
            ) : (
                <>
                    <TextInput submitFunction={answer => socket.emit("answer", answer)} />
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
        </>
    );
};

export default Index;
