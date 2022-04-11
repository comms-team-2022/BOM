import { Flex, Text } from "@chakra-ui/react";
import { Teams } from "../../../types";
import { teamColors } from "../constants";

interface TeamHeaderProps {
    house: keyof Teams;
    grade: number;
}

export const TeamHeader: React.FC<TeamHeaderProps> = ({ house, grade }) => (
    <Flex w="100%" bg={teamColors[house]} p="6" justifyContent="space-between">
        <Text fontWeight="medium" color="black">
            Grade {grade}
        </Text>
        <Text textTransform="capitalize" fontWeight="medium" color="black">
            {house}
        </Text>
    </Flex>
);
