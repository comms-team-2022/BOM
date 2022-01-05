import { Button, Spinner, Heading } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useSockets } from "../socket.context";

const Index = () => {
    const { socket, questionGroupIndex, questionIndex, questions } = useSockets();
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];

    return (
        <>
            <DarkModeSwitch />

            <p>Grade {questionGroup.grade}</p>
            <Heading>{currentQuestion.question}</Heading>
            {currentQuestion.isMultiChoice
                ? currentQuestion.answers.map((answer, i) => (
                      <Button key={i} onClick={() => socket.emit("answer", i)}>
                          {answer}
                      </Button>
                  ))
                : "nothing for now"}
        </>
    );
};

export default Index;
