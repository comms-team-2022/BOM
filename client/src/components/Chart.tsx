import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { TeamInfo, Teams } from "../../../types";
import { teamColors } from "../constants";

interface ChartProps {
    teams: Teams;
}
export const Chart: React.FC<ChartProps> = ({ teams }) => {
    const data: TeamInfo[] = Object.values(teams);

    // TODO: maybe use ResponsiveContainer
    return (
        <BarChart width={1000} height={600} data={data}>
            <Bar dataKey="score" label={{ position: "top" }}>
                {data.map((team, i) => (
                    <Cell key={`cell-${i}`} fill={teamColors[team.house]} />
                ))}
            </Bar>
            <XAxis dataKey="house" />
            <YAxis />
        </BarChart>
    );
};
