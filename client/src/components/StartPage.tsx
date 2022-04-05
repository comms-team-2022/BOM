import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const StartPage: React.FC = () => {
    return (
        <Flex h="100vh" justifyContent="center" alignItems="center">
            <Box textAlign="center">
                <Heading fontSize="18em">BOM</Heading>
                <Text fontSize="5xl">Battle of the Minds</Text>
            </Box>
        </Flex>
    );
};
