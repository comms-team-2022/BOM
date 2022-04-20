import { Button, ButtonProps, HStack, ThemeTypings } from "@chakra-ui/react";
import Latex from "react-latex-next";
import { MultiQuestion, Question } from "../../../types";

interface MultiChoiceProps extends ButtonProps {
    question: Question;
    color?: ThemeTypings["colorSchemes"];
    colorCondition?: (q: MultiQuestion, i: number) => boolean;
    clickFunc?: (i: number) => void;
}

export const MultiChoice: React.FC<MultiChoiceProps> = ({
    question,
    children,
    colorCondition = () => false,
    color,
    clickFunc,
    ...props
}) => {
    if (question.isMultiChoice)
        return (
            <HStack w="100%" justifyContent="space-evenly">
                {question.answers.map((answer, i) => (
                    <Button
                        h="fit-content"
                        key={i}
                        p="1em"
                        whiteSpace="normal"
                        colorScheme={colorCondition(question, i) ? color : undefined}
                        onClick={clickFunc && (() => clickFunc(i))}
                        {...props}
                    >
                        <Latex>{answer}</Latex>
                    </Button>
                ))}
            </HStack>
        );
    return <>{children}</>;
};
