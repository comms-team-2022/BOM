import { Button, Heading, Spinner } from "@chakra-ui/react";
import { useSockets } from "../socket.context";

const Projector = () => {
    const { questionGroupIndex, questionIndex, questions, teams } = useSockets();
    if (questions.length === 0) return <Spinner />;

    const questionGroup = questions[questionGroupIndex];
    const currentQuestion = questionGroup.questions[questionIndex];
    const allTeams = Object.values(teams);

    return (
        <>
            <div>Grade {questionGroup.grade}</div>

            {allTeams[0]?.isCorrect !== undefined ? (
                allTeams.map(team => team.isCorrect && <div>poggers {team.house} was correct</div>)
            ) : (
                <>
                    <Heading>{currentQuestion.question}</Heading>
                    {currentQuestion.isMultiChoice &&
                        currentQuestion.answers.map((answer, i) => (
                            <Button key={i}>{answer}</Button>
                        ))}

                    {allTeams.map(
                        team =>
                            team.chosenAnswer !== undefined && <div>{team.house} has answered</div>
                    )}
                </>
            )}
        </>
    );
};

export default Projector;
