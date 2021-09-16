import { Button } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useSockets } from "../socket.context";

const Index = () => {
  const { socket } = useSockets();
  return (
    <>
      <Button onClick={() => {}}></Button>
      <p>{socket.id}</p>
      <DarkModeSwitch />
    </>
  );
};

export default Index;
