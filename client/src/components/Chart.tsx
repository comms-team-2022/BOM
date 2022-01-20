import { Bar, BarChart, Cell, XAxis, YAxis } from "recharts";
import { Teams } from "../../../types";

interface ChartProps {
    teams: Teams;
}

const teamColors = {
    graham: "red",
    wesley: "yellow",
    eliot: "green",
    booth: "blue",
};

export const Chart: React.FC<ChartProps> = ({ teams }) => {
    const data = Object.values(teams);

    // TODO: maybe use ResponsiveContainer
    return (
        <BarChart width={1000} height={600} data={data}>
            <Bar dataKey="score" label={{ position: "top" }}>
                {data.map((team, i) => (
                    // TODO: Handle the error
                    // @ts-expect-error
                    <Cell key={`cell-${i}`} fill={teamColors[team.house]} />
                ))}
            </Bar>
            <XAxis dataKey="house" />
            <YAxis />
        </BarChart>
    );
};
