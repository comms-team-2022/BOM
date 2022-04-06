import { Flex, Heading } from "@chakra-ui/react";

export const GradePage: React.FC<{ grade: number }> = ({ grade }) => {
    return (
        <Flex h="100vh" justifyContent="center" alignItems="center">
            <Heading fontSize="14em">Grade {grade}</Heading>
        </Flex>
    );
};
