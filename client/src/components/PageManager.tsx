import { Teams } from "../../../types";
import { Page } from "../constants";
import { useSockets } from "../socket.context";
import { Chart } from "./Chart";
import { GradePage } from "./GradePage";
import { StartPage } from "./StartPage";

interface PageManagerProps {
    grade: number;
    teams: Teams;
}

export const PageManager: React.FC<PageManagerProps> = ({ teams, grade, children }) => {
    const { page } = useSockets();

    switch (page) {
        case Page.START:
            return <StartPage />;
        case Page.GRADE:
            return <GradePage grade={grade} />;
        case Page.CHART:
            return <Chart teams={teams} />;
    }

    return <>{children}</>;
};
