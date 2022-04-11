import { Flex, Text } from "@chakra-ui/react";

interface TimerProps {
    time: number | null;
    size: number;
    fontSize: number;
}

export const Timer: React.FC<TimerProps> = ({ time, size, fontSize }) => {
    if (time === null) return null;

    return (
        <Flex
            w={`${size}em`}
            h={`${size}em`}
            bg="green.400"
            placeContent="center"
            alignItems="center"
            borderRadius={`${size}em`}
        >
            <Text fontSize={`${fontSize}xl`} color="black">
                {time}
            </Text>
        </Flex>
    );
};
