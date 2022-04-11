import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { TeamInfo, Teams } from "../../../types";
import { teamColors } from "../constants";

interface ChartProps {
    teams: Teams;
}

const colour = { stroke: "#c2c2c2" };

export const Chart: React.FC<ChartProps> = ({ teams }) => {
    const data: TeamInfo[] = Object.values(teams);
    const fData = data.map(team => ({
        ...team,
        // JS has no capitalise function
        houseCap: team.house[0].toUpperCase() + team.house.slice(1),
    }));

    // TODO: maybe use ResponsiveContainer
    return (
        <BarChart width={1000} height={600} data={fData}>
            <Bar dataKey="score" label={{ position: "top" }}>
                {data.map((team, i) => (
                    <Cell key={`cell-${i}`} fill={teamColors[team.house]} />
                ))}
            </Bar>
            <XAxis dataKey="houseCap" {...colour} />
            <YAxis {...colour} />
        </BarChart>
    );
};
