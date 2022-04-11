import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export const CorrectIcon: React.FC<{ isCorrect: boolean }> = ({ isCorrect }) =>
    isCorrect ? (
        <CheckIcon boxSize="20em" bg="whatsapp.500" p="3em" borderRadius="10em" />
    ) : (
        <CloseIcon boxSize="20em" bg="crimson" p="3em" borderRadius="10em" />
    );
