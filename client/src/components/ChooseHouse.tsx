import { Button, Heading } from "@chakra-ui/react";
import { Teams } from "../../../types";

export const ChooseHouse: React.FC<{ setHouse: (house: keyof Teams) => void }> = ({ setHouse }) => (
    <>
        <Heading>Which House Are You?</Heading>
        <Button colorScheme="red" onClick={() => setHouse("graham")}>
            Graham
        </Button>
        <Button colorScheme="yellow" onClick={() => setHouse("wesley")}>
            Wesley
        </Button>
        <Button colorScheme="blue" onClick={() => setHouse("booth")}>
            Booth
        </Button>
        <Button colorScheme="green" onClick={() => setHouse("elliot")}>
            Elliot
        </Button>
    </>
);
