import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useSockets } from "../socket.context";
import { adminTeams } from "../../../types";

const Admin = () => {
    const { socket } = useSockets();
    const [password, setPassword] = useState("");
    const [teams, setTeams] = useState<adminTeams | null>(null);

    // Only called on first load
    useEffect(() => {
        socket.on("admin_teams", t => setTeams(t));
    }, []);

    return teams ? (
        <>
            <Button /* TODO: Make green when all teams have answered*/ colorScheme="red">
                next question
            </Button>
            {Object.keys(teams).map(id => (
                <Box borderWidth="thin" my="3" p="3">
                    <Heading>{teams[id].house}</Heading>
                    <p>Id: {id}</p>
                    <p>Score: {teams[id].score}</p>
                </Box>
            ))}
        </>
    ) : (
        <>
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button
                onClick={() => {
                    socket.emit("admin_login", password);
                    setPassword("");
                }}
            >
                Submit
            </Button>
        </>
    );
};

export default Admin;
