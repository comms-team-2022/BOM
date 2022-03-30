import { Button } from "@chakra-ui/react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Page } from "../constants";

interface PageButtonProps {
    currentPage: Page;
    socket: Socket<DefaultEventsMap, DefaultEventsMap>;
    targetPage: Page;
}

export const PageButton: React.FC<PageButtonProps> = ({
    currentPage,
    socket,
    targetPage,
    children,
}) => {
    return (
        <Button
            colorScheme={currentPage === targetPage ? "green" : undefined}
            onClick={() => socket.emit("admin_change_page", targetPage)}
        >
            {children}
        </Button>
    );
};
